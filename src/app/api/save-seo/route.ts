import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Storage file path
const STORAGE_FILE = path.join(process.cwd(), 'public', 'permanent-seo-data.json');

// Load data from permanent storage
function loadPermanentData(): Record<string, any> {
  try {
    // Ensure directory exists
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error loading permanent data:', error);
    return {};
  }
}

// Save data to permanent storage
function savePermanentData(data: Record<string, any>): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
    console.log('✅ SEO data saved to permanent storage:', STORAGE_FILE);
  } catch (error) {
    console.error('Error saving permanent data:', error);
  }
}

// POST: Save/Update SEO data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, data } = body;
    
    if (!page || !data) {
      return NextResponse.json(
        { error: 'Page path and data are required' },
        { status: 400 }
      );
    }
    
    console.log('💾 Saving SEO data for page:', page);
    
    // Load existing data
    const existingData = loadPermanentData();
    
    // Update or add new data
    existingData[page] = {
      ...data,
      pagePath: page,
      updatedAt: new Date().toISOString(),
      savedLive: true,
      liveTimestamp: Date.now()
    };
    
    // Save to permanent storage
    savePermanentData(existingData);
    
    console.log('✅ SEO data saved successfully for page:', page);
    
    return NextResponse.json({
      success: true,
      message: 'SEO data saved live to server',
      page: page,
      data: existingData[page]
    });
    
  } catch (error) {
    console.error('❌ Error saving SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to save SEO data' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all SEO data
export async function GET() {
  try {
    console.log('📥 Loading all SEO data from permanent storage');
    
    const data = loadPermanentData();
    
    console.log('✅ Loaded', Object.keys(data).length, 'pages of SEO data');
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Cache-Control'
      }
    });
    
  } catch (error) {
    console.error('❌ Error loading SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to load SEO data' },
      { status: 500 }
    );
  }
}

// DELETE: Remove SEO data for a specific page
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page path is required' },
        { status: 400 }
      );
    }
    
    console.log('🗑️ Deleting SEO data for page:', page);
    
    // Load existing data
    const existingData = loadPermanentData();
    
    // Remove the page data
    if (existingData[page]) {
      delete existingData[page];
      
      // Save updated data
      savePermanentData(existingData);
      
      console.log('✅ SEO data deleted successfully for page:', page);
      
      return NextResponse.json({
        success: true,
        message: 'SEO data deleted from server',
        deletedPage: page
      });
    } else {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('❌ Error deleting SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to delete SEO data' },
      { status: 500 }
    );
  }
}

// OPTIONS: Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cache-Control'
    }
  });
}
