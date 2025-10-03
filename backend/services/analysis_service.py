from . import document_processor, gemini_analyzer, s3_service, analysis_result_service
from models.document import Document
from sqlalchemy.orm import Session
import time
from utils.logger import get_logger

log = get_logger(__name__)

PROMPTS = {
    "key_information": "Analyze this contract and extract key information including parties involved, contract dates, monetary amounts, key terms and conditions, and important deadlines.",
    "risk_assessment": "Identify potential legal risks, unfavorable terms, and red flags in this contract that require attention from legal teams.",
    "summary_generation": "Generate a concise executive summary of this contract highlighting the most critical points for quick review.",
}

def analyze_document(db: Session, document: Document):
    log.info(f"Starting analysis for document: {document.id}")
    start_time = time.time()
    file_obj = s3_service.download_file_from_s3(document.s3_key)
    if file_obj:
        text = document_processor.extract_text(file_obj, document.mime_type)
        log.info(f"Extracted text from document: {document.id}")

        log.info("Analyzing for key information...")
        key_information = gemini_analyzer.analyze_text(text, PROMPTS["key_information"])
        log.info(f"Key information result: {key_information}")

        log.info("Analyzing for risk assessment...")
        risk_assessment = gemini_analyzer.analyze_text(text, PROMPTS["risk_assessment"])
        log.info(f"Risk assessment result: {risk_assessment}")

        log.info("Analyzing for summary generation...")
        summary = gemini_analyzer.analyze_text(text, PROMPTS["summary_generation"])
        log.info(f"Summary generation result: {summary}")

        processing_time = int(time.time() - start_time)
        log.info(f"Analysis for document {document.id} finished in {processing_time} seconds.")

        analysis_result_service.create_analysis_result(
            db=db,
            document_id=document.id,
            extracted_info={"data": key_information},
            risks_identified={"data": risk_assessment},
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
    log.error(f"Failed to download document from S3: {document.s3_key}")
    return None
