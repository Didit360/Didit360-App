import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserService } from '../services/user';
import { UserForm } from '../components/user/UserForm';
import type { CreateUserInput } from '../types/user';

export function CreateUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateUserInput) => {
    try {
      setIsLoading(true);
      await UserService.createUser(data);
      toast.success('User created successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create User</h1>
      <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}