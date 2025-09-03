'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { truncateAddress } from './lib/utils';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleExplore = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Base Mini App</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your gateway to the Base blockchain ecosystem
          </p>

          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectWallet />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-green-500 mb-2">Connected as {truncateAddress(address || '')}</p>
              <Button variant="primary" size="lg" onClick={handleExplore} isLoading={isLoading}>
                Explore Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Fast Transactions</CardTitle>
              <CardDescription>Experience lightning-fast transactions on Base</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Base offers high throughput and low latency for all your blockchain needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Fees</CardTitle>
              <CardDescription>Save on transaction costs with Base</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Enjoy minimal gas fees compared to other blockchain networks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>Built on Ethereum&apos;s security model</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Base inherits the security guarantees of Ethereum while improving scalability.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Subscribe to our newsletter for the latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input type="email" placeholder="Enter your email" fullWidth />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-gray-400 mt-8">
          <p>© 2025 Base Mini App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
