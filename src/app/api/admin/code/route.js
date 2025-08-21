import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force static export for this API route
export const dynamic = 'force-static';
export const revalidate = false;

// Function to recursively read all files in a directory
function readDirectoryRecursively(dirPath, basePath = '') {
  const items = [];
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const relativePath = path.join(basePath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (file !== 'node_modules' && file !== '.next' && !file.startsWith('.')) {
          items.push({
            type: 'directory',
            name: file,
            path: relativePath,
            children: readDirectoryRecursively(fullPath, relativePath)
          });
        }
      } else {
        // Include code files and public folder files
        const ext = path.extname(file).toLowerCase();
        const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md', '.txt'];
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
        const isPublicFolder = basePath.startsWith('public');
        
        if (codeExtensions.includes(ext) || (isPublicFolder && (codeExtensions.includes(ext) || imageExtensions.includes(ext)))) {
          try {
            let content = null;
            // Only read text files, not binary files
            if (codeExtensions.includes(ext)) {
              content = fs.readFileSync(fullPath, 'utf8');
            }
            items.push({
              type: 'file',
              name: file,
              path: relativePath,
              extension: ext,
              content: content,
              size: stat.size,
              lastModified: stat.mtime,
              isImage: imageExtensions.includes(ext)
            });
          } catch (error) {
            items.push({
              type: 'file',
              name: file,
              path: relativePath,
              extension: ext,
              content: `Error reading file: ${error.message}`,
              size: stat.size,
              lastModified: stat.mtime,
              isImage: imageExtensions.includes(ext)
            });
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  
  return items;
}

// Function to get file statistics
function getFileStats(dirPath) {
  let totalFiles = 0;
  let totalLines = 0;
  let totalSize = 0;
  
  function countStats(items) {
    for (const item of items) {
      if (item.type === 'file') {
        totalFiles++;
        totalSize += item.size;
        if (item.content) {
          totalLines += item.content.split('\n').length;
        }
      } else if (item.type === 'directory' && item.children) {
        countStats(item.children);
      }
    }
  }
  
  const items = readDirectoryRecursively(dirPath);
  countStats(items);
  
  return {
    items,
    stats: {
      totalFiles,
      totalLines,
      totalSize: (totalSize / 1024).toFixed(2) + ' KB'
    }
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'app', 'components', 'public', or 'all'
    
    const projectRoot = process.cwd();
    let result = {};
    
    if (type === 'all' || type === 'app') {
      const appPath = path.join(projectRoot, 'src', 'app');
      result.app = getFileStats(appPath);
    }
    
    if (type === 'all' || type === 'components') {
      const componentsPath = path.join(projectRoot, 'src', 'components');
      result.components = getFileStats(componentsPath);
    }
    
    if (type === 'all' || type === 'public') {
      const publicPath = path.join(projectRoot, 'public');
      result.public = getFileStats(publicPath);
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in code API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { filePath, content } = body;
    
    if (!filePath || !content) {
      return NextResponse.json(
        { success: false, error: 'File path and content are required' },
        { status: 400 }
      );
    }
    
    const projectRoot = process.cwd();
    
    // COMPLETELY REMOVE ALL RESTRICTIONS - Allow any file to be edited
    console.log(`🚀 Attempting to save file: ${filePath}`);
    
    // Create a working path for any file
    let workingPath = filePath;
    
    // If file doesn't have src/ prefix, add it
    if (!workingPath.includes('src/')) {
      if (workingPath.endsWith('.jsx') || workingPath.endsWith('.js')) {
        workingPath = `src/components/${workingPath}`;
      } else if (workingPath.endsWith('.css')) {
        workingPath = `src/styles/${workingPath}`;
      } else if (workingPath.endsWith('.json')) {
        workingPath = `src/data/${workingPath}`;
      } else {
        workingPath = `src/app/${workingPath}`;
      }
    }
    
    const fullPath = path.join(projectRoot, workingPath);
    console.log(`📁 Full path: ${fullPath}`);
    
    // Create directory structure
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      console.log(`📂 Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file content
    console.log(`💾 Writing file content...`);
    fs.writeFileSync(fullPath, content, 'utf8');
    
    console.log(`✅ SUCCESS: File saved at ${workingPath}`);
    
    return NextResponse.json({
      success: true,
      message: 'File saved successfully - ALL RESTRICTIONS BYPASSED!',
      filePath: workingPath,
      originalPath: filePath,
      bypassed: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error(`❌ ERROR: ${error.message}`);
    return NextResponse.json(
      { 
        success: false, 
        error: `File save failed: ${error.message}`,
        bypassed: false
      },
      { status: 500 }
    );
  }
} 