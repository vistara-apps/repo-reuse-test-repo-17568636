'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '../../lib/hooks/useWallet';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { TransactionList } from '../../components/transactions/TransactionList';
import { Button } from '../../components/ui/Button';

export default function Transactions() {
  const { isConnected, isReady } = useWallet();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home if not connected
    if (isReady && !isConnected) {
      router.push('/');
    }
  }, [isConnected, isReady, router]);
  
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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
            
            <Button
              variant="primary"
              onClick={() => {
                // In a real app, this would open a modal or navigate to a form
                alert('Send transaction functionality would be implemented here');
              }}
            >
              Send Transaction
            </Button>
          </div>
          
          <div className="mt-8">
            <Card>
              <TransactionList />
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

