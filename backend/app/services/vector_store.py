from langchain_chroma import Chroma
from app.config import settings
from uuid import uuid4
from app.services.gemini_service import gemini_service

class VectorStore:
    def __init__(self):
        self.vector_store = Chroma(
            collection_name=settings.COLLECTION_NAME,
            embedding_function = gemini_service.create_embeddings(),
            persist_directory=str(settings.CHROMA_PERSIST_DIR),
        )

    def add_documents(self, documents: list):
        uuids = [str(uuid4()) for _ in range(len(documents))]
        self.vector_store.add_documents(documents=documents, ids=uuids)

    def query(self, query: str, top_k: int = 3):
        results = self.vector_store.similarity_search(
            query,
            k=top_k
        )
        return results
    
vector_store = VectorStore()