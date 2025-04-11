
import axios from "axios";
import { toast } from "@/hooks/use-toast";

// Create an Axios instance with default config
const api = axios.create({
  baseURL: "https://dummyjson.com", // Using DummyJSON for demo
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    const message = error.response?.data?.message || "An unexpected error occurred";
    
    // Show error toast, but avoid showing for 401s during login attempts
    if (!(error.response?.status === 401 && error.config.url.includes("auth/login"))) {
      toast({
        title: `Error ${error.response?.status || ""}`,
        description: message,
        variant: "destructive",
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;
