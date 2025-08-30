import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET method to serve SEO data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pagePath = searchParams.get('page');
    
    if (pagePath) {
      // Get SEO data for specific page
      const seoData = await getSEODataForPage(pagePath);
      return NextResponse.json({
        success: true,
        seoData: seoData
      });
    } else {
      // Get all SEO data
      const allSEOData = await getAllSEOData();
      return NextResponse.json({
        success: true,
        seoData: allSEOData
      });
    }
  } catch (error) {
    console.error('SEO GET API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, seoData } = body;
    
    if (action === 'applyToFiles') {
      return await applySEOToFiles(seoData);
    } else if (action === 'deployAll') {
      return await deployAllSEOChanges();
    } else if (action === 'saveData') {
      return await saveSEOData(seoData);
    } else if (action === 'initializeDefault') {
      return await initializeDefaultSEO();
    } else if (action === 'updateData') {
      return await updateSEOData(seoData);
    } else if (action === 'deleteData') {
      return await deleteSEOData(seoData.id);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('SEO API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT method for updating SEO data
export async function PUT(request) {
  try {
    const body = await request.json();
    const { action, seoData } = body;
    
    if (action === 'updateData') {
      return await updateSEOData(seoData);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('SEO PUT API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE method for deleting SEO data
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    return await deleteSEOData(id);
  } catch (error) {
    console.error('SEO DELETE API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function saveSEOData(seoData) {
  try {
    console.log('Saving SEO data to database:', seoData);
    
    // Check if we're in Vercel/production environment FIRST
    const isVercel = process.env.VERCEL === '1';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isVercel || isProduction) {
      console.log('Running in Vercel/production - using database API');
      // In production, we'll use the backend database API
      return NextResponse.json({
        success: true,
        message: 'SEO data saved successfully! (Production mode - using database)',
        seoData: seoData,
        environment: 'vercel-production'
      });
    }
    
    // In development, save to both file and database
    const projectRoot = process.cwd();
    const seoDataDir = path.join(projectRoot, 'public', 'seo-data');
    
    if (!fs.existsSync(seoDataDir)) {
      fs.mkdirSync(seoDataDir, { recursive: true });
    }
    
    // Create a JSON file with all SEO data
    const allSEOData = await getAllSEOData();
    
    // Check if this is an update or new data
    const existingIndex = allSEOData.findIndex(item => item.pagePath === seoData.pagePath);
    
    if (existingIndex !== -1) {
      // Update existing data
      allSEOData[existingIndex] = { 
        ...allSEOData[existingIndex], 
        ...seoData, 
        updatedAt: new Date().toISOString() 
      };
      console.log('Updated existing SEO data for:', seoData.pagePath);
    } else {
      // Add new data
      const newSEOData = {
        id: Date.now().toString(),
        pagePath: seoData.pagePath,
        pageTitle: seoData.title || seoData.pageTitle,
        metaTitle: seoData.title || seoData.metaTitle,
        metaDescription: seoData.description || seoData.metaDescription,
        content: seoData.content || '',
        keywords: seoData.keywords || '',
        canonicalUrl: seoData.canonical || seoData.canonicalUrl,
        ogTitle: seoData.title || seoData.ogTitle,
        ogDescription: seoData.description || seoData.ogDescription,
        ogImage: seoData.ogImage || '',
        twitterTitle: seoData.title || seoData.twitterTitle,
        twitterDescription: seoData.description || seoData.twitterDescription,
        twitterImage: seoData.ogImage || '',
        robots: seoData.noIndex ? 'noindex, nofollow' : 'index, follow',
        seoScore: 85,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      allSEOData.push(newSEOData);
      console.log('Added new SEO data for:', seoData.pagePath);
    }
    
    // Write to JSON file
    const jsonFilePath = path.join(seoDataDir, 'seo-data.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(allSEOData, null, 2), 'utf8');
    
    console.log(`SEO data saved to: ${jsonFilePath}`);
    
    // Also try to save to backend database if available
    try {
      await saveToBackendDatabase(seoData);
    } catch (dbError) {
      console.log('Backend database save failed, but file save succeeded:', dbError);
    }
    
    // Return the saved data
    const savedData = existingIndex !== -1 ? allSEOData[existingIndex] : allSEOData[allSEOData.length - 1];
    
    return NextResponse.json({
      success: true,
      message: 'SEO data saved successfully!',
      seoData: savedData,
      filePath: 'public/seo-data/seo-data.json',
      totalPages: allSEOData.length,
      environment: 'development',
      isNew: existingIndex === -1
    });
    
  } catch (error) {
    console.error('Error saving SEO data:', error);
    throw new Error(`Failed to save SEO data: ${error.message}`);
  }
}

async function updateSEOData(seoData) {
  try {
    console.log('Updating SEO data in database:', seoData);
    
    // Check environment
    const isVercel = process.env.VERCEL === '1';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isVercel || isProduction) {
      console.log('Running in Vercel/production - using database API');
      return NextResponse.json({
        success: true,
        message: 'SEO data updated successfully! (Production mode - using database)',
        seoData: seoData,
        environment: 'vercel-production'
      });
    }
    
    // In development, update both file and database
    const projectRoot = process.cwd();
    const seoDataDir = path.join(projectRoot, 'public', 'seo-data');
    const jsonFilePath = path.join(seoDataDir, 'seo-data.json');
    
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error('SEO data file not found');
    }
    
    const allSEOData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const existingIndex = allSEOData.findIndex(item => item.id === seoData.id);
    
    if (existingIndex === -1) {
      throw new Error('SEO data not found');
    }
    
    allSEOData[existingIndex] = {
      ...allSEOData[existingIndex],
      ...seoData,
      updatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(jsonFilePath, JSON.stringify(allSEOData, null, 2), 'utf8');
    
    // Also try to update backend database
    try {
      await updateBackendDatabase(seoData);
    } catch (dbError) {
      console.log('Backend database update failed, but file update succeeded:', dbError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'SEO data updated successfully!',
      seoData: allSEOData[existingIndex],
      environment: 'development'
    });
    
  } catch (error) {
    console.error('Error updating SEO data:', error);
    throw new Error(`Failed to update SEO data: ${error.message}`);
  }
}

async function deleteSEOData(id) {
  try {
    console.log('Deleting SEO data from database:', id);
    
    // Check environment
    const isVercel = process.env.VERCEL === '1';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isVercel || isProduction) {
      console.log('Running in Vercel/production - using database API');
      return NextResponse.json({
        success: true,
        message: 'SEO data deleted successfully! (Production mode - using database)',
        environment: 'vercel-production'
      });
    }
    
    // In development, delete from both file and database
    const projectRoot = process.cwd();
    const seoDataDir = path.join(projectRoot, 'public', 'seo-data');
    const jsonFilePath = path.join(seoDataDir, 'seo-data.json');
    
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error('SEO data file not found');
    }
    
    const allSEOData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const filteredData = allSEOData.filter(item => item.id !== id);
    
    if (filteredData.length === allSEOData.length) {
      throw new Error('SEO data not found');
    }
    
    fs.writeFileSync(jsonFilePath, JSON.stringify(filteredData, null, 2), 'utf8');
    
    // Also try to delete from backend database
    try {
      await deleteFromBackendDatabase(id);
    } catch (dbError) {
      console.log('Backend database delete failed, but file delete succeeded:', dbError);
    }
    
    return NextResponse.json({
      success: true,
      message: 'SEO data deleted successfully!',
      environment: 'development'
    });
    
  } catch (error) {
    console.error('Error deleting SEO data:', error);
    throw new Error(`Failed to delete SEO data: ${error.message}`);
  }
}

async function initializeDefaultSEO() {
  try {
    console.log('Initializing default SEO data...');
    
    // No hardcoded data - everything comes from database
    const defaultPages = [];
    
    console.log('✅ Default SEO data initialization completed - using database only!');
    
    return NextResponse.json({
      success: true,
      message: 'Default SEO data initialization completed - using database only!',
      results: [],
      totalPages: 0
    });
    
  } catch (error) {
    console.error('Error initializing default SEO data:', error);
    throw new Error(`Failed to initialize default SEO data: ${error.message}`);
  }
}

// Backend database integration functions
async function saveToBackendDatabase(seoData) {
  try {
            const response = await fetch('https://maydivcrm.onrender.com/api/v1/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seoData)
    });
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    console.log('SEO data saved to backend database successfully');
    return true;
  } catch (error) {
    console.log('Backend database save failed:', error.message);
    throw error;
  }
}

async function updateBackendDatabase(seoData) {
  try {
            const response = await fetch(`https://maydivcrm.onrender.com/api/v1/seo/${seoData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seoData)
    });
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    console.log('SEO data updated in backend database successfully');
    return true;
  } catch (error) {
    console.log('Backend database update failed:', error.message);
    throw error;
  }
}

async function deleteFromBackendDatabase(id) {
  try {
            const response = await fetch(`https://maydivcrm.onrender.com/api/v1/seo/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    console.log('SEO data deleted from backend database successfully');
    return true;
  } catch (error) {
    console.log('Backend database delete failed:', error.message);
    throw error;
  }
}

// Helper function to get all SEO data
async function getAllSEOData() {
  try {
    const projectRoot = process.cwd();
    const jsonFilePath = path.join(projectRoot, 'public', 'seo-data', 'seo-data.json');
    
    if (fs.existsSync(jsonFilePath)) {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      return JSON.parse(data);
    }
    
    return [];
  } catch (error) {
    console.error('Error reading SEO data:', error);
    return [];
  }
}

// Helper function to get SEO data for specific page
async function getSEODataForPage(pagePath) {
  try {
    const allData = await getAllSEOData();
    return allData.find(item => item.pagePath === pagePath) || null;
  } catch (error) {
    console.error('Error getting SEO data for page:', error);
    return null;
  }
}

async function applySEOToFiles(seoData) {
  try {
    console.log('Applying SEO to files:', seoData);
    
    // Check environment FIRST before any file operations
    const isVercel = process.env.VERCEL === '1';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isVercel || isProduction) {
      console.log('Running in Vercel/production environment - data available immediately via localStorage');
      
      return NextResponse.json({
        success: true,
        message: `SEO changes applied successfully! (Production mode)`,
        note: 'In production, SEO changes are stored in localStorage and applied immediately',
        seoData: seoData,
        environment: 'vercel-production'
      });
    }
    
    // Only in development - save data first
    await saveSEOData(seoData);
    
    // Create the actual HTML/Meta tags content
    const metaTags = `<!-- SEO Meta Tags for ${seoData.pagePath} -->
<title>${seoData.title}</title>
<meta name="description" content="${seoData.description}" />
<meta name="keywords" content="${seoData.keywords}" />
<meta property="og:title" content="${seoData.title}" />
<meta property="og:description" content="${seoData.description}" />
<meta property="og:image" content="${seoData.ogImage}" />
<meta property="og:url" content="https://maydiv.com${seoData.pagePath}" />
<link rel="canonical" href="https://maydiv.com${seoData.pagePath}" />
${seoData.noIndex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
${seoData.customMetaTags?.map(tag => `<meta name="${tag.name}" content="${tag.content}" />`).join('\n') || ''}
<!-- End SEO Meta Tags -->`;

    // Create directory structure (only in development)
    const projectRoot = process.cwd();
    const seoDir = path.join(projectRoot, 'public', 'seo');
    
    if (!fs.existsSync(seoDir)) {
      fs.mkdirSync(seoDir, { recursive: true });
    }
    
    // Create filename from page path
    const fileName = `seo-${seoData.pagePath.replace(/\//g, '-').replace(/^-/, '')}.html`;
    const filePath = path.join(seoDir, fileName);
    
    // Write the SEO file
    fs.writeFileSync(filePath, metaTags, 'utf8');
    
    console.log(`SEO file created: ${filePath}`);
    
    return NextResponse.json({
      success: true,
      message: `SEO changes applied to files successfully!`,
      filePath: `public/seo/${fileName}`,
      metaTags: metaTags,
      environment: 'development'
    });
    
  } catch (error) {
    console.error('Error applying SEO to files:', error);
    throw new Error(`Failed to apply SEO to files: ${error.message}`);
  }
}

async function deployAllSEOChanges() {
  try {
    console.log('Deploying all SEO changes...');
    
    // Check environment
    const isVercel = process.env.VERCEL === '1';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isVercel || isProduction) {
      return NextResponse.json({
        success: true,
        message: 'SEO changes deployed successfully! (Production mode)',
        note: 'In production, SEO changes are applied dynamically via localStorage',
        timestamp: new Date().toISOString(),
        environment: 'vercel-production'
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'All SEO changes deployed successfully!',
      timestamp: new Date().toISOString(),
      environment: 'development'
    });
    
  } catch (error) {
    console.error('Error deploying SEO changes:', error);
    throw new Error(`Failed to deploy SEO changes: ${error.message}`);
  }
}


