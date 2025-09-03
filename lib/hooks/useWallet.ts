'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useWallet() {
  const { address, isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const queryClient = useQueryClient();
  const [isReady, setIsReady] = useState(false);

  // Handle wallet connection status
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Clear cached data on disconnect
  const handleDisconnect = () => {
    disconnect();
    queryClient.clear();
  };

  return {
    address,
    isConnected,
    status,
    disconnect: handleDisconnect,
    isReady,
    shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '',
  };
}

