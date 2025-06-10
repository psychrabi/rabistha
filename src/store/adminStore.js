import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      licenses: [],
      sales: [],
      users: [],

      login: async (credentials) => {
        // TODO: Implement actual authentication
        // For now, using a mock authentication
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          set({ isAuthenticated: true, admin: { username: credentials.username } });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, admin: null });
      },

      fetchLicenses: async () => {

        const licenses = JSON.parse(localStorage.getItem('licenses')) || [];
        set({ licenses });
      },

      fetchSales: async () => {
        // TODO: Implement API call
        const mockSales = [
          { id: 1, salesPrice: 45.99, license: "64719-88274-58498-09302-42575", type: "Pro-2", fullName: "Arniko Internationa", email: "arnikointernational@gmail.com", contact: "977165487955", address: "lalitpur, chakrapath", paymentMethod: "cash", date: '2025-01-12' },
          { id: 2, salesPrice: 45.99, license: "89043-15109-40456-83712-01445", type: "Pro-2", fullName: "Arniko Internationa", email: "arnikointernational@gmail.com", contact: "977165487955", address: "lalitpur, chakrapath", paymentMethod: "card", date: '2025-01-12' },
          { id: 2, salesPrice: 45.99, license: "36221-90869-63073-94256-93158", type: "Pro-2", fullName: "Rabi Shrestha", email: "psychrabi@gmail.com", contact: "9779813098760", address: "Kathmandu, Tokha", paymentMethod: "card", date: '2025-06-6' },
        ];
        set({ sales: mockSales });
      },

      fetchUsers: async () => {
        // TODO: Implement API call
        const mockUsers = [
          { id: 1, email: 'user1', licenseId: 1 },
          { id: 2, email: 'user2', licenseId: 2 },
        ];
        set({ users: mockUsers });
      },

      revokeLicense: async (licenseId) => {
        // TODO: Implement API call
        set((state) => ({
          licenses: state.licenses.map((license) =>
            license.id === licenseId ? { ...license, status: 'revoked' } : license
          ),
        }));
      },

      addLicense: async (license) => {
        set((state) => {
          const updatedLicenses = [...state.licenses, license];
          // Store licenses in localStorage
          localStorage.setItem('licenses', JSON.stringify(updatedLicenses));
          return { licenses: updatedLicenses };
        });
      }
    }),
    {
      name: 'admin-storage',
    }
  )
); 