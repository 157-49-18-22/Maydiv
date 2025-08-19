import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force static export for this API route
export const dynamic = 'force-static';
export const revalidate = false;

// Function to analyze code files
function analyzeCodeFiles(dirPath, includeImages = false) {
  const stats = {
    totalFiles: 0,
    totalLines: 0,
    totalSize: 0,
    byExtension: {},
    byDirectory: {},
    largestFiles: [],
    mostComplexFiles: []
  };
  
  function analyzeDirectory(dirPath, relativePath = '') {
    try {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const fileRelativePath = path.join(relativePath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (file !== 'node_modules' && file !== '.next' && !file.startsWith('.')) {
            analyzeDirectory(fullPath, fileRelativePath);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.md', '.txt'];
          const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
          // Note: isPublicFolder is used for future reference if needed
          // const isPublicFolder = relativePath.startsWith('public');
          
          if (codeExtensions.includes(ext) || (includeImages && imageExtensions.includes(ext))) {
            try {
              let content = null;
              let lines = 0;
              const size = stat.size;
              
              // Only read text files
              if (codeExtensions.includes(ext)) {
                content = fs.readFileSync(fullPath, 'utf8');
                lines = content.split('\n').length;
              }
              
              // Update stats
              stats.totalFiles++;
              stats.totalLines += lines;
              stats.totalSize += size;
              
              // Extension stats
              if (!stats.byExtension[ext]) {
                stats.byExtension[ext] = { count: 0, lines: 0, size: 0 };
              }
              stats.byExtension[ext].count++;
              stats.byExtension[ext].lines += lines;
              stats.byExtension[ext].size += size;
              
              // Directory stats
              const dir = path.dirname(fileRelativePath) || 'root';
              if (!stats.byDirectory[dir]) {
                stats.byDirectory[dir] = { count: 0, lines: 0, size: 0 };
              }
              stats.byDirectory[dir].count++;
              stats.byDirectory[dir].lines += lines;
              stats.byDirectory[dir].size += size;
              
              // Track largest files
              stats.largestFiles.push({
                path: fileRelativePath,
                size: size,
                lines: lines
              });
              
              // Track most complex files (by lines)
              if (lines > 0) {
                stats.mostComplexFiles.push({
                  path: fileRelativePath,
                  lines: lines,
                  size: size
                });
              }
              
            } catch (error) {
              console.error(`Error reading file ${fullPath}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error analyzing directory ${dirPath}:`, error);
    }
  }
  
  analyzeDirectory(dirPath);
  
  // Sort largest and most complex files
  stats.largestFiles.sort((a, b) => b.size - a.size).slice(0, 10);
  stats.mostComplexFiles.sort((a, b) => b.lines - a.lines).slice(0, 10);
  
  // Convert sizes to KB
  stats.totalSizeKB = (stats.totalSize / 1024).toFixed(2);
  
  return stats;
}

// Function to get package.json info
function getPackageInfo() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageData = JSON.parse(packageContent);
      
      return {
        name: packageData.name,
        version: packageData.version,
        description: packageData.description,
        dependencies: Object.keys(packageData.dependencies || {}).length,
        devDependencies: Object.keys(packageData.devDependencies || {}).length,
        scripts: Object.keys(packageData.scripts || {}).length
      };
    }
  } catch (error) {
    console.error('Error reading package.json:', error);
  }
  
  return null;
}

// Function to get git info
function getGitInfo() {
  try {
    const gitPath = path.join(process.cwd(), '.git');
    if (fs.existsSync(gitPath)) {
      const headPath = path.join(gitPath, 'HEAD');
      if (fs.existsSync(headPath)) {
        const headContent = fs.readFileSync(headPath, 'utf8').trim();
        return {
          hasGit: true,
          head: headContent
        };
      }
    }
  } catch (error) {
    console.error('Error reading git info:', error);
  }
  
  return { hasGit: false };
}

export async function GET() {
  try {
    const projectRoot = process.cwd();
    
    // Analyze different directories
    const appStats = analyzeCodeFiles(path.join(projectRoot, 'src', 'app'));
    const componentsStats = analyzeCodeFiles(path.join(projectRoot, 'src', 'components'));
    const publicStats = analyzeCodeFiles(path.join(projectRoot, 'public'), true); // Include images
    const overallStats = analyzeCodeFiles(path.join(projectRoot, 'src'));
    
    // Get package info
    const packageInfo = getPackageInfo();
    
    // Get git info
    const gitInfo = getGitInfo();
    
    // Calculate summary
    const summary = {
      totalFiles: appStats.totalFiles + componentsStats.totalFiles + publicStats.totalFiles,
      totalLines: appStats.totalLines + componentsStats.totalLines + publicStats.totalLines,
      totalSize: ((appStats.totalSize + componentsStats.totalSize + publicStats.totalSize) / 1024).toFixed(2) + ' KB',
      appFiles: appStats.totalFiles,
      componentFiles: componentsStats.totalFiles,
      publicFiles: publicStats.totalFiles,
      appLines: appStats.totalLines,
      componentLines: componentsStats.totalLines,
      publicLines: publicStats.totalLines
    };
    
    return NextResponse.json({
      success: true,
      data: {
        summary,
        app: appStats,
        components: componentsStats,
        public: publicStats,
        overall: overallStats,
        package: packageInfo,
        git: gitInfo,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error in stats API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 