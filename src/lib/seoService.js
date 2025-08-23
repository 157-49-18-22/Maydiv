const LOCAL_STORAGE_KEY = 'maydiv_seo_data';

export class SEOService {
  // Get all SEO data
  static async getAllSEO() {
    try {
      console.log('Fetching all SEO data from API...');
      
      // Try to get from API first
      try {
        const response = await fetch('/api/seo');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.seoData) {
            console.log('Fetched SEO data from API:', result.seoData);
            // Also save to localStorage as backup
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result.seoData));
            return result.seoData;
          }
        }
      } catch (apiError) {
        console.log('API fetch failed, falling back to localStorage:', apiError);
      }
      
      // Fallback to localStorage
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      const seoData = data ? JSON.parse(data) : [];
      console.log('Fetched SEO data from localStorage:', seoData);
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
      
      // Try to get from API first
      try {
        const response = await fetch(`/api/seo?page=${encodeURIComponent(pagePath)}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.seoData) {
            console.log('Found SEO data from API:', result.seoData);
            return result.seoData;
          }
        }
      } catch (apiError) {
        console.log('API fetch failed, falling back to localStorage:', apiError);
      }
      
      // Fallback to localStorage
      const allData = await this.getAllSEO();
      const found = allData.find(item => item.pagePath === pagePath);
      if (found) {
        console.log('Found SEO data from localStorage:', found);
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

      // Try to save via API first
      try {
        const response = await fetch('/api/seo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'saveData',
            seoData: cleanData
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('SEO data saved via API:', result);
          }
        }
      } catch (apiError) {
        console.log('API save failed, using localStorage:', apiError);
      }

      // Also save to localStorage as backup
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

        const updatedData = {
          ...allData[index],
          ...normalized,
          updatedAt: new Date().toISOString()
        };

        // Try to save via API first
        try {
          const response = await fetch('/api/seo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'saveData',
              seoData: updatedData
            })
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              console.log('SEO data updated via API:', result);
            }
          }
        } catch (apiError) {
          console.log('API update failed, using localStorage:', apiError);
        }

        // Also update localStorage
        allData[index] = updatedData;
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
      
      // Try to save via API first
      try {
        // For deletion, we'll save the filtered data
        const response = await fetch('/api/seo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'saveData',
            seoData: filteredData[0] || { pagePath: '/', title: 'Default', description: 'Default description' }
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('SEO data deletion saved via API:', result);
          }
        }
      } catch (apiError) {
        console.log('API deletion save failed, using localStorage:', apiError);
      }

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
      
      // Use API route instead of direct file system access (client-side safe)
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'applyToFiles',
          seoData: seoData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('SEO changes applied via API:', result);
        return {
          success: true,
          message: `SEO changes applied to files successfully!`,
          filePath: result.filePath,
          environment: result.environment || 'development'
        };
      } else {
        throw new Error(result.error || 'Failed to apply SEO changes');
      }
      
    } catch (error) {
      console.error('Error applying SEO to files:', error);
      throw new Error(`Failed to apply SEO to files: ${error.message}`);
    }
  }
}
