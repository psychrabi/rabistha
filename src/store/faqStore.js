import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAdminStore } from './adminStore'; // Add this import

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useFAQStore = create(
  persist(
    (set, get) => ({
      faqs: [],
      loading: false,
      error: null,
      fetchFAQs: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/api/faqs`);
          if (!response.ok) throw new Error('Failed to fetch FAQs');
          const data = await response.json();
          set({ faqs: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      addFAQ: async (faq) => {
        const token = useAdminStore.getState().token;
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/faqs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(faq),
          });
          if (!response.ok) throw new Error('Failed to add FAQ');
          await get().fetchFAQs();
        } catch (error) {
          set({ error: error.message });
        }
      },
      updateFAQ: async (id, faq) => {
        const token = useAdminStore.getState().token;
        try {
          const response = await fetch(`${API_BASE_URL}/api/admin/faqs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(faq),
          });
          if (!response.ok) throw new Error('Failed to update FAQ');
          await get().fetchFAQs();
        } catch (error) {
          set({ error: error.message });
        }
      },
      deleteFAQ: async (faq) => {
        const token = useAdminStore.getState().token;
        try {
          if (confirm('Are you sure you want to delete this faq?')) {
            const response = await fetch(`${API_BASE_URL}/api/admin/faqs/${faq.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            if (!response.ok) throw new Error('Failed to delete FAQ');
            await get().fetchFAQs();
          }
        } catch (error) {
          set({ error: error.message });
        }
      },
    }),
    { name: 'faq-store' }
  )
); 