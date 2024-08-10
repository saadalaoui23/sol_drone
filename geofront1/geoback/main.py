from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, model, schema
from .DB import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schema.User)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email déjà pris")
        return crud.create_user(db=db, user=user)
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})

@app.patch("/users/assign-admin/")
def assign_admin(user_ids: list[int], db: Session = Depends(get_db)):
    # Promote specific users to admin
    for user_id in user_ids:
        user = crud.get_user(db, user_id=user_id)
        if not user:
            raise HTTPException(status_code=404, detail=f"User avec ID {user_id} est introuvable")
        user.is_admin = True
        db.commit()
        db.refresh(user)
    
    # Set all other users' is_admin to False
    all_users = crud.get_users(db)
    for user in all_users:
        if user.id not in user_ids:
            user.is_admin = False
            db.commit()
            db.refresh(user)
    
    return {"message": "utilisateur enregistré avec succes"}
@app.post("/login/")
def login(user: schema.UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_email(db, email=user.email)
        if not db_user:
            raise HTTPException(status_code=400, detail="Email ou Mot de passe incorrecte")
        if not crud.verify_password(db_user.mot_de_passe, user.mot_de_passe):
            raise HTTPException(status_code=400, detail="Email ou Mot de passe incorrecte")
        return {"message": "connexion réussite"}
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})

@app.get("/users/", response_model=list[schema.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        users = crud.get_users(db, skip=skip, limit=limit)
        return users
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})
    
@app.get("/api/locations/", response_model=List[dict])
async def get_locations():
    return [
        {"latitude": 31.6295, "longitude": -7.9811, "description": "Marrakech"},
        {"latitude": 34.020882, "longitude": -118.24357, "description": "Los Angeles"}
    ]




