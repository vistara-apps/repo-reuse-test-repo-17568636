/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
