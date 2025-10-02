from sqlalchemy.orm import Session
from models.document import Document
from services import s3_service

def create_document(
    db: Session, user_id: int, file_name: str, file_size: int, mime_type: str, file
) -> Document:
    s3_key = s3_service.upload_file_to_s3(file, user_id, file_name)
    if s3_key:
        db_document = Document(
            user_id=user_id,
            filename=file_name,
            s3_key=s3_key,
            file_size=file_size,
            mime_type=mime_type,
            status="uploaded",
        )
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
        return db_document
    return None
