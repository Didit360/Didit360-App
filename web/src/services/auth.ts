import apiService from './api';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { useAuthStore } from '../stores/authStore';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    return response;
  }

  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', credentials);
    return response;
  }

  static async logout(): Promise<void> {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (refreshToken) {
      try {
        await apiService.post('/auth/logout', { refreshToken });
      } catch (error) {
        // Ignore logout errors
      }
    }
    useAuthStore.getState().clearAuth();
  }

  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response;
  }

  static async requestPasswordReset(email: string): Promise<void> {
    await apiService.post('/auth/request-reset', { email });
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/reset-password', { token, newPassword });
  }

  static async verifyEmail(token: string): Promise<void> {
    await apiService.post('/auth/verify-email', { token });
  }

  static async resendVerificationEmail(): Promise<void> {
    await apiService.post('/auth/resend-verification');
  }

  static async updateProfile(data: Partial<{ name: string; email: string }>): Promise<void> {
    await apiService.put('/auth/profile', data);
  }

  static async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiService.put('/auth/change-password', data);
  }
}