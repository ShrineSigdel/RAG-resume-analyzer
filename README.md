# 🎯 RAG Resume Analyzer

A modern, AI-powered resume analysis tool that uses Retrieval-Augmented Generation (RAG) to answer questions about candidate resumes. Built with FastAPI, Next.js, and Google's Gemini AI.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## 🌟 Features

- 📄 **Resume Upload**: Upload PDF resumes with drag-and-drop interface
- 🤖 **AI-Powered Analysis**: Query candidate information using natural language
- 💬 **Interactive Chat**: ChatGPT-style interface for resume Q&A
- 🔍 **RAG Pipeline**: Retrieval-Augmented Generation for accurate, context-based responses
- 🎨 **Modern UI**: Clean, professional interface with blue-and-white color palette
- ⚡ **Real-time Processing**: Fast document processing and vector storage

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Next.js UI    │─────▶│  FastAPI Backend │─────▶│  Gemini AI API  │
│  (TypeScript)   │      │    (Python)      │      │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   ChromaDB       │
                         │  Vector Store    │
                         └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Python** 3.8+
- **Node.js** 18+
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/RAG-resume-analyzer.git
   cd RAG-resume-analyzer
   ```

2. **Navigate to backend directory**

   ```bash
   cd backend
   ```

3. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**

   Create a `.env` file in the `backend` directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ANONYMIZED_TELEMETRY=False
   CHROMA_TELEMETRY=False
   LANGCHAIN_TRACING_V2=false
   ```

6. **Run the backend server**

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the `frontend` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
RAG-resume-analyzer/
├── backend/                # FastAPI Backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/    # API endpoints (upload, query, health)
│   │   ├── services/      # Core business logic
│   │   │   ├── document_loader.py
│   │   │   ├── vector_store.py
│   │   │   ├── gemini_service.py
│   │   │   └── rag_pipeline.py
│   │   ├── prompts/       # AI prompt templates
│   │   ├── utils/         # Helper functions
│   │   ├── config.py      # Settings & configuration
│   │   └── main.py        # FastAPI app entry point
│   ├── data/              # Uploaded files & vector DB
│   └── requirements.txt
│
└── frontend/              # Next.js Frontend
    ├── app/               # Next.js 14 App Router
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/        # React components
    │   ├── Header.tsx
    │   ├── FileUpload.tsx
    │   ├── ChatInterface.tsx
    │   └── MessageBubble.tsx
    ├── lib/               # API client & utilities
    ├── store/             # State management (Zustand)
    ├── types/             # TypeScript types
    └── package.json
```

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

Returns backend status and dependencies.

### Upload Resume

```http
POST /upload
Content-Type: multipart/form-data

file: resume.pdf
```

Uploads and processes a PDF resume.

### Query Resume

```http
POST /query?user_query=What are the candidate's Python skills?
```

Asks questions about the uploaded resume.

## 🛠️ Tech Stack

### Backend

- **FastAPI**: Modern Python web framework
- **LangChain**: LLM orchestration
- **ChromaDB**: Vector database for embeddings
- **Google Gemini**: AI model for embeddings and generation
- **PyMuPDF**: PDF text extraction

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Axios**: HTTP client
- **React Markdown**: Markdown rendering

## 🧪 Testing with Postman

1. **Import the collection** (or create manually)
2. **Test Upload Endpoint**:

   - Method: `POST`
   - URL: `http://localhost:8000/upload`
   - Body: `form-data` with key `file` (select PDF)

3. **Test Query Endpoint**:
   - Method: `POST`
   - URL: `http://localhost:8000/query?user_query=What are the candidate's skills?`

## 🎨 Design System

- **Primary Color**: Deep Royal Blue (`#1e40af`)
- **Secondary Color**: Soft Sky Blue (`#eff6ff`)
- **Background**: Clean White (`#ffffff`)
- **Border**: Subtle Gray (`#e5e7eb`)
- **Typography**: Inter font family

## 📝 Environment Variables

### Backend (.env)

```env
GEMINI_API_KEY=your_api_key
ANONYMIZED_TELEMETRY=False
CHROMA_TELEMETRY=False
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### Backend Issues

**ChromaDB Warnings**: Disable telemetry in `.env`

```env
CHROMA_TELEMETRY=False
ANONYMIZED_TELEMETRY=False
```

**Port Already in Use**:

```bash
lsof -i :8000  # Find process using port 8000
kill -9 <PID>  # Kill the process
```

**Vector Store Empty**: Ensure you've uploaded a resume first before querying.

### Frontend Issues

**API Connection Failed**:

- Verify backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

**Build Errors**:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

## 🚢 Deployment

### Backend (Railway/Render)

1. Set environment variables in platform
2. Use `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)

1. Connect GitHub repository
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- LangChain for RAG orchestration
- ChromaDB for vector storage
- Next.js team for amazing framework

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/RAG-resume-analyzer](https://github.com/yourusername/RAG-resume-analyzer)

---

Made with ❤️ and ☕
