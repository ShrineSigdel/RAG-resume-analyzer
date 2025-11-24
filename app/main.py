import uvicorn
from app.config import settings 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import upload, query, health
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),  # Console output
    ]
)

#Create FastAPI app
app = FastAPI(
    title="Resume Analyzer and Interview Preparation Bot",
    description=" RAG-based Resume Analyzer and Interview Preparation Bot using FastAPI, LangChain, and Gemini",
    version="1.0.0",
)

#CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Include routers
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(query.router, prefix="/api", tags=["Query"])
app.include_router(health.router, prefix="/api", tags=["Health"])


@app.get('/')
def root():
    return {"message": "Welcome to the Resume Analyzer and Interview Preparation Bot API"}


if __name__ == "__main__":
    uvicorn.run("app.main:app",
                host=settings.API_HOST,
                port=settings.API_PORT,
                reload=settings.DEBUG
                )