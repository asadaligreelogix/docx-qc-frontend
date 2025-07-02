import axios from 'axios';

/**
 * Axios instance for API requests.
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL.
 * Falls back to localhost:8000 if not set (for local development).
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://0c04-2400-adc5-181-dc00-4572-daba-e87-4eb8.ngrok-free.app",
});

export default api;