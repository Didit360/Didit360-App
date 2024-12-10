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

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}