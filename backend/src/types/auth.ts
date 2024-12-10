import { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface JwtPayload {
  userId: string;
  email: string;
  type?: 'access' | 'refresh';
}

export interface RequestPasswordResetInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
}