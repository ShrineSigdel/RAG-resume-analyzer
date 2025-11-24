import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl blur-sm opacity-75"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                Resume Analyzer
              </h1>
              <p className="text-xs text-gray-500 font-light tracking-wide">
                AI-Powered Interview Prep
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
