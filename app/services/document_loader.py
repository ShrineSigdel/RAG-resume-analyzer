from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema import Document
from typing import List
from pathlib import Path
from app.config import settings

class DocumentLoader:
    """Service to load and split PDF documents into chunks."""
    
    async def load_pdf(self, file_path: str) -> List[Document]:
        """Load PDF and split into chunks using config settings."""
        
        # Create loader and text splitter
        loader = PyPDFLoader(file_path)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )
        
        # Load and split in one step
        chunks = loader.load_and_split(text_splitter)
        return chunks
    
document_loader = DocumentLoader()