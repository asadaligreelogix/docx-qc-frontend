"use client";
import { useRef, useState } from "react";
import api from "@/lib/api";
import { FileCheckResponse, HTTPValidationError } from "@/types/api";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";

export default function FileUploadForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [result, setResult] = useState<FileCheckResponse | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setResult(null);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setResult(null);
    if (!file) {
      setError("Please select a DOCX file.");
      return;
    }
    if (!file.name.endsWith(".docx")) {
      setError("Only .docx files are allowed.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post<FileCheckResponse>("/check", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setSuccess("File checked successfully!");
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail.map((d: any) => d.msg).join(", "));
      } else {
        setError("Failed to check file. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="block text-lg font-semibold mb-2">Upload DOCX File</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-60"
        >
          {loading ? <LoadingSpinner /> : "Check File"}
        </button>
      </form>
      <Toast
        message={error || success || ""}
        type={error ? "error" : "success"}
        show={!!error || !!success}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
      />
      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Results for: {result.filename}</h3>
          <div className="bg-gray-50 dark:bg-zinc-800 rounded p-4 mb-4">
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Processing Time:</span> {result.processing_time ? `${result.processing_time}s` : "-"}
            </div>
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Checked At:</span> {new Date(result.report.timestamp).toLocaleString()}
            </div>
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Document Path:</span> {result.report.document_path}
            </div>
            <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Summary:</span> <pre className="inline whitespace-pre-wrap">{JSON.stringify(result.report.summary, null, 2)}</pre>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quality Control Checks</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded">
                <thead>
                  <tr className="bg-blue-100 dark:bg-zinc-700">
                    <th className="px-2 py-1">Rule</th>
                    <th className="px-2 py-1">Passed</th>
                    <th className="px-2 py-1">Type</th>
                    <th className="px-2 py-1">Message</th>
                    <th className="px-2 py-1">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {result.report.checks.map((check, idx) => (
                    <tr key={idx} className={check.passed ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}>
                      <td className="px-2 py-1 font-medium">{check.rule_name}</td>
                      <td className="px-2 py-1">{check.passed ? "✅" : "❌"}</td>
                      <td className="px-2 py-1">{check.violation_type}</td>
                      <td className="px-2 py-1">{check.message}</td>
                      <td className="px-2 py-1">{check.details || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 