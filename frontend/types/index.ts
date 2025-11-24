export interface UploadedFile {
  name: string;
  size: number;
  uploadDate: string;
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UploadResponse {
  status: string;
  timestamp: string;
}

export interface QueryResponse {
  answer: string;
  sources?: string[];
}
