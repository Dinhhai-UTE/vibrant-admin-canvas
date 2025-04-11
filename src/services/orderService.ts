
import api from "./api";

export interface OrderItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Order {
  id: number;
  userId: number;
  products: OrderItem[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  date?: string;
  status?: 'pending' | 'completed' | 'cancelled';
}

export interface OrdersResponse {
  carts: Order[];
  total: number;
  skip: number;
  limit: number;
}

// We're using the carts endpoint from DummyJSON as a substitute for orders
export const orderService = {
  getOrders: async (params?: { limit?: number; skip?: number; userId?: number }) => {
    const response = await api.get<OrdersResponse>("/carts", { params });
    
    // Add date and status to each order for our demo
    const enhancedOrders = {
      ...response.data,
      carts: response.data.carts.map(order => ({
        ...order,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'cancelled'
      }))
    };
    
    return enhancedOrders;
  },
  
  getOrder: async (id: number) => {
    const response = await api.get<Order>(`/carts/${id}`);
    
    // Add date and status for our demo
    const enhancedOrder = {
      ...response.data,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'cancelled'
    };
    
    return enhancedOrder;
  },
  
  getUserOrders: async (userId: number) => {
    const response = await api.get<OrdersResponse>(`/carts/user/${userId}`);
    
    // Add date and status to each order for our demo
    const enhancedOrders = {
      ...response.data,
      carts: response.data.carts.map(order => ({
        ...order,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'cancelled'
      }))
    };
    
    return enhancedOrders;
  },
  
  createOrder: async (orderData: { userId: number; products: { id: number; quantity: number }[] }) => {
    const response = await api.post<Order>("/carts/add", orderData);
    return response.data;
  },
  
  updateOrder: async (id: number, orderData: Partial<Order>) => {
    // DummyJSON doesn't have a proper cart update endpoint, so we're mocking it
    const response = await api.get<Order>(`/carts/${id}`);
    return { ...response.data, ...orderData };
  },
  
  deleteOrder: async (id: number) => {
    // DummyJSON doesn't have a proper cart delete endpoint, so we're mocking it
    return { id, isDeleted: true, deletedOn: new Date().toISOString() };
  }
};
