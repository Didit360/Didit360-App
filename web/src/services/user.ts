import apiService from './api';
import type { User, CreateUserInput, UpdateUserInput } from '../types/user';

export class UserService {
  static async getUsers(): Promise<User[]> {
    return apiService.get('/users');
  }

  static async getUser(id: string): Promise<User> {
    return apiService.get(`/users/${id}`);
  }

  static async createUser(data: CreateUserInput): Promise<User> {
    return apiService.post('/users', data);
  }

  static async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    return apiService.put(`/users/${id}`, data);
  }

  static async deleteUser(id: string): Promise<void> {
    return apiService.delete(`/users/${id}`);
  }
}