import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserDto, UpdateUserDto } from '../types/user';
import { userApi } from '../lib/api';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  createUser: (userData: CreateUserDto) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserDto) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.findAll();
      setUsers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (userData: CreateUserDto): Promise<User> => {
    try {
      setError(null);
      const newUser = await userApi.create(userData);
      setUsers(prev => [newUser, ...prev]);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: UpdateUserDto): Promise<User> => {
    try {
      setError(null);
      const updatedUser = await userApi.update(id, userData);
      setUsers(prev => prev.map(user => user._id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      setError(null);
      await userApi.remove(id);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
}
