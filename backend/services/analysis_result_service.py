from sqlalchemy.orm import Session
from models.analysis_result import AnalysisResult

def create_analysis_result(
    db: Session, document_id: int, extracted_info: dict, risks_identified: dict, summary: str
) -> AnalysisResult:
    db_analysis_result = AnalysisResult(
        document_id=document_id,
        extracted_info=extracted_info,
        risks_identified=risks_identified,
        summary=summary,
    )
    db.add(db_analysis_result)
    db.commit()
    db.refresh(db_analysis_result)
    return db_analysis_result
