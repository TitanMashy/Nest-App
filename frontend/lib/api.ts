import { User, CreateUserDto, UpdateUserDto } from '../types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status, 
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const userApi = {
  create: (data: CreateUserDto): Promise<User> =>
    apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  findAll: (): Promise<User[]> =>
    apiRequest<User[]>('/users'),

  findOne: (id: string): Promise<User> =>
    apiRequest<User>(`/users/${id}`),

  update: (id: string, data: UpdateUserDto): Promise<User> =>
    apiRequest<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  remove: (id: string): Promise<User> =>
    apiRequest<User>(`/users/${id}`, {
      method: 'DELETE',
    }),
};
