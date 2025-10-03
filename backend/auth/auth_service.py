from sqlalchemy.orm import Session
from . import password_utils
from models.user import User

def create_user(db: Session, username: str, email: str, password: str) -> User:
    hashed_password = password_utils.hash_password(password)
    db_user = User(username=username, email=email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str) -> User:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()
