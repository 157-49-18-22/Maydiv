import { NextResponse } from 'next/server';

// Simple authentication middleware
// In production, you should use proper authentication with Firebase Auth or similar
const USERS = [
  { username: 'admin', password: 'maydiv2024', role: 'admin' },
  { username: 'seoagent', password: 'Maydiv@2024!SEO', role: 'seo' }
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username: user.username, role: user.role },
        timestamp: new Date().toISOString()
      });
    }
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
    
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple health check endpoint
  return NextResponse.json({
    success: true,
    message: 'Admin API is running',
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS() {
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