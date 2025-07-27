import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { CreateUserDto, UpdateUserDto } from '../types/user';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function HomePage() {
  const { users, loading, error, createUser, updateUser, deleteUser, refetch } = useUsers();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateUser = async (data: CreateUserDto | UpdateUserDto) => {
    try {
      setCreateLoading(true);
      // Only pass name and email for creation
      const { name = '', email = '' } = data;
      await createUser({ name, email });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Create user failed:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100/40 to-indigo-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            User Management
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Modern interface designed for your NestJS backend. Experience seamless user management with beautiful interactions.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-6">
            <div className="flex items-center space-x-2 text-sm text-slate-700">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Connected to Backend</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{users.length} Users</span>
            </div>
          </div>
        </div>
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={refetch}
            className="group inline-flex items-center px-4 py-2 bg-white/90 border border-slate-300 text-slate-800 rounded-xl hover:bg-slate-100 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="flex items-center space-x-2">
              <svg className={`w-5 h-5 transition-transform duration-300 ${showCreateForm ? 'rotate-45' : 'group-hover:rotate-12'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showCreateForm ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
              </svg>
              <span>{showCreateForm ? 'Cancel' : 'Add New User'}</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 bg-gradient-to-r from-red-100 to-red-200/60 border border-red-300/60 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-red-900 font-semibold">Something went wrong</h3>
                  <p className="text-red-800 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-colors duration-200 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        {/* Create User Form */}
        {showCreateForm && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New User</h2>
              <p className="text-slate-700">Add a new member to your team</p>
            </div>
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={() => setShowCreateForm(false)}
              loading={createLoading}
            />
          </div>
        )}
        {/* Users Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
                <span>Team Members</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-900">
                  {users.length}
                </span>
              </h2>
              <p className="text-slate-700 mt-1">Manage your team and their access</p>
            </div>
            {!loading && users.length > 0 && (
              <div className="hidden sm:flex items-center space-x-4 text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            )}
          </div>
          <UserList
            users={users}
            onUpdate={updateUser}
            onDelete={deleteUser}
            loading={loading}
          />
        </div>
        {/* Footer Info */}
       
      </div>
    </div>
  );
}
