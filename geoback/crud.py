from sqlalchemy.orm import Session
from . import model, schema
import bcrypt
from datetime import datetime


def get_user_by_email(db: Session, email: str):
    return db.query(model.User).filter(model.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.User).offset(skip).limit(limit).all()


def get_user(db: Session, user_id: int):
    return db.query(model.User).filter(model.User.id == user_id).first()


def create_user(db: Session, user: schema.UserCreate):
    hashed_password = bcrypt.hashpw(user.mot_de_passe.encode('utf-8'), bcrypt.gensalt())
    db_user = model.User(
        prenom=user.prenom,
        nom=user.nom,
        email=user.email,
        num=user.num,
        nom_entreprise=user.nom_entreprise,
        mot_de_passe=hashed_password.decode('utf-8'),
        is_admin=False 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def verify_password(stored_password: str, provided_password: str) -> bool:
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))






