import React, { useState } from 'react';
import { User, UpdateUserDto } from '../types/user';
import UserForm from './UserForm';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onUpdate: (id: string, data: UpdateUserDto) => Promise<User>;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export default function UserList({ users, onUpdate, onDelete, loading = false }: UserListProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleUpdate = async (data: UpdateUserDto) => {
    if (!editingUser) return;
    try {
      await onUpdate(editingUser._id, data);
      setEditingUser(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No users found</h3>
        <p className="text-slate-500">Get started by creating your first user account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {editingUser && (
        <div className="relative">
          <div className="absolute -top-4 left-0 right-0 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editing {editingUser.name}
            </span>
          </div>
          <UserForm
            user={editingUser}
            onSubmit={handleUpdate}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={setEditingUser}
            onDelete={handleDelete}
            isDeleting={deletingId === user._id}
            isEditing={editingUser?._id === user._id}
          />
        ))}
      </div>
    </div>
  );
}
