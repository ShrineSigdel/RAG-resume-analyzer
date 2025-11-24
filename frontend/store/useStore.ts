import { create } from 'zustand';
import { UploadedFile, Message } from '@/types';

interface AppState {
  uploadedFile: UploadedFile | null;
  messages: Message[];
  isUploading: boolean;
  isChatting: boolean;
  
  setUploadedFile: (file: UploadedFile | null) => void;
  addMessage: (message: Message) => void;
  setIsUploading: (isUploading: boolean) => void;
  setIsChatting: (isChatting: boolean) => void;
  clearMessages: () => void;
}

export const useStore = create<AppState>((set) => ({
  uploadedFile: null,
  messages: [],
  isUploading: false,
  isChatting: false,
  
  setUploadedFile: (file) => set({ uploadedFile: file }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsChatting: (isChatting) => set({ isChatting }),
  clearMessages: () => set({ messages: [] }),
}));
