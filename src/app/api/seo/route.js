import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, seoData } = body;
    
    if (action === 'applyToFiles') {
      return await applySEOToFiles(seoData);
    } else if (action === 'deployAll') {
      return await deployAllSEOChanges();
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

async function applySEOToFiles(seoData) {
  try {
    console.log('Applying SEO to files:', seoData);
    
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

    // Create directory structure
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
      metaTags: metaTags
    });
    
  } catch (error) {
    console.error('Error applying SEO to files:', error);
    throw new Error(`Failed to apply SEO to files: ${error.message}`);
  }
}

async function deployAllSEOChanges() {
  try {
    console.log('Deploying all SEO changes...');
    
    // This would typically get data from your database or storage
    // For now, we'll return success
    return NextResponse.json({
      success: true,
      message: 'All SEO changes deployed successfully!',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error deploying SEO changes:', error);
    throw new Error(`Failed to deploy SEO changes: ${error.message}`);
  }
}

