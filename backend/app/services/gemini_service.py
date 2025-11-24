from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from app.config import settings

class GeminiService:
    
    def __init__(self):
        self.gemini_key = settings.GOOGLE_API_KEY
        self.embedding_model = settings.EMBEDDING_MODEL
        self.model = settings.GENERATIVE_MODEL
        self.llm = ChatGoogleGenerativeAI(
            model=self.model,
            api_key=self.gemini_key,
            max_tokens=1024,
            max_retries=2,
        )

    def create_embeddings(self) -> GoogleGenerativeAIEmbeddings:
        embeddings = GoogleGenerativeAIEmbeddings(
            model=self.embedding_model,
            google_api_key=self.gemini_key
        )
        return embeddings
    
    def generate_response(self, prompt: str) -> str:
        message = HumanMessage(content=prompt)
        response = self.llm.invoke([message])
        # Handle different content types
        if isinstance(response.content, str):   
            return response.content
        elif isinstance(response.content, list) and len(response.content) > 0:
            # Extract text from first item if it's a dict, otherwise convert to string
            first_item = response.content[0]
            if isinstance(first_item, dict):
                return first_item.get("text", str(first_item))
            return str(first_item)
        else:
            return ""
        
gemini_service = GeminiService()