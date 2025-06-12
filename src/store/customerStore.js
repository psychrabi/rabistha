import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = "http://localhost:4000/api";

export const useCustomerStore = create(
  persist(
    (set) => ({
      customer: null,
      orders: [],
      
      login: async (credentials) => {
        try {
          const response = await fetch(`${API_URL}/customer/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
          });
          
          const result = await response.json();
          if (result.success) {
            set({ customer: result.customer });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Customer login failed:", error);
          return false;
        }
      },

      logout: () => {
        set({ customer: null, orders: [] });
      },

      fetchOrders: async () => {
        try {
          const response = await fetch(`${API_URL}/customer/orders`);
          if (!response.ok) throw new Error("Failed to fetch orders");
          
          const orders = await response.json();
          set({ orders });
        } catch (error) {
          console.error("Error fetching orders:", error);
          set({ orders: [] });
        }
      },

      createOrder: async (orderData) => {
        try {
          const response = await fetch(`${API_URL}/customer/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
          });
          
          if (!response.ok) throw new Error("Failed to create order");
          
          const result = await response.json();
          if (result.success) {
            set((state) => ({
              orders: [...state.orders, result.order]
            }));
            return result.order;
          }
          return null;
        } catch (error) {
          console.error("Error creating order:", error);
          return null;
        }
      }
    }),
    {
      name: 'customer-storage',
    }
  )
);