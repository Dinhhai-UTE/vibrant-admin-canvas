
import api from "./api";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productService = {
  getProducts: async (params?: { limit?: number; skip?: number; search?: string; category?: string }) => {
    const { search, category, ...rest } = params || {};
    let url = "/products";
    
    if (search) {
      url = `/products/search?q=${search}`;
    } else if (category) {
      url = `/products/category/${category}`;
    }
    
    const response = await api.get<ProductsResponse>(url, { params: rest });
    return response.data;
  },
  
  getProduct: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: Omit<Product, "id">) => {
    const response = await api.post<Product>("/products/add", productData);
    return response.data;
  },
  
  updateProduct: async (id: number, productData: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id: number) => {
    const response = await api.delete<{ id: number; isDeleted: boolean; deletedOn: string }>(`/products/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get<string[]>("/products/categories");
    return response.data;
  }
};
