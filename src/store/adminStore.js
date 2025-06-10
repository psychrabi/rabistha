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
        // TODO: Implement API call
        const mockLicenses = [
          { id: 1, key: 'LICENSE-123', status: 'active', userId: 1, createdAt: '2024-03-20' },
          { id: 2, key: 'LICENSE-456', status: 'expired', userId: 2, createdAt: '2024-03-19' },
        ];
        set({ licenses: mockLicenses });
      },

      fetchSales: async () => {
        // TODO: Implement API call
        const mockSales = [
          { id: 1, amount: 99.99, licenseId: 1, date: '2024-03-20' },
          { id: 2, amount: 99.99, licenseId: 2, date: '2024-03-19' },
        ];
        set({ sales: mockSales });
      },

      fetchUsers: async () => {
        // TODO: Implement API call
        const mockUsers = [
          { id: 1, email: 'user1@example.com', licenseId: 1 },
          { id: 2, email: 'user2@example.com', licenseId: 2 },
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
    }),
    {
      name: 'admin-storage',
    }
  )
); 