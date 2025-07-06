import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAdminStore } from './adminStore'; // Add this import

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useWikiStore = create(
  persist(
    (set, get) => ({
      wikis: [],
      categories: [],
      loading: false,
      error: null,
      fetchWikis: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/wikis`);
          if (!response.ok) throw new Error('Failed to fetch wikis');
          const data = await response.json();
          console.log(data)
          set({ wikis: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/categories`);
          const data = await response.json();
          set({ categories: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      addWiki: async (wiki) => {
        const token = useAdminStore.getState().token;
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/wikis`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(wiki),
          });
          if (!response.ok) throw new Error('Failed to add wiki');
          return response.json();
        } catch (error) {
          set({ error: error.message });
        }
      },
      updateWiki: async (id, wiki) => {
        const token = useAdminStore.getState().token;
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/wikis/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(wiki),
          });
          if (!response.ok) throw new Error('Failed to update wiki');
          await get().fetchWikis();
        } catch (error) {
          set({ error: error.message });
        }
      },
      deleteWiki: async (id) => {
        const token = useAdminStore.getState().token;
        try {
          if (confirm('Are you sure you want to delete this wiki?')) {
            const response = await fetch(`${API_BASE_URL}/api/admin/wikis/${id}`, {
              method: 'DELETE',
              'Authorization': `Bearer ${token}`,
            });
            if (!response.ok) throw new Error('Failed to delete wiki');
            await get().fetchWikis();
          }
        } catch (error) {
          set({ error: error.message });
        }
      },
    }),
    { name: 'wiki-store' }
  )
); 