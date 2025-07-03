import axios from 'axios';

/**
 * Axios instance for API requests.
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL.
 * Falls back to localhost:8000 if not set (for local development).
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://docx-qc.onrender.com",
});

export default api;