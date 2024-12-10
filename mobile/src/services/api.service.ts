```typescript
import axios, { AxiosInstance } from 'axios';
import { SecureStorage } from '@nativescript/core';
import { API_CONFIG } from '../config/api.config';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;
  private secureStorage: SecureStorage;

  private constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers
    });
    this.secureStorage = new SecureStorage();
    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        const token = await this.secureStorage.getSync('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = await this.secureStorage.getSync('refresh_token');
          if (refreshToken) {
            try {
              const response = await this.api.post('/auth/refresh', { refreshToken });
              await this.secureStorage.setSync('auth_token', response.data.token);
              await this.secureStorage.setSync('refresh_token', response.data.refreshToken);
              error.config.headers.Authorization = `Bearer ${response.data.token}`;
              return this.api(error.config);
            } catch (refreshError) {
              await this.secureStorage.removeSync('auth_token');
              await this.secureStorage.removeSync('refresh_token');
              throw refreshError;
            }
          }
        }
        throw error;
      }
    );
  }

  public async get<T>(endpoint: string, params = {}) {
    const response = await this.api.get<T>(endpoint, { params });
    return response.data;
  }

  public async post<T>(endpoint: string, data = {}) {
    const response = await this.api.post<T>(endpoint, data);
    return response.data;
  }

  public async put<T>(endpoint: string, data = {}) {
    const response = await this.api.put<T>(endpoint, data);
    return response.data;
  }

  public async delete<T>(endpoint: string) {
    const response = await this.api.delete<T>(endpoint);
    return response.data;
  }
}

export const apiService = ApiService.getInstance();
```