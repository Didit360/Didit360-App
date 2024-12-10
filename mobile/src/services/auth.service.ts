```typescript
import { SecureStorage } from '@nativescript/core';
import { apiService } from './api.service';
import { LoginCredentials, AuthResponse } from '../types/auth';

export class AuthService {
  private static secureStorage = new SecureStorage();

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    await this.saveTokens(response.token, response.refreshToken);
    return response;
  }

  static async logout(): Promise<void> {
    const refreshToken = await this.secureStorage.getSync('refresh_token');
    if (refreshToken) {
      try {
        await apiService.post('/auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    await this.clearTokens();
  }

  private static async saveTokens(token: string, refreshToken: string): Promise<void> {
    await this.secureStorage.setSync('auth_token', token);
    await this.secureStorage.setSync('refresh_token', refreshToken);
  }

  private static async clearTokens(): Promise<void> {
    await this.secureStorage.removeSync('auth_token');
    await this.secureStorage.removeSync('refresh_token');
  }
}
```