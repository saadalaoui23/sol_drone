from pydantic import BaseModel, EmailStr
from datetime import date


class UserBase(BaseModel):
    prenom: str
    nom: str
    email: EmailStr
    num: int
    nom_entreprise: str


class UserCreate(UserBase):
    mot_de_passe: str


class User(BaseModel):
    id: int
    is_admin: bool 

    class Config:
        orm_mode = True



class UserLogin(BaseModel):
    email: EmailStr
    mot_de_passe: str

    class Config:
        orm_mode = True


