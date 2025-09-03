'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { truncateAddress, formatDate } from '../lib/utils';
import { Transaction } from '../lib/types';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Redirect to home if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    } else {
      // Simulate fetching transactions
      setTimeout(() => {
        setTransactions([
          {
            id: 'tx1',
            hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            type: 'transfer',
            amount: '0.1',
            timestamp: new Date().toISOString(),
            status: 'confirmed',
            from: address || '',
            to: '0x0987654321fedcba0987654321fedcba09876543',
          },
          {
            id: 'tx2',
            hash: '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
            type: 'swap',
            amount: '10',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            status: 'confirmed',
            from: address || '',
            to: '0x5432109876fedcba5432109876fedcba54321098',
            tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  }, [isConnected, router, address]);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </header>
        {/* Account Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Address</h3>
                <p className="font-mono">{truncateAddress(address || '', 10, 8)}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Balance</h3>
                <p className="font-mono">0.5 ETH</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Network</h3>
                <p className="font-mono">Base Mainnet</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No transactions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-800">
                        <td className="py-3 px-4 capitalize">{tx.type}</td>
                        <td className="py-3 px-4">{tx.amount} ETH</td>
                        <td className="py-3 px-4">{formatDate(tx.timestamp)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${
                              tx.status === 'confirmed'
                                ? 'bg-green-900 text-green-300'
                                : tx.status === 'pending'
                                  ? 'bg-yellow-900 text-yellow-300'
                                  : 'bg-red-900 text-red-300'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">{truncateAddress(tx.hash, 6, 4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
