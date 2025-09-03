/**
 * Utility functions for the application
 */
/* eslint-disable no-unused-vars */

/**
 * Truncates an Ethereum address for display
 * @param address The full Ethereum address
 * @param startChars Number of characters to show at the start
 * @param endChars Number of characters to show at the end
 * @returns Truncated address string
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Formats a date string to a human-readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formats a number to a currency string
 * @param value Number to format
 * @param currency Currency code
 * @param decimals Number of decimal places
 * @returns Formatted currency string
 */
export function formatCurrency(value: number | string, currency = 'ETH', decimals = 4): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return `0 ${currency}`;

  return `${numValue.toFixed(decimals)} ${currency}`;
}

/**
 * Validates an Ethereum address
 * @param address Address to validate
 * @returns Boolean indicating if the address is valid
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Debounces a function
 * @param func Function to debounce
 * @param wait Wait time in milliseconds
 * @returns Debounced function
 */
// eslint-disable-next-line no-unused-vars
export function debounce<T extends (..._: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // eslint-disable-next-line no-unused-vars
  return function (...args: Parameters<T>) {
    // eslint-disable-next-line no-unused-vars
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generates a random ID
 * @param length Length of the ID
 * @returns Random ID string
 */
export function generateId(length = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

/**
 * Safely parses JSON
 * @param json JSON string to parse
 * @param fallback Fallback value if parsing fails
 * @returns Parsed JSON or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    return fallback;
  }
}
