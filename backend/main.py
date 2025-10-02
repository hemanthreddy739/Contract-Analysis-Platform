from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from . import schemas
from .auth import auth_service, password_utils
from .database import get_db, engine
from .models import user, document, analysis_result
from .services import document_service, analysis_service

user.Base.metadata.create_all(bind=engine)
document.Base.metadata.create_all(bind=engine)
analysis_result.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = auth_service.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return auth_service.create_user(db=db, username=user.username, email=user.email, password=user.password)


@app.post("/auth/login")
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = auth_service.get_user_by_username(db, username=form_data.username)
    if not user or not password_utils.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # This is where session management would go. For now, we'll just return a success message.
    return {"message": "Login successful"}


@app.post("/documents/upload", response_model=schemas.Document)
def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Hardcoded user_id for now. Will be replaced with authenticated user.
    user_id = 1
    db_document = document_service.create_document(
        db=db,
        user_id=user_id,
        file_name=file.filename,
        file_size=file.file._file.tell(),
        mime_type=file.content_type,
        file=file.file,
    )
    background_tasks.add_task(analysis_service.analyze_document, db, db_document)
    return db_document


@app.get("/documents", response_model=List[schemas.Document])
def get_documents(db: Session = Depends(get_db)):
    # Hardcoded user_id for now. Will be replaced with authenticated user.
    user_id = 1
    return db.query(document.Document).filter(document.Document.user_id == user_id).all()


@app.get("/documents/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    db_document = db.query(document.Document).filter(document.Document.id == document_id).first()
    if not db_document:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document


@app.get("/")
def read_root():
    return {"Hello": "World"}
