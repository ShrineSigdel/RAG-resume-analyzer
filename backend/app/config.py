from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List

class Settings(BaseSettings):
    # API Settings
    API_HOST: str
    API_PORT: int
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: List[str]
    
    # Gemini API 
    GOOGLE_API_KEY: SecretStr
    
    #Model 
    EMBEDDING_MODEL: str
    GENERATIVE_MODEL: str
    
    # Vector DB
    CHROMA_PERSIST_DIR: str
    COLLECTION_NAME: str
    
    # Document Processing
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    MAX_FILE_SIZE_MB: int = 10
    
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True
    )

settings = Settings() #type: ignore