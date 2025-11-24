"use client";

import { Message } from "@/types";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex items-start gap-3 fade-in ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-600"
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" strokeWidth={2.5} />
        ) : (
          <Bot className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
        )}
      </div>

      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        <div
          className={`rounded-2xl px-5 py-3.5 shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm"
              : "bg-gradient-to-br from-gray-50 to-gray-100/50 text-gray-900 border border-gray-100 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed font-normal">
              {message.content}
            </p>
          ) : (
            <div className="markdown-content text-sm">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <span
          className={`text-xs mt-2 px-1 font-light ${
            isUser ? "text-gray-400" : "text-gray-400"
          }`}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
