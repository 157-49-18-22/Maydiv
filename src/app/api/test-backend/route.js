import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing backend connection...');
    
    const response = await fetch('https://maydiv-backend.onrender.com/api/v1/seo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('Backend response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        success: true,
        message: 'Backend is reachable',
        status: response.status,
        data: data
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        message: 'Backend responded with error',
        status: response.status,
        error: errorText
      });
    }
  } catch (error) {
    console.error('Backend test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Backend connection failed',
      error: error.message
    }, { status: 500 });
  }
}
