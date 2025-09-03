import { User } from '../types';

// Mock user data for development
const MOCK_USER: User = {
  address: '0x1234567890123456789012345678901234567890',
  username: 'crypto_user',
  bio: 'Blockchain enthusiast and developer',
  avatarUrl: 'https://i.pravatar.cc/300',
  joinedAt: '2023-08-01T00:00:00Z',
  transactionCount: 42,
};

/**
 * Get user profile by address
 */
export async function getUserProfile(address: string): Promise<User | null> {
  // In a real implementation, this would call an API endpoint
  // For now, we'll use mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock user with the requested address
  return {
    ...MOCK_USER,
    address,
  };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  address: string,
  updates: Partial<Pick<User, 'username' | 'bio' | 'avatarUrl'>>
): Promise<User> {
  // In a real implementation, this would call an API endpoint
  // For now, we'll use mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return updated user
  return {
    ...MOCK_USER,
    address,
    ...updates,
  };
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  // In a real implementation, this would call an API endpoint
  // For now, we'll simulate some usernames as taken
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // List of "taken" usernames for demonstration
  const takenUsernames = ['admin', 'user', 'test', 'crypto_user'];
  
  return !takenUsernames.includes(username.toLowerCase());
}

