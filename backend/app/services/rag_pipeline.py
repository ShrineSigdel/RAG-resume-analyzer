from app.services.document_loader import document_loader
from app.services.vector_store import vector_store
from app.services.gemini_service import gemini_service
from app.prompts.templates import RESUME_ANALYSIS_PROMPT
import logging

logger = logging.getLogger(__name__)

class RAGPipeline:

    def __init__(self):
        self.loader = document_loader
        self.vector_store = vector_store
        self.gemini_service = gemini_service

    async def process_documents(self, file_path: str):
        """Load, split, and store documents in the vector store."""
        try:
            documents = await self.loader.load_pdf(file_path)
            self.vector_store.add_documents(documents)
            logger.info("Documents loaded successfully.")
        except Exception as e:
            logger.error(f"Error during document ingestion: {e}")
            raise

    async def answer_questions(self, user_query: str) -> str:
        """Process user query and return generated response."""
        try:
            relevant_docs = self.vector_store.query(user_query)
            context = "\n".join([doc.page_content for doc in relevant_docs])
            prompt = RESUME_ANALYSIS_PROMPT.format(context=context, user_query=user_query)
            response = self.gemini_service.generate_response(prompt)
            return response
        except Exception as e:
            logger.error(f"Error during query processing: {e}")
            raise

rag_pipeline = RAGPipeline()