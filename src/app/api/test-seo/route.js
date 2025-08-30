import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing SEO API functionality...');
    
    // Test data
    const testData = {
      pagePath: '/test-seo',
      pageTitle: 'Test SEO Page',
      metaTitle: 'Test SEO Page',
      metaDescription: 'This is a test page for SEO functionality',
      content: 'Test content for SEO page',
      keywords: 'test, seo, functionality',
      canonicalUrl: 'https://maydiv.com/test-seo',
      ogTitle: 'Test SEO Page',
      ogDescription: 'This is a test page for SEO functionality',
      ogImage: 'https://maydiv.com/og-image.jpg',
      twitterTitle: 'Test SEO Page',
      twitterDescription: 'This is a test page for SEO functionality',
      twitterImage: 'https://maydiv.com/og-image.jpg',
      robots: 'index, follow',
      seoScore: 85,
      isPublished: 1
    };
    
    return NextResponse.json({
      success: true,
      message: 'SEO API test endpoint working',
      testData: testData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('SEO API test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'SEO API test failed',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log('Testing SEO API POST functionality...');
    
    const body = await request.json();
    console.log('Received POST data:', body);
    
    // Test different data formats
    const testResults = {
      action: body.action || 'none',
      hasSeoData: !!body.seoData,
      hasDirectData: !!(body.pagePath || body.page),
      dataStructure: Object.keys(body),
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: 'SEO API POST test successful',
      testResults: testResults,
      receivedData: body
    });
  } catch (error) {
    console.error('SEO API POST test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'SEO API POST test failed',
      error: error.message
    }, { status: 500 });
  }
}
