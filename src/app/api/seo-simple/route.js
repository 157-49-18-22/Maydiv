import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      seoData: [],
      message: 'Simple SEO API is working!'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('=== SIMPLE SEO POST START ===');
    const body = await request.json();
    console.log('Received data:', body);
    
    // Simple response for now
    return NextResponse.json({
      success: true,
      message: 'SEO data received successfully!',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Simple SEO API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
