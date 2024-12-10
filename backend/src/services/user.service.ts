import { User } from '../types/user';
import { UserModel } from '../models/user.model';

export class UserService {
  async getAll(): Promise<User[]> {
    return UserModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = new UserModel(userData);
    return user.save();
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}