'use client';

import { useQuery } from '@tanstack/react-query';
import { Transaction, PaginationParams } from '../types';
import { fetchTransactions } from '../services/transactionService';

export function useTransactions(params: PaginationParams = {}) {
  const { limit = 10, offset = 0 } = params;

  return useQuery({
    queryKey: ['transactions', { limit, offset }],
    queryFn: () => fetchTransactions({ limit, offset }),
    enabled: true,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTransaction(hash: string | undefined) {
  return useQuery({
    queryKey: ['transaction', hash],
    queryFn: async () => {
      if (!hash) throw new Error('Transaction hash is required');
      
      // Mock implementation - would be replaced with actual API call
      const mockTransaction: Transaction = {
        hash: hash,
        from: '0x1234...5678',
        to: '0x8765...4321',
        value: '0.1',
        timestamp: new Date().toISOString(),
        status: 'confirmed',
        blockNumber: 12345678,
        gasUsed: '21000',
        gasPrice: '20000000000',
      };
      
      return mockTransaction;
    },
    enabled: !!hash,
    staleTime: 10 * 1000, // 10 seconds
  });
}

