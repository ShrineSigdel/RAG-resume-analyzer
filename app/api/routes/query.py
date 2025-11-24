from fastapi import APIRouter
from datetime import datetime, timezone
from app.services.rag_pipeline import rag_pipeline
import logging
router = APIRouter()

logger = logging.getLogger(__name__)
    
@router.post("/query")
async def post_query(user_query: str):
    
    response = await rag_pipeline.answer_questions(user_query)
    logger.info("Query processed successfully.")
    logger.info("Response: %s", response)
    return response