from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

@router.get("/health")
def health_check():
    """Check if API is running"""
    return {
        "status": "healthy",
        "timestamp":datetime.now(timezone.utc).isoformat()
    }