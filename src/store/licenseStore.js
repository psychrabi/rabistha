import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = "http://localhost:4000/api";

export const useAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      licenses: [],
      sales: [],
      users: [],

      login: async (data) => {
        try {
          const response = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          
          if (result.success) {
            set({ isAuthenticated: true, admin: result.admin });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login failed:", error);
          return false;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, admin: null });
      },

      fetchLicenses: async () => {
        try {
          const response = await fetch(`${API_URL}/admin/licenses`);
          if (!response.ok) throw new Error("Failed to fetch licenses");
          
          const licenses = await response.json();
          const formattedLicenses = licenses.map(license => ({
            ...license,
            purchaseDate: new Date(license.purchaseDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }),
            soldDate: license.soldDate ? new Date(license.soldDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }) : null,
            lastDeactivated: license.lastDeactivated ? new Date(license.lastDeactivated).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }) : null
          }));
          
          set({ licenses: formattedLicenses });
        } catch (error) {
          console.error("Error fetching licenses:", error);
          set({ licenses: [] });
        }
      },

      fetchSales: async () => {
        try {
          const response = await fetch(`${API_URL}/admin/sales`);
          if (!response.ok) throw new Error("Failed to fetch sales");
          
          const sales = await response.json();
          set({ sales });
        } catch (error) {
          console.error("Error fetching sales:", error);
          set({ sales: [] });
        }
      },

      fetchUsers: async () => {
        try {
          const response = await fetch(`${API_URL}/admin/users`);
          if (!response.ok) throw new Error("Failed to fetch users");
          
          const users = await response.json();
          set({ users });
        } catch (error) {
          console.error("Error fetching users:", error);
          set({ users: [] });
        }
      },

      revokeLicense: async (licenseId) => {
        try {
          const response = await fetch(`${API_URL}/admin/licenses/${licenseId}/deactivate`, {
            method: "POST"
          });
          if (!response.ok) throw new Error("Failed to revoke license");
          
          const result = await response.json();
          if (result.success) {
            set((state) => ({
              licenses: state.licenses.map((license) =>
                license.id === licenseId ? { ...license, status: 'deactivated' } : license
              ),
            }));
          }
        } catch (error) {
          console.error("Error revoking license:", error);
        }
      },

      addLicense: async (licenses) => {
        try {
          const response = await fetch(`${API_URL}/admin/licenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ licenses })
          });
          
          if (!response.ok) throw new Error("Failed to add licenses");
          
          const result = await response.json();
          if (result.success) {
            // Refresh the licenses list after adding new ones
            await set((state) => ({ ...state })).fetchLicenses();
          }
        } catch (error) {
          console.error("Error adding licenses:", error);
        }
      }
    }),
    {
      name: 'license-storage',
    }
  )
);