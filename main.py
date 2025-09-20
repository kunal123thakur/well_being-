from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
import uvicorn
from dotenv import load_dotenv

load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database setup
DATABASE_URL = "postgresql://neondb_owner:npg_GmrH9B3oDKkf@ep-withered-lake-adi4wdp2-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str

class ChatRequest(BaseModel):
    text: str

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility functions
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Routes
@app.post("/signup/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
def login_for_access_token(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"message": "Login successful"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the MindEase Campus API"}

# Chatbot route
@app.post("/chatbot/")
async def chatbot(chat_request: ChatRequest):
    if not chat_request.text:
        raise HTTPException(status_code=400, detail="Text is required")

    try:
        llm = ChatGroq(
            temperature=0.7,
            model="llama-3.1-8b-instant",
            api_key=os.getenv("GROQ_API_KEY")
        )

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", "You are a helpful assistant."),
                ("human", "{text}"),
            ]
        )

        chain = prompt | llm
        response = chain.invoke({"text": chat_request.text})
        return {"response": response.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
