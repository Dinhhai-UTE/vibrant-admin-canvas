
import api from "./api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  birthDate: string;
  image: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  domain?: string;
  ip?: string;
  address?: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const userService = {
  getUsers: async (params?: { limit?: number; skip?: number; search?: string }) => {
    const { search, ...rest } = params || {};
    let url = "/users";
    
    if (search) {
      url = `/users/search?q=${search}`;
    }
    
    const response = await api.get<UsersResponse>(url, { params: rest });
    return response.data;
  },
  
  getUser: async (id: number) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (userData: Omit<User, "id">) => {
    const response = await api.post<User>("/users/add", userData);
    return response.data;
  },
  
  updateUser: async (id: number, userData: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id: number) => {
    const response = await api.delete<{ id: number; isDeleted: boolean; deletedOn: string }>(`/users/${id}`);
    return response.data;
  }
};
