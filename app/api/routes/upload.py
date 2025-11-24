from fastapi import APIRouter, UploadFile
from datetime import datetime, timezone
from app.utils.file_handler import save_upload_file
from app.services.rag_pipeline import rag_pipeline
router = APIRouter()

@router.get("/upload")
def upload():
    return {
        "status": "upload",
        "timestamp":datetime.now(timezone.utc).isoformat()
    }   
    
@router.post("/upload")
async def upload_file(file: UploadFile):
    
    file_path = await save_upload_file(file)
    await rag_pipeline.process_documents(file_path)
    
    return {
        "status": "file uploaded",
        "timestamp":datetime.now(timezone.utc).isoformat()
    }