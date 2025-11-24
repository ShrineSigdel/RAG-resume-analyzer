"use client";

import { useCallback, useState } from "react";
import { Upload, FileCheck, Loader2, AlertCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { uploadResume } from "@/lib/api";

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadedFile, setUploadedFile, isUploading, setIsUploading } =
    useStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");

    if (!pdfFile) {
      setError("Please upload a PDF file");
      return;
    }

    await handleFileUpload(pdfFile);
  }, []);

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];

      if (!file) return;

      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }

      await handleFileUpload(file);
    },
    []
  );

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadResume(file);

      setUploadedFile({
        name: file.name,
        size: file.size,
        uploadDate: response.timestamp,
        status: "success",
      });
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      setUploadedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Upload Resume
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-light">
          PDF format supported
        </p>
      </div>

      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center
            transition-all duration-300 cursor-pointer group
            ${
              isDragging
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 scale-[1.02]"
                : "border-gray-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-transparent"
            }
            ${isUploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-12"
          >
            {isUploading ? (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
                  <Loader2
                    className="relative w-16 h-16 text-blue-500 mb-6 animate-spin"
                    strokeWidth={2}
                  />
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  Processing...
                </p>
                <p className="text-sm text-gray-500 mt-2 font-light">
                  Analyzing your resume
                </p>
              </>
            ) : (
              <>
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
                  <Upload
                    className="relative w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  {isDragging
                    ? "Drop your resume here"
                    : "Drop your resume or click to browse"}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-light">
                  PDF files up to 10MB
                </p>
              </>
            )}
          </label>
        </div>
      ) : (
        <div className="flex-1 flex items-start">
          <div className="w-full bg-gradient-to-br from-white to-gray-50/50 border border-gray-200 rounded-2xl p-8 shadow-sm fade-in">
            <div className="flex items-start gap-5">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3.5 rounded-xl shadow-lg">
                <FileCheck className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                  {uploadedFile.name}
                </h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-400">Size:</span>{" "}
                    {formatFileSize(uploadedFile.size)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-400">Uploaded:</span>{" "}
                    {formatDate(uploadedFile.uploadDate)}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Ready for analysis
                </div>
              </div>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="mt-6 w-full px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Upload Different Resume
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 fade-in">
          <AlertCircle
            className="w-5 h-5 text-red-500 flex-shrink-0"
            strokeWidth={2}
          />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
