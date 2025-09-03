'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '../../lib/hooks/useWallet';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { TransactionList } from '../../components/transactions/TransactionList';
import { getUserProfile } from '../../lib/services/userService';
import { User } from '../../lib/types';

export default function Dashboard() {
  const { isConnected, address, isReady } = useWallet();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Redirect to home if not connected
    if (isReady && !isConnected) {
      router.push('/');
    }
  }, [isConnected, isReady, router]);
  
  useEffect(() => {
    async function loadUserProfile() {
      if (address) {
        try {
          const profile = await getUserProfile(address);
          setUser(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    if (isConnected && address) {
      loadUserProfile();
    }
  }, [isConnected, address]);
  
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* User Profile Card */}
            <Card
              title="Your Profile"
              className="lg:col-span-1"
            >
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                      {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.username || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {user?.username || 'Anonymous User'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                    <p>{user?.bio || 'No bio provided yet.'}</p>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white break-all">
                          {address}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {user?.transactionCount || 0}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Recent Transactions Card */}
            <Card
              title="Recent Transactions"
              className="lg:col-span-2"
              footer={
                <div className="text-right">
                  <a href="/transactions" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all transactions <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              }
            >
              <TransactionList />
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

