import { NextRequest, NextResponse } from 'next/server';
import { DataItem, ApiResponse, DataItemRequest, PaginatedResponse } from '@/app/lib/types';
import { generateId } from '@/app/lib/utils';

/**
 * GET /api/data
 * Retrieves data items for the authenticated user
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    
    // In a real implementation, this would retrieve data items from a database
    // based on the authenticated user and filter by type if provided
    
    // Mock data items for demonstration
    const dataItems: DataItem[] = [
      {
        id: 'item1',
        type: 'document',
        name: 'Example Document',
        content: 'This is an example document content.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: '0x1234567890abcdef1234567890abcdef12345678',
      },
      {
        id: 'item2',
        type: 'image',
        name: 'Example Image',
        content: 'https://example.com/image.jpg',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        ownerId: '0x1234567890abcdef1234567890abcdef12345678',
      },
    ];
    
    // Filter by type if provided
    const filteredItems = type
      ? dataItems.filter(item => item.type === type)
      : dataItems;
    
    const paginatedResponse: PaginatedResponse<DataItem> = {
      items: filteredItems.slice(offset, offset + limit),
      total: filteredItems.length,
      limit,
      offset,
    };
    
    const response: ApiResponse<PaginatedResponse<DataItem>> = {
      success: true,
      data: paginatedResponse,
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching data items:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching data items',
      },
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * POST /api/data
 * Creates a new data item
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DataItemRequest = await request.json();
    
    // Validate request body
    if (!body.type || !body.name) {
      const response: ApiResponse<null> = {
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing required fields: type and name are required',
        },
      };
      
      return NextResponse.json(response, { status: 400 });
    }
    
    // In a real implementation, this would create a new data item in a database
    
    // Generate a new ID for the data item
    const id = generateId();
    
    const response: ApiResponse<{ id: string; message: string }> = {
      success: true,
      data: {
        id,
        message: 'Data item created successfully',
      },
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating data item:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while creating the data item',
      },
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

