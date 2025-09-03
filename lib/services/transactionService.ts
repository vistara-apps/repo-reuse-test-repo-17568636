import { Transaction, PaginationParams, PaginatedResponse } from '../types';

// Mock data for development
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: '0xabcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234',
    from: '0x1234567890123456789012345678901234567890',
    to: '0x0987654321098765432109876543210987654321',
    value: '0.1',
    timestamp: '2023-09-15T12:00:00Z',
    status: 'confirmed',
    blockNumber: 12345678,
    gasUsed: '21000',
    gasPrice: '20000000000',
  },
  {
    hash: '0xdcba4321dcba4321dcba4321dcba4321dcba4321dcba4321dcba4321dcba4321',
    from: '0x1234567890123456789012345678901234567890',
    to: '0x2468013579246801357924680135792468013579',
    value: '0.05',
    timestamp: '2023-09-14T10:30:00Z',
    status: 'confirmed',
    blockNumber: 12345670,
    gasUsed: '21000',
    gasPrice: '25000000000',
  },
  {
    hash: '0x9876543210987654321098765432109876543210987654321098765432109876',
    from: '0x0987654321098765432109876543210987654321',
    to: '0x1234567890123456789012345678901234567890',
    value: '0.2',
    timestamp: '2023-09-13T08:15:00Z',
    status: 'confirmed',
    blockNumber: 12345660,
    gasUsed: '21000',
    gasPrice: '18000000000',
  },
];

/**
 * Fetch transactions with pagination
 */
export async function fetchTransactions(params: PaginationParams = {}): Promise<PaginatedResponse<Transaction>> {
  const { limit = 10, offset = 0 } = params;
  
  // In a real implementation, this would call an API endpoint
  // For now, we'll use mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: MOCK_TRANSACTIONS.slice(offset, offset + limit),
    pagination: {
      total: MOCK_TRANSACTIONS.length,
      limit,
      offset,
    },
  };
}

/**
 * Submit a new transaction
 */
export async function submitTransaction(params: {
  to: string;
  value: string;
  data?: string;
}): Promise<{ hash: string }> {
  const { to, value, data = '0x' } = params;
  
  // In a real implementation, this would use wagmi/viem to send a transaction
  // For now, we'll simulate a successful transaction
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a random transaction hash
  const hash = `0x${Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
  
  return { hash };
}

/**
 * Get transaction details by hash
 */
export async function getTransactionByHash(hash: string): Promise<Transaction | null> {
  // In a real implementation, this would call an API endpoint
  // For now, we'll use mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const transaction = MOCK_TRANSACTIONS.find(tx => tx.hash === hash);
  
  return transaction || null;
}

