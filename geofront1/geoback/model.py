from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .DB import Base

class User(Base):
    __tablename__ = "user_geo"

    id = Column(Integer, primary_key=True, index=True)
    prenom = Column(String, nullable=False)
    nom = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    num= Column(Integer, nullable=False)
    nom_entreprise=Column(String, nullable=False)
    mot_de_passe = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)


