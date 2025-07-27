import React, { useState, useEffect } from 'react';
import { CreateUserDto, UpdateUserDto, User } from '../types/user';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function UserForm({ user, onSubmit, onCancel, loading = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setTouched({ name: true, email: true });
      return;
    }
    try {
      await onSubmit(formData);
      if (!user) {
        setFormData({ name: '', email: '' });
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-sm border border-blue-100/50 rounded-2xl p-8 shadow-xl shadow-blue-500/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <span className="uppercase tracking-wider">Personal Information</span>
          </div>
          <div className="relative group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 py-4 bg-white border-2 text-black transition-all duration-300 rounded-xl shadow-sm placeholder-transparent focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.name && touched.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                  : 'border-slate-200 focus:border-blue-500 hover:border-blue-300 focus:ring-4 focus:ring-blue-500/20'
              }`}
              disabled={loading}
              placeholder="Full Name"
            />
            <label className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
              formData.name
                ? '-top-3 text-xs bg-white px-2 text-blue-800 font-bold border border-blue-200 shadow-lg'
                : 'top-4 text-slate-600 bg-white px-2'
            }`}>
              Full Name
            </label>
            <div className="absolute right-4 top-4 opacity-40">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {errors.name && touched.name && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-slide-down">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 py-4 bg-white border-2 text-black transition-all duration-300 rounded-xl shadow-sm placeholder-transparent focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 ${
                errors.email && touched.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                  : 'border-slate-200 focus:border-blue-500 hover:border-blue-300 focus:ring-4 focus:ring-blue-500/20'
              }`}
              disabled={loading}
              placeholder="Email Address"
            />
            <label className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
              formData.email
                ? '-top-3 text-xs bg-white px-2 text-blue-800 font-bold border border-blue-200 shadow-lg'
                : 'top-4 text-slate-600 bg-white px-2'
            }`}>
              Email Address
            </label>
            <div className="absolute right-4 top-4 opacity-40">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            {errors.email && touched.email && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-slide-down">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="group relative flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={user ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                  </svg>
                  <span>{user ? 'Update User' : 'Create User'}</span>
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="group px-6 py-4 bg-white/70 backdrop-blur-sm border-2 border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-500/20 transition-all duration-300 hover:bg-slate-50/80"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancel</span>
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
