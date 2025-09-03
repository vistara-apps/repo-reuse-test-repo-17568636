# Repo Reuse Test

A complete Base blockchain application with wallet integration, transaction management, and user profiles.

## Features

- **Wallet Integration**: Connect your wallet securely using Coinbase OnchainKit
- **Transaction Management**: View transaction history and details
- **User Profiles**: Create and manage your profile
- **Responsive Design**: Works on all devices
- **Dark Mode Support**: Toggle between light and dark themes

## Tech Stack

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
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/repo-reuse-test-repo-17568636.git
   cd repo-reuse-test-repo-17568636
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable UI components
- `lib/`: Utility functions, hooks, and services
- `docs/`: Project documentation
- `public/`: Static assets

## Documentation

For detailed documentation, see the following files:

- [Technical Specifications](docs/technical-specifications.md)
- [API Documentation](docs/api-documentation.md)
- [UI/UX Requirements](docs/ui-ux-requirements.md)
- [Requirements Checklist](docs/requirements-checklist.md)

## Deployment

This application is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and deploy.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

