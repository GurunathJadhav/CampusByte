import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data || response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data || response.data;
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      // Ignore logout errors
      console.log('Logout error:', error);
    }
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data.data || response.data;
  },

  requestPasswordReset: async (email) => {
    const response = await api.post('/auth/password-reset', { email });
    return response.data;
  },

  confirmPasswordReset: async (token, password) => {
    const response = await api.post('/auth/password-reset/confirm', { token, password });
    return response.data;
  },

  verifyToken: async () => {
    try {
      await api.get('/auth/verify');
      return true;
    } catch {
      return false;
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data || response.data;
  },
};

export default authService;
