# Technical Specifications

## Overview
This document outlines the technical specifications for the Repo Reuse Test application, a Base blockchain-integrated web application.

## Technology Stack
- **Frontend**: Next.js 15.3.3, React 18
- **Styling**: Tailwind CSS 3.4.1
- **Blockchain Integration**: 
  - OnchainKit for wallet connection
  - Wagmi for blockchain interactions
  - Viem for chain configurations
- **State Management**: React Query (TanStack Query)
- **Data Storage**: Upstash Redis for caching and temporary data storage
- **Authentication**: Wallet-based authentication using Coinbase OnchainKit

## Architecture
The application follows a client-side rendered architecture with Next.js App Router:
- `app/` - Contains all page components and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and shared logic
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks for shared functionality
- `services/` - API and blockchain service integrations

## Performance Requirements
- Initial page load under 2 seconds
- Time to interactive under 3 seconds
- Core Web Vitals compliance:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

## Security Requirements
- All API keys stored in environment variables
- No sensitive data stored in client-side code
- Proper input validation for all user inputs
- Secure wallet connection handling
- Rate limiting for API endpoints
- CORS configuration to prevent unauthorized access

## Deployment
- Hosting: Vercel
- CI/CD: GitHub Actions
- Environment Variables:
  - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API key for OnchainKit
  - `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
  - `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis authentication token

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper color contrast ratios
- Responsive design for all screen sizes

## Internationalization
- English as default language
- Support for future language additions using i18n

## Monitoring and Analytics
- Error tracking with Sentry
- Performance monitoring with Vercel Analytics
- User behavior tracking with privacy-compliant analytics

## Testing Strategy
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- Contract tests for blockchain interactions

