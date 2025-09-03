'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to Base Mini App</h1>
      <ConnectWallet />
    </div>
  );
}