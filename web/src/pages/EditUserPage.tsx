import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserService } from '../services/user';
import { UserForm } from '../components/user/UserForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import type { User, UpdateUserInput } from '../types/user';

export function EditUserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    if (!id) return;
    try {
      const userData = await UserService.getUser(id);
      setUser(userData);
    } catch (error) {
      toast.error('Failed to load user');
      navigate('/users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: UpdateUserInput) => {
    if (!id) return;
    try {
      setIsSaving(true);
      await UserService.updateUser(id, data);
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit User</h1>
      <UserForm 
        initialValues={user}
        onSubmit={handleSubmit}
        isLoading={isSaving}
      />
    </div>
  );
}