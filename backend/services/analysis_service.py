from . import document_processor, gemini_analyzer, s3_service, analysis_result_service
from models.document import Document
from sqlalchemy.orm import Session
import time
import json
from utils.logger import get_logger

log = get_logger(__name__)

COMBINED_PROMPT = """
Analyze the following contract text and provide a JSON object with three keys:
1.  `key_information`: Extract key information including parties involved, contract dates, monetary amounts, key terms and conditions, and important deadlines.
2.  `risk_assessment`: Identify potential legal risks, unfavorable terms, and red flags that require attention from legal teams.
3.  `summary`: Generate a concise executive summary highlighting the most critical points for quick review.

Return ONLY the JSON object.
"""

def analyze_document(db: Session, document: Document):
    log.info(f"Starting combined analysis for document: {document.id}")
    start_time = time.time()
    file_obj = s3_service.download_file_from_s3(document.s3_key)
    if not file_obj:
        log.error(f"Failed to download document from S3: {document.s3_key}")
        return None

    text = document_processor.extract_text(file_obj, document.mime_type)
    log.info(f"Extracted text from document: {document.id}")

    log.info("Sending combined prompt to Gemini...")
    raw_response = gemini_analyzer.analyze_text(text, COMBINED_PROMPT)

    try:
        # Clean the response to ensure it's valid JSON
        # The model sometimes wraps the JSON in ```json ... ```
        clean_response = raw_response.strip().replace("```json", "").replace("```", "").strip()
        analysis_json = json.loads(clean_response)
        key_information = analysis_json.get("key_information", "Failed to parse key information.")
        risk_assessment = analysis_json.get("risk_assessment", "Failed to parse risk assessment.")
        summary = analysis_json.get("summary", "Failed to parse summary.")
        log.info(f"Successfully parsed combined analysis for document: {document.id}")
    except (json.JSONDecodeError, AttributeError) as e:
        log.error(f"Failed to parse JSON response from Gemini for document {document.id}: {e}")
        log.error(f"Raw response was: {raw_response}")
        # Fallback to putting the raw response in the summary
        key_information = {"error": "Failed to parse analysis response."}
        risk_assessment = {"error": "Failed to parse analysis response."}
        summary = raw_response # Show the raw response for debugging

    processing_time = int(time.time() - start_time)
    log.info(f"Combined analysis for document {document.id} finished in {processing_time} seconds.")

    analysis_result_service.create_analysis_result(
        db=db,
        document_id=document.id,
        extracted_info=key_information,
        risks_identified=risk_assessment,
        summary=summary,
        processing_time=processing_time,
    )

    document.status = "analyzed"
    db.commit()

    return {
        "key_information": key_information,
        "risk_assessment": risk_assessment,
        "summary": summary,
    }
