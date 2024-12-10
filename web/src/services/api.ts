import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors
    if (error.response.status === 401 && originalRequest && !originalRequest.headers._retry) {
      originalRequest.headers._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post('/auth/refresh', { refreshToken });
        const { token, refreshToken: newRefreshToken } = response.data;
        
        // Update auth store with new tokens
        useAuthStore.getState().setAuth(
          token, 
          newRefreshToken, 
          useAuthStore.getState().user
        );

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear auth state and redirect to login on refresh token failure
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other common errors
    const errorMessage = error.response.data?.message || 'An error occurred';
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

// API wrapper functions
const apiService = {
  async get<T>(endpoint: string, params = {}) {
    const response = await api.get<T>(endpoint, { params });
    return response.data;
  },

  async post<T>(endpoint: string, data = {}) {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },

  async put<T>(endpoint: string, data = {}) {
    const response = await api.put<T>(endpoint, data);
    return response.data;
  },

  async delete<T>(endpoint: string) {
    const response = await api.delete<T>(endpoint);
    return response.data;
  },

  // Helper method for file uploads
  async upload<T>(endpoint: string, formData: FormData) {
    const response = await api.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default apiService;