import { NextResponse } from 'next/server';
import { SEOService } from '../../../lib/seoService.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get('path');
    
    if (pagePath) {
      // Get SEO data for specific page
      const seoData = await SEOService.getSEOByPath(pagePath);
      return NextResponse.json({
        success: true,
        data: seoData
      });
    } else {
      // Get all SEO data
      const allSEO = await SEOService.getAllSEO();
      return NextResponse.json({
        success: true,
        data: allSEO
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const seoData = await SEOService.createSEO(body);
    
    return NextResponse.json({
      success: true,
      data: seoData
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...seoData } = body;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID is required for update'
      }, { status: 400 });
    }
    
    const updatedData = await SEOService.updateSEO(id, seoData);
    
    return NextResponse.json({
      success: true,
      data: updatedData
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID is required for deletion'
      }, { status: 400 });
    }
    
    await SEOService.deleteSEO(id);
    
    return NextResponse.json({
      success: true,
      message: 'SEO data deleted successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

