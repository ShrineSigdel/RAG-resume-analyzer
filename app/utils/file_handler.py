from fastapi import UploadFile, HTTPException
import aiofiles
from datetime import datetime, timezone
from pathlib import Path
from app.config import settings

async def save_upload_file(upload_file: UploadFile) -> str:
    """Save uploaded file to destination and return the file path"""
    
    # Validate file
    if not upload_file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    # Validate file size
    content = await upload_file.read()
    file_size_mb = len(content) / (1024 * 1024)
    if file_size_mb > settings.MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=413, 
            detail=f"File size exceeds {settings.MAX_FILE_SIZE_MB}MB limit"
        )
    
    # Create uploads directory if not exists
    upload_dir = Path("data/uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    unique_filename = f"{timestamp}_{upload_file.filename}"
    destination = upload_dir / unique_filename
    
    # Save file
    try:
        async with aiofiles.open(destination, 'wb') as out_file:
            await out_file.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    return str(destination)