import { NextResponse } from 'next/server';

// Simple authentication middleware
// In production, you should use proper authentication with Firebase Auth or similar
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'maydiv2024' // Change this to a secure password
};

export async function POST(request) {
  try {
    // Add CORS headers
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username, role: 'admin' },
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // Simple health check endpoint
  return NextResponse.json({
    success: true,
    message: 'Admin API is running',
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS(request) {
  // Handle CORS preflight requests
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 