import { NextRequest, NextResponse } from 'next/server';
import { User, ApiResponse, ProfileUpdateRequest } from '@/app/lib/types';

/**
 * GET /api/user/profile
 * Retrieves the profile information for the authenticated user
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // In a real implementation, this would verify the authentication token
    // and retrieve the user from a database
    
    // Mock user data for demonstration
    const user: User = {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'demo_user',
      profileImage: 'https://example.com/profile.jpg',
      joinedAt: new Date().toISOString(),
    };
    
    const response: ApiResponse<User> = {
      success: true,
      data: user,
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching the user profile',
      },
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * PUT /api/user/profile
 * Updates the profile information for the authenticated user
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ProfileUpdateRequest = await request.json();
    
    // Validate request body
    if (!body.username && !body.profileImage) {
      const response: ApiResponse<null> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'At least one field (username or profileImage) must be provided',
        },
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // In a real implementation, this would update the user in a database
    
    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Profile updated successfully',
      },
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while updating the user profile',
      },
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

