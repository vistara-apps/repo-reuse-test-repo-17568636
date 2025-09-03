# Base Mini App

A modern web application built on the Base blockchain, providing a seamless user experience for blockchain interactions.

## Features

- **Wallet Integration**: Connect your Ethereum wallet using Coinbase OnchainKit
- **Transaction Management**: View and manage your blockchain transactions
- **Data Storage**: Store and retrieve data securely
- **User Profiles**: Manage your user profile and settings
- **Responsive Design**: Optimized for all device sizes

## Technology Stack

- **Frontend**: Next.js 15.3.3, React 18
- **Styling**: Tailwind CSS 3.4.1
- **Blockchain Integration**: 
  - OnchainKit for wallet connection
  - Wagmi for blockchain interactions
  - Viem for chain configurations
- **State Management**: React Query (TanStack Query)
- **Data Storage**: Upstash Redis for caching and temporary data storage

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/repo-reuse-test-repo-17568636.git
   cd repo-reuse-test-repo-17568636
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the required environment variables:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

For more detailed information, please refer to the following documentation:

- [Technical Specifications](./docs/technical-specifications.md)
- [API Documentation](./docs/api-documentation.md)
- [UI/UX Requirements](./docs/ui-ux-requirements.md)
- [Deployment Guide](./docs/deployment-guide.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Base](https://base.org/) - The blockchain platform
- [Coinbase](https://www.coinbase.com/) - For OnchainKit
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Wagmi](https://wagmi.sh/) - For blockchain interactions

