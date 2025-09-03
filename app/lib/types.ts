// Type definitions for the application

export interface User {
  address: string;
  username?: string;
  profileImage?: string;
  joinedAt: string;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'transfer' | 'swap' | 'mint' | 'burn' | 'approve';
  amount: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  from: string;
  to: string;
  tokenAddress?: string;
}

export interface DataItem {
  id: string;
  type: string;
  name: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface TransactionRequest {
  type: 'transfer' | 'swap' | 'mint' | 'burn' | 'approve';
  recipient: string;
  amount: string;
  data?: string;
  tokenAddress?: string;
}

export interface ProfileUpdateRequest {
  username?: string;
  profileImage?: string;
}

export interface DataItemRequest {
  type: string;
  name: string;
  content?: string;
}

