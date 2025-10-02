from pydantic import BaseModel
from datetime import datetime

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

class Document(BaseModel):
    id: int
    filename: str
    upload_date: datetime
    file_size: int
    mime_type: str
    status: str

    class Config:
        orm_mode = True
