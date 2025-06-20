import useAuthStore from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const { token } = useAuthStore.getState();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Something went wrong');
    }
    
    return response.json();
  }

  // Auth
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Licenses
  async getLicenses() {
    return this.request('/licenses');
  }

  async createLicense(licenseData) {
    return this.request('/licenses', {
      method: 'POST',
      body: JSON.stringify(licenseData),
    });
  }

  // Orders
  async getOrders() {
    return this.request('/orders');
  }

  // Wiki
  async getWikiPages() {
    return this.request('/wiki');
  }

  async getWikiPage(slug) {
    return this.request(`/wiki/${slug}`);
  }

  // FAQs
  async getFAQs() {
    return this.request('/faqs');
  }

  // Settings
  async getSettings() {
    return this.request('/settings');
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }
}

export default new ApiClient();