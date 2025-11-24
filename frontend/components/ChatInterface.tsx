"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { sendQuery } from "@/lib/api";
import MessageBubble from "./MessageBubble";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { uploadedFile, messages, addMessage, isChatting, setIsChatting } =
    useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isChatting) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInput("");
    setIsChatting(true);

    try {
      const response = await sendQuery(userMessage.content);

      console.log("API Response:", response); // Debug log

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content:
          response.answer || "I apologize, but I couldn't generate a response.",
        timestamp: new Date().toISOString(),
      };

      addMessage(aiMessage);
    } catch (error) {
      console.error("Query error:", error); // Debug log
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content:
          "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          AI Assistant
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-light">
          Ask questions about the resume
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-5 pr-2">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                  <Send className="w-9 h-9 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {uploadedFile ? "Ready to Analyze" : "Upload a Resume"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {uploadedFile
                  ? "Ask me anything about the resume, interview questions, or career advice."
                  : "Upload a resume to get started with AI-powered analysis and interview prep."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isChatting && (
              <div className="flex items-start gap-3 fade-in">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                  <Loader2
                    className="w-5 h-5 text-gray-600 animate-spin"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl rounded-tl-sm px-5 py-3.5 border border-gray-100">
                  <p className="text-sm text-gray-600 font-medium">
                    Thinking...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 pt-6 mt-2"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              uploadedFile ? "Ask me anything..." : "Upload a resume to start"
            }
            disabled={!uploadedFile || isChatting}
            className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all text-sm placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || !uploadedFile || isChatting}
            className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center gap-2.5 shadow-lg shadow-blue-500/25 disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] font-semibold"
          >
            {isChatting ? (
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
            ) : (
              <Send className="w-5 h-5" strokeWidth={2.5} />
            )}
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
