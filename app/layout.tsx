import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Base Mini App',
  description: 'A simple Base Mini App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
