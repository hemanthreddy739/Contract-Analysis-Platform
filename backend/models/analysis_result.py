from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .document import Base

class AnalysisResult(Base):
    __tablename__ = 'analysis_results'

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey('documents.id'), nullable=False)
    extracted_info = Column(JSON)
    risks_identified = Column(JSON)
    summary = Column(String)
    analysis_date = Column(DateTime(timezone=True), server_default=func.now())
    processing_time = Column(Integer)

    document = relationship("Document", back_populates="analysis_results")
