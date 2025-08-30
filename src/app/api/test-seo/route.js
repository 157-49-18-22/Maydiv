import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('=== TEST SEO ENDPOINT ===');
    const body = await request.json();
    console.log('Received body:', body);
    
    // Simple test - just return success
    return NextResponse.json({
      success: true,
      message: 'Test SEO endpoint working!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test SEO error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('=== TEST SEO GET ===');
    return NextResponse.json({
      success: true,
      message: 'Test SEO GET endpoint working!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test SEO GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
