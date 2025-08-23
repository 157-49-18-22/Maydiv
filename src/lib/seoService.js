const LOCAL_STORAGE_KEY = 'maydiv_seo_data';

export class SEOService {
  // Get all SEO data
  static async getAllSEO() {
    try {
      console.log('Fetching all SEO data from localStorage...');
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const seoData = data ? JSON.parse(data) : [];
      console.log('Fetched SEO data:', seoData);
      return seoData;
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      return [];
    }
  }

  // Get SEO data by page path
  static async getSEOByPath(pagePath) {
    try {
      console.log('Fetching SEO data for path:', pagePath);
      const allData = await this.getAllSEO();
      const found = allData.find(item => item.pagePath === pagePath);
      if (found) {
        console.log('Found SEO data:', found);
        return found;
      }
      console.log('No SEO data found for path:', pagePath);
      return null;
    } catch (error) {
      console.error('Error fetching SEO by path:', error);
      return null;
    }
  }

  // Create new SEO data
  static async createSEO(seoData) {
    try {
      console.log('Creating SEO data:', seoData);
      
      // Validate required fields
      if (!seoData.pagePath || !seoData.title || !seoData.description) {
        throw new Error('Page path, title, and description are required');
      }

      // Clean and prepare data
      const normalizeTags = (tags) => {
        if (Array.isArray(tags)) {
          return tags.map(tag => (typeof tag === 'string' ? tag.trim() : '')).filter(Boolean);
        }
        if (typeof tags === 'string') {
          return tags
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);
        }
        return [];
      };

      const cleanData = {
        id: Date.now().toString(),
        pagePath: seoData.pagePath.trim(),
        title: seoData.title.trim(),
        description: seoData.description.trim(),
        content: seoData.content ? seoData.content.trim() : '',
        keywords: seoData.keywords ? seoData.keywords.trim() : '',
        ogImage: seoData.ogImage ? seoData.ogImage.trim() : '',
        canonical: seoData.canonical ? seoData.canonical.trim() : '',
        noIndex: Boolean(seoData.noIndex),
        customMetaTags: Array.isArray(seoData.customMetaTags) ? seoData.customMetaTags : [],
        h1Tag: typeof seoData.h1Tag === 'string' ? seoData.h1Tag.trim() : '',
        h2Tags: normalizeTags(seoData.h2Tags),
        h3Tags: normalizeTags(seoData.h3Tags),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Clean data to save:', cleanData);

      const allData = await this.getAllSEO();
      allData.push(cleanData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allData));
      
      console.log('SEO data created successfully:', cleanData);
      return cleanData;
    } catch (error) {
      console.error('Error creating SEO data:', error);
      throw error;
    }
  }

  // Update SEO data
  static async updateSEO(id, seoData) {
    try {
      console.log('Updating SEO data for ID:', id, 'with data:', seoData);
      
      const allData = await this.getAllSEO();
      const index = allData.findIndex(item => item.id === id);
      
      if (index !== -1) {
        const normalizeTags = (tags) => {
          if (Array.isArray(tags)) {
            return tags.map(tag => (typeof tag === 'string' ? tag.trim() : '')).filter(Boolean);
          }
          if (typeof tags === 'string') {
            return tags
              .split(',')
              .map(tag => tag.trim())
              .filter(Boolean);
          }
          return undefined;
        };

        const normalized = { ...seoData };
        if (seoData.h1Tag !== undefined) {
          normalized.h1Tag = typeof seoData.h1Tag === 'string' ? seoData.h1Tag.trim() : '';
        }
        if (seoData.h2Tags !== undefined) {
          normalized.h2Tags = normalizeTags(seoData.h2Tags) ?? allData[index].h2Tags ?? [];
        }
        if (seoData.h3Tags !== undefined) {
          normalized.h3Tags = normalizeTags(seoData.h3Tags) ?? allData[index].h3Tags ?? [];
        }

        allData[index] = {
          ...allData[index],
          ...normalized,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allData));
        const result = allData[index];
        console.log('SEO data updated successfully:', result);
        return result;
      }
      
      throw new Error('SEO data not found');
    } catch (error) {
      console.error('Error updating SEO data:', error);
      throw error;
    }
  }

  // Delete SEO data
  static async deleteSEO(id) {
    try {
      console.log('Deleting SEO data with ID:', id);
      const allData = await this.getAllSEO();
      const filteredData = allData.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredData));
      console.log('SEO data deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      throw error;
    }
  }

  // Get SEO data by ID
  static async getSEOById(id) {
    try {
      console.log('Fetching SEO data by ID:', id);
      const allData = await this.getAllSEO();
      const found = allData.find(item => item.id === id);
      if (found) {
        console.log('Found SEO data by ID:', found);
        return found;
      }
      console.log('No SEO data found for ID:', id);
      return null;
    } catch (error) {
      console.error('Error fetching SEO by ID:', error);
      return null;
    }
  }

  // Get all pages for dashboard
  static async getPagesForDashboard() {
    try {
      console.log('Fetching pages for dashboard...');
      const allData = await this.getAllSEO();
      const sortedData = allData.sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      console.log('Dashboard pages:', sortedData);
      return sortedData;
    } catch (error) {
      console.error('Error fetching pages for dashboard:', error);
      return [];
    }
  }

  // Test connection (localStorage)
  static async testConnection() {
    try {
      console.log('Testing localStorage connection...');
      const testKey = 'test_key';
      localStorage.setItem(testKey, 'test_value');
      localStorage.removeItem(testKey);
      console.log('localStorage connection test successful');
      return true;
    } catch (error) {
      console.error('localStorage connection test failed:', error);
      return false;
    }
  }

  // Apply SEO changes to actual website files
  static async applySEOToFiles(seoData) {
    try {
      console.log('Applying SEO changes to website files:', seoData);
      
      // Create the actual HTML/Meta tags content
      const metaTags = `
<!-- SEO Meta Tags for ${seoData.pagePath} -->
<title>${seoData.title}</title>
<meta name="description" content="${seoData.description}" />
<meta name="keywords" content="${seoData.keywords}" />
<meta property="og:title" content="${seoData.title}" />
<meta property="og:description" content="${seoData.description}" />
<meta property="og:image" content="${seoData.ogImage}" />
<meta property="og:url" content="https://maydiv.com${seoData.pagePath}" />
<link rel="canonical" href="https://maydiv.com${seoData.pagePath}" />
${seoData.noIndex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
${seoData.customMetaTags.map(tag => `<meta name="${tag.name}" content="${tag.content}" />`).join('\n')}
<!-- End SEO Meta Tags -->
`;

      // Save to a file that can be included in pages
      const fileName = `seo-${seoData.pagePath.replace(/\//g, '-').replace(/^-/, '')}.html`;
      const filePath = `public/seo/${fileName}`;
      
      // Create directory if it doesn't exist
      const fs = require('fs');
      const path = require('path');
      
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write the SEO file
      fs.writeFileSync(filePath, metaTags, 'utf8');
      
      console.log(`SEO file created: ${filePath}`);
      
      // Also update the main SEO data file
      const seoDataFile = 'public/seo/seo-data.json';
      const allSEOData = await this.getAllSEO();
      fs.writeFileSync(seoDataFile, JSON.stringify(allSEOData, null, 2), 'utf8');
      
      console.log('SEO data file updated:', seoDataFile);
      
      return {
        success: true,
        message: `SEO changes applied to files successfully!`,
        filePath: filePath,
        seoDataFile: seoDataFile
      };
      
    } catch (error) {
      console.error('Error applying SEO to files:', error);
      throw new Error(`Failed to apply SEO to files: ${error.message}`);
    }
  }
}
