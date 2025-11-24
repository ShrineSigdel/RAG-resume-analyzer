"use client";

import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
          {/* Left Panel - File Upload */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden slide-up">
            <FileUpload />
          </div>

          {/* Right Panel - Chat Interface */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
