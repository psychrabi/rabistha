import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  licenses: [],
  orders: [],
  users: [],
  settings: {},
  loading: false,
  error: null,
  
  setLicenses: (licenses) => set({ licenses }),
  setOrders: (orders) => set({ orders }),
  setUsers: (users) => set({ users }),
  setSettings: (settings) => set({ settings }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addLicense: (license) => set({ licenses: [...get().licenses, license] }),
  updateLicense: (id, updates) => set({
    licenses: get().licenses.map(license => 
      license.id === id ? { ...license, ...updates } : license
    )
  }),
  
  addOrder: (order) => set({ orders: [...get().orders, order] }),
  updateOrder: (id, updates) => set({
    orders: get().orders.map(order => 
      order.id === id ? { ...order, ...updates } : order
    )
  }),
}));

export default useAppStore;
