import React from 'react';
import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isEditing: boolean;
}

export default function UserCard({ user, onEdit, onDelete, isDeleting, isEditing }: UserCardProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = [
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-red-400 to-red-600'
  ];
  const colorIndex = parseInt(user._id) % colors.length;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      onDelete(user._id);
    }
  };

  return (
    <div className={`group relative bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-500 ${isEditing ? 'ring-2 ring-blue-500/50 shadow-blue-500/20' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`relative w-12 h-12 ${colors[colorIndex]} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-slate-300/30 group-hover:scale-110 transition-transform duration-300`}>
              {initials}
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">{user.name}</h3>
              <p className="text-slate-600 text-sm flex items-center space-x-1">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{user.email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => onEdit(user)}
              className="p-2 bg-blue-100/80 text-blue-600 rounded-lg hover:bg-blue-200/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:scale-110"
              title="Edit user"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-red-100/80 text-red-600 rounded-lg hover:bg-red-200/80 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete user"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>ID: {user._id}</span>
          </div>
          {user.createdAt && (
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Created {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
