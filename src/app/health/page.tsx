"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { HealthResponse } from "@/types/api";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";

export default function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<HealthResponse>("/api/health")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to fetch health status."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">API Health Status</h1>
        {loading && <LoadingSpinner />}
        <Toast
          message={error || ""}
          type="error"
          show={!!error}
          onClose={() => setError(null)}
        />
        {data && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mt-4 w-full max-w-md">
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <span className="font-semibold">Status:</span> {data.status}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <span className="font-semibold">Version:</span> {data.version}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <span className="font-semibold">Uptime:</span> {data.uptime ? `${data.uptime}s` : "-"}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <span className="font-semibold">Timestamp:</span> {new Date(data.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 