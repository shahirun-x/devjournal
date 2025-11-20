import axios from "axios";

// 1. The Base URL
// In Codespaces, the backend URL is NOT localhost:8000.
// It is a long random string like "https://bug-free-space-..."
// Ideally, we use an Environment Variable, but for now, we'll stick to relative paths 
// or hardcode the backend URL if needed. 
// TRICK: In Codespaces, if you just use the relative path, the proxy handles it often.
// Let's start by asking you to COPY your Backend URL from the browser.

// ACTION REQUIRED: Replace this string with YOUR backend URL (the one with /docs)
// Example: "https://potential-computing-machine-...-8000.app.github.dev"
// Make sure to REMOVE the trailing slash at the end.
const API_URL = "https://potential-computing-machine-v67q66jvrr4gh97-8000.app.github.dev/"; 

const api = axios.create({
  baseURL: API_URL,
});

// 2. The Interceptor (The "Middleware")
// Every time we send a request, check if we have a token.
// If yes, attach it to the header automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;