'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '../../lib/hooks/useWallet';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { getUserProfile } from '../../lib/services/userService';
import { User } from '../../lib/types';

export default function Profile() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
          
          <div className="mt-8">
            <Card>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : user ? (
                <ProfileForm user={user} onUpdate={setUser} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">Failed to load profile. Please try again later.</p>
                </div>
              )}
            </Card>
          </div>
          
          <div className="mt-8">
            <Card title="Wallet Information">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white break-all">
                    {address}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Network</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    Base Mainnet
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user?.transactionCount || 0}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

