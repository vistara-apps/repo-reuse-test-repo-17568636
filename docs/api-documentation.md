# API Documentation

## Overview
This document outlines the API endpoints and blockchain interactions available in the Repo Reuse Test application.

## REST API Endpoints

### Authentication

#### Connect Wallet
- **Purpose**: Authenticate user with their blockchain wallet
- **Method**: Client-side only (no server endpoint)
- **Libraries**: OnchainKit ConnectWallet component
- **Response**: Wallet connection status and user address

### User Data

#### Get User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: GET
- **Authentication**: Requires wallet signature
- **Response**: User profile data including on-chain activity
- **Example Response**:
  ```json
  {
    "address": "0x1234...5678",
    "username": "user123",
    "joinedAt": "2023-09-15T12:00:00Z",
    "transactionCount": 42
  }
  ```

#### Update User Profile
- **Endpoint**: `/api/user/profile`
- **Method**: PUT
- **Authentication**: Requires wallet signature
- **Request Body**:
  ```json
  {
    "username": "newUsername",
    "bio": "User bio text",
    "avatarUrl": "https://example.com/avatar.png"
  }
  ```
- **Response**: Updated user profile data

### Blockchain Interactions

#### Get Transaction History
- **Endpoint**: `/api/transactions`
- **Method**: GET
- **Authentication**: Requires wallet connection
- **Query Parameters**:
  - `limit`: Number of transactions to return (default: 10)
  - `offset`: Pagination offset (default: 0)
- **Response**: List of user transactions
- **Example Response**:
  ```json
  {
    "transactions": [
      {
        "hash": "0xabcd...1234",
        "timestamp": "2023-09-15T12:00:00Z",
        "value": "0.1",
        "status": "confirmed"
      }
    ],
    "pagination": {
      "total": 42,
      "limit": 10,
      "offset": 0
    }
  }
  ```

#### Submit Transaction
- **Endpoint**: `/api/transactions`
- **Method**: POST
- **Authentication**: Requires wallet signature
- **Request Body**:
  ```json
  {
    "to": "0x9876...5432",
    "value": "0.1",
    "data": "0x"
  }
  ```
- **Response**: Transaction hash and status

## Blockchain Contract Interactions

### Base Chain Contracts

#### ERC-20 Token Interactions
- **Contract Address**: Varies by token
- **Methods**:
  - `balanceOf(address)`: Get token balance
  - `transfer(address, uint256)`: Transfer tokens
  - `approve(address, uint256)`: Approve token spending

#### NFT (ERC-721) Interactions
- **Contract Address**: Varies by collection
- **Methods**:
  - `balanceOf(address)`: Get NFT count
  - `ownerOf(uint256)`: Get NFT owner
  - `transferFrom(address, address, uint256)`: Transfer NFT
  - `safeTransferFrom(address, address, uint256)`: Safely transfer NFT

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {} // Optional additional error details
}
```

Common error codes:
- `UNAUTHORIZED`: User is not authenticated
- `INVALID_PARAMETERS`: Request parameters are invalid
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `BLOCKCHAIN_ERROR`: Error occurred during blockchain interaction
- `RATE_LIMITED`: Too many requests from this user/IP

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP address
- 50 requests per minute per authenticated user

## Webhook Notifications

The application can send webhook notifications for important events:
- Transaction confirmations
- Profile updates
- New connections

To register a webhook:
- **Endpoint**: `/api/webhooks`
- **Method**: POST
- **Authentication**: Requires API key
- **Request Body**:
  ```json
  {
    "url": "https://your-service.com/webhook",
    "events": ["transaction.confirmed", "profile.updated"],
    "secret": "your_webhook_secret"
  }
  ```

