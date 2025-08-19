import { NextResponse } from 'next/server';

// Force static export for this API route
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Admin API routes are working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'POST request received',
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 });
  }
} 