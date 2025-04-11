
import api from "./api";
import { User } from "./userService";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export const authService = {
  login: async (credentials: LoginRequest) => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    
    // Save token to localStorage
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
  
  getCurrentUser: (): LoginResponse | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  }
};
