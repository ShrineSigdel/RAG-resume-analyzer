from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

@router.get("/query")
def query():
    return {
        "status": "query",
        "timestamp":datetime.now(timezone.utc).isoformat()
    }