// Core application types

export interface User {
  address: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  joinedAt: string;
  transactionCount: number;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  gasPrice?: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ApiError {
  error: true;
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface TokenBalance {
  token: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoUrl?: string;
  };
  balance: string;
  balanceUsd?: string;
}

export interface NFT {
  contractAddress: string;
  tokenId: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  collection?: {
    name: string;
    description?: string;
    imageUrl?: string;
  };
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  privacyMode: boolean;
}

