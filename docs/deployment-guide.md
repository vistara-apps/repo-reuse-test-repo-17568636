# Deployment Guide

This document provides instructions for deploying the repo-reuse-test application to various environments.

## Prerequisites

Before deploying, ensure you have the following:

- Node.js 18.x or later
- npm 9.x or later
- Access to the deployment environment
- Required environment variables

## Environment Variables

The application requires the following environment variables:

```
# OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: Redis (for caching)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## Local Development

To run the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/repo-reuse-test-repo-17568636.git
   cd repo-reuse-test-repo-17568636
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the required environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Configure the environment variables in the Vercel dashboard.
3. Deploy the application.

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t repo-reuse-test .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 -e NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key repo-reuse-test
   ```

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions

The repository includes GitHub Actions workflows for CI/CD:

- **CI Workflow**: Runs on pull requests to validate code quality and run tests.
- **CD Workflow**: Deploys to staging on merge to `develop` branch and to production on merge to `main` branch.

### Environment-Specific Deployments

- **Development**: Automatically deployed from the `develop` branch.
- **Staging**: Manually triggered from the GitHub Actions workflow.
- **Production**: Automatically deployed from the `main` branch after approval.

## Post-Deployment Verification

After deploying, verify the following:

1. The application loads correctly.
2. Wallet connection works properly.
3. API endpoints are accessible.
4. Blockchain interactions function as expected.

## Rollback Procedure

If issues are detected after deployment:

1. Identify the last stable version.
2. Revert to that version in the repository.
3. Trigger a new deployment with the stable version.

## Monitoring and Logging

- Application logs are available in the deployment platform's dashboard.
- Set up alerts for critical errors.
- Monitor performance metrics using the platform's tools.

## Security Considerations

- Regularly update dependencies.
- Implement rate limiting for API endpoints.
- Use environment variables for sensitive information.
- Follow security best practices for wallet connections.

## Support and Troubleshooting

If you encounter issues during deployment:

1. Check the application logs for error messages.
2. Verify environment variables are correctly set.
3. Ensure all dependencies are installed.
4. Check network connectivity to external services.

For additional support, contact the development team.

