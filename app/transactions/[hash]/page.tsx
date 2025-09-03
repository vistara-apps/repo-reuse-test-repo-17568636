'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '../../../lib/hooks/useWallet';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { getTransactionByHash } from '../../../lib/services/transactionService';
import { Transaction } from '../../../lib/types';
import Link from 'next/link';

export default function TransactionDetail({ params }: { params: { hash: string } }) {
  const { hash } = params;
  const { isConnected, isReady } = useWallet();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Redirect to home if not connected
    if (isReady && !isConnected) {
      router.push('/');
    }
  }, [isConnected, isReady, router]);
  
  useEffect(() => {
    async function loadTransaction() {
      try {
        const tx = await getTransactionByHash(hash);
        setTransaction(tx);
      } catch (error) {
        console.error('Error loading transaction:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (isConnected && hash) {
      loadTransaction();
    }
  }, [isConnected, hash]);
  
  if (!isReady || !isConnected) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction Details</h1>
            
            <Link href="/transactions">
              <Button variant="secondary">
                Back to Transactions
              </Button>
            </Link>
          </div>
          
          <div className="mt-8">
            <Card>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : transaction ? (
                <div>
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Hash</h3>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 break-all">
                      {transaction.hash}
                    </p>
                  </div>
                  
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">From</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white break-all">
                        {transaction.from}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">To</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white break-all">
                        {transaction.to}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Value</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {transaction.value} ETH
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </dd>
                    </div>
                    
                    {transaction.blockNumber && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Block Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {transaction.blockNumber}
                        </dd>
                      </div>
                    )}
                    
                    {transaction.gasUsed && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gas Used</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {transaction.gasUsed}
                        </dd>
                      </div>
                    )}
                    
                    {transaction.gasPrice && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gas Price</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {transaction.gasPrice} Wei
                        </dd>
                      </div>
                    )}
                  </dl>
                  
                  <div className="mt-6 flex justify-end">
                    <a 
                      href={`https://basescan.org/tx/${transaction.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View on BaseScan
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Transaction not found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">The transaction you're looking for doesn't exist or has been removed.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

