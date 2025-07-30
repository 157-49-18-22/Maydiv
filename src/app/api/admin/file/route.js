import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'File path is required' },
        { status: 400 }
      );
    }
    
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, filePath);
    
    // Security check: ensure the file is within the src directory
    if (!fullPath.includes(path.join(projectRoot, 'src'))) {
      return NextResponse.json(
        { success: false, error: 'Access denied: File must be within src directory' },
        { status: 403 }
      );
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Check if it's a file (not directory)
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) {
      return NextResponse.json(
        { success: false, error: 'Path is not a file' },
        { status: 400 }
      );
    }
    
    // Read file content
    const content = fs.readFileSync(fullPath, 'utf8');
    const ext = path.extname(filePath).toLowerCase();
    
    return NextResponse.json({
      success: true,
      data: {
        path: filePath,
        name: path.basename(filePath),
        extension: ext,
        content: content,
        size: stat.size,
        lastModified: stat.mtime,
        lines: content.split('\n').length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { filePath, content } = body;
    
    if (!filePath || content === undefined) {
      return NextResponse.json(
        { success: false, error: 'File path and content are required' },
        { status: 400 }
      );
    }
    
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, filePath);
    
    // Security check: ensure the file is within the src directory
    if (!fullPath.includes(path.join(projectRoot, 'src'))) {
      return NextResponse.json(
        { success: false, error: 'Access denied: File must be within src directory' },
        { status: 403 }
      );
    }
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the file
    fs.writeFileSync(fullPath, content, 'utf8');
    
    // Get updated file stats
    const stat = fs.statSync(fullPath);
    
    return NextResponse.json({
      success: true,
      message: 'File updated successfully',
      data: {
        path: filePath,
        name: path.basename(filePath),
        size: stat.size,
        lastModified: stat.mtime,
        lines: content.split('\n').length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'File path is required' },
        { status: 400 }
      );
    }
    
    const projectRoot = process.cwd();
    const fullPath = path.join(projectRoot, filePath);
    
    // Security check: ensure the file is within the src directory
    if (!fullPath.includes(path.join(projectRoot, 'src'))) {
      return NextResponse.json(
        { success: false, error: 'Access denied: File must be within src directory' },
        { status: 403 }
      );
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Delete the file
    fs.unlinkSync(fullPath);
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
      filePath,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 