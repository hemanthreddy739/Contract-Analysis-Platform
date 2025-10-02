from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from . import schemas
from .auth import auth_service, password_utils
from .database import get_db, engine
from .models import user, document
from .services import document_service

user.Base.metadata.create_all(bind=engine)
document.Base.metadata.create_all(bind=engine)

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
def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Hardcoded user_id for now. Will be replaced with authenticated user.
    user_id = 1
    return document_service.create_document(
        db=db,
        user_id=user_id,
        file_name=file.filename,
        file_size=file.file._file.tell(),
        mime_type=file.content_type,
        file=file.file,
    )


@app.get("/")
def read_root():
    return {"Hello": "World"}
