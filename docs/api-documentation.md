# API Documentation

## Overview
This document outlines the API endpoints available in the repo-reuse-test application. The API follows RESTful principles and uses JSON for data exchange.

## Base URL
All API endpoints are relative to the base URL of the application:
- Development: `http://localhost:3000/api`
- Production: `https://[your-production-domain]/api`

## Authentication
Most endpoints require authentication using a wallet signature. Include the authentication token in the request headers:

```
Authorization: Bearer [wallet_signature]
```

## API Endpoints

### User Management

#### Get User Profile
```
GET /api/user/profile
```

**Description**: Retrieves the profile information for the authenticated user.

**Authentication**: Required

**Response**:
```json
{
  "address": "0x1234...5678",
  "username": "user123",
  "profileImage": "https://example.com/image.jpg",
  "joinedAt": "2023-01-01T00:00:00Z"
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 404: User not found

#### Update User Profile
```
PUT /api/user/profile
```

**Description**: Updates the profile information for the authenticated user.

**Authentication**: Required

**Request Body**:
```json
{
  "username": "newUsername",
  "profileImage": "https://example.com/new-image.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

**Status Codes**:
- 200: Success
- 400: Bad request
- 401: Unauthorized

### Blockchain Interactions

#### Get Transaction History
```
GET /api/transactions
```

**Description**: Retrieves the transaction history for the authenticated user.

**Authentication**: Required

**Query Parameters**:
- `limit` (optional): Number of transactions to return (default: 10)
- `offset` (optional): Offset for pagination (default: 0)

**Response**:
```json
{
  "transactions": [
    {
      "id": "tx123",
      "hash": "0xabcd...1234",
      "type": "transfer",
      "amount": "0.1",
      "timestamp": "2023-01-01T00:00:00Z",
      "status": "confirmed"
    }
  ],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized

#### Submit Transaction
```
POST /api/transactions
```

**Description**: Submits a new transaction to the blockchain.

**Authentication**: Required

**Request Body**:
```json
{
  "type": "transfer",
  "recipient": "0x9876...5432",
  "amount": "0.1",
  "data": "0x..."
}
```

**Response**:
```json
{
  "success": true,
  "transactionHash": "0xabcd...1234"
}
```

**Status Codes**:
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 500: Internal server error

### Data Management

#### Get Data Items
```
GET /api/data
```

**Description**: Retrieves data items for the authenticated user.

**Authentication**: Required

**Query Parameters**:
- `type` (optional): Filter by data type
- `limit` (optional): Number of items to return (default: 20)
- `offset` (optional): Offset for pagination (default: 0)

**Response**:
```json
{
  "items": [
    {
      "id": "item123",
      "type": "document",
      "name": "Example Document",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized

#### Create Data Item
```
POST /api/data
```

**Description**: Creates a new data item.

**Authentication**: Required

**Request Body**:
```json
{
  "type": "document",
  "name": "New Document",
  "content": "Document content here"
}
```

**Response**:
```json
{
  "success": true,
  "id": "item456",
  "message": "Data item created successfully"
}
```

**Status Codes**:
- 201: Created
- 400: Bad request
- 401: Unauthorized

## Error Handling
All API endpoints return errors in a consistent format:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {} // Optional additional error details
}
```

## Rate Limiting
API requests are subject to rate limiting to prevent abuse. The current limits are:
- 100 requests per minute per IP address
- 1000 requests per hour per user

When a rate limit is exceeded, the API will return a 429 Too Many Requests response with a Retry-After header indicating when the client can retry the request.

## Versioning
The API is versioned using URL path versioning. The current version is v1, which is implied in the base URL. Future versions will be explicitly specified (e.g., `/api/v2/user/profile`).

