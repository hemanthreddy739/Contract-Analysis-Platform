from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict, Any

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class User(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class AnalysisResult(BaseModel):
    id: int
    document_id: int
    extracted_info: Optional[Dict[str, Any]]
    risks_identified: Optional[Dict[str, Any]]
    summary: Optional[str]
    analysis_date: datetime
    processing_time: Optional[int]

    class Config:
        orm_mode = True

class Document(BaseModel):
    id: int
    filename: str
    upload_date: datetime
    file_size: int
    mime_type: str
    status: str
    analysis_results: List[AnalysisResult] = []

    class Config:
        orm_mode = True
