import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envVars = {
      VERCEL: process.env.VERCEL,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      isVercel: process.env.VERCEL === '1',
      isProduction: process.env.NODE_ENV === 'production',
      isVercelProduction: (process.env.VERCEL === '1') || (process.env.NODE_ENV === 'production')
    };
    
    console.log('Environment test endpoint called:', envVars);
    
    return NextResponse.json({
      success: true,
      message: 'Environment variables retrieved successfully',
      environment: envVars,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Environment test error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
