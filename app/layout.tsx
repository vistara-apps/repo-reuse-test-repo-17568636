import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Repo Reuse Test',
  description: 'A complete Base blockchain application with wallet integration, transaction management, and user profiles.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

