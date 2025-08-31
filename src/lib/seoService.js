// SEO Service for managing SEO data with database integration
export class SEOService {
  static async createSEO(seoData) {
    try {
      console.log('Creating new SEO data:', seoData);
      
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveData',
          seoData: seoData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create SEO data');
      }

      console.log('SEO data created successfully in database:', result);
      return result.seoData;
      
    } catch (error) {
      console.error('Error creating SEO data:', error);
      throw new Error(`Failed to create SEO data: ${error.message}`);
    }
  }

  static async updateSEO(id, seoData) {
    try {
      console.log('Updating SEO data:', { id, seoData });
      
      const response = await fetch(`/api/seo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pagePath: seoData.pagePath,
          pageTitle: seoData.title || seoData.pageTitle,
          metaTitle: seoData.title || seoData.metaTitle,
          metaDescription: seoData.description || seoData.metaDescription,
          content: seoData.content || '',
          keywords: seoData.keywords || '',
          canonicalUrl: seoData.canonical || seoData.canonicalUrl || `https://maydiv.com${seoData.pagePath}`,
          ogTitle: seoData.title || seoData.ogTitle,
          ogDescription: seoData.description || seoData.ogDescription,
          ogImage: seoData.ogImage || 'https://maydiv.com/og-image.jpg',
          twitterTitle: seoData.title || seoData.twitterTitle,
          twitterDescription: seoData.description || seoData.twitterDescription,
          twitterImage: seoData.ogImage || 'https://maydiv.com/og-image.jpg',
          robots: seoData.noIndex ? 'noindex, nofollow' : 'index, follow',
          seoScore: 85
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update SEO data');
      }

      console.log('SEO data updated successfully in database:', result);
      return result.seoData;
      
    } catch (error) {
      console.error('Error updating SEO data:', error);
      throw new Error(`Failed to update SEO data: ${error.message}`);
    }
  }

  static async deleteSEO(id) {
    try {
      console.log('Deleting SEO data:', id);
      
      const response = await fetch(`/api/seo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete SEO data');
      }

      console.log('SEO data deleted successfully from database');
      return { success: true };
      
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      throw new Error(`Failed to delete SEO data: ${error.message}`);
    }
  }

  static async getAllSEO() {
    try {
      const response = await fetch('/api/seo');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch SEO data');
      }

      return result.seoData || [];
      
    } catch (error) {
      console.error('Error getting SEO data:', error);
      // Fallback to localStorage if database is not available
      try {
        const data = localStorage.getItem('seoData');
        return data ? JSON.parse(data) : [];
      } catch (fallbackError) {
        console.error('Fallback to localStorage also failed:', fallbackError);
        return [];
      }
    }
  }

  static async getSEOByPath(pagePath) {
    try {
      const response = await fetch(`/api/seo?page=${encodeURIComponent(pagePath)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch SEO data');
      }

      return result.seoData || null;
      
    } catch (error) {
      console.error('Error getting SEO data for path:', pagePath, error);
      // Fallback to localStorage if database is not available
      try {
        const allData = this.getAllSEO();
        return allData.find(item => item.pagePath === pagePath) || null;
      } catch (fallbackError) {
        console.error('Fallback to localStorage also failed:', fallbackError);
        return null;
      }
    }
  }

  static async getPagesForDashboard() {
    try {
      const allData = await this.getAllSEO();
      return allData.map(item => ({
        id: item.id,
        pagePath: item.pagePath,
        pageTitle: item.pageTitle || item.metaTitle || item.title,
        metaTitle: item.metaTitle || item.pageTitle || item.title,
        metaDescription: item.metaDescription || item.description,
        title: item.pageTitle || item.metaTitle || item.title,
        description: item.metaDescription || item.description,
        content: item.content || '',
        keywords: item.keywords || '',
        ogImage: item.ogImage || '',
        canonicalUrl: item.canonicalUrl || item.canonical || '',
        robots: item.robots || 'index, follow',
        noIndex: item.robots === 'noindex, nofollow',
        seoScore: item.seoScore || 0,
        isPublished: item.isPublished,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }));
    } catch (error) {
      console.error('Error getting pages for dashboard:', error);
      return [];
    }
  }

  static async initializeDefaultSEO() {
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'initializeDefault'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to initialize default SEO data');
      }

      console.log('Default SEO data initialized successfully:', result);
      return result;
      
    } catch (error) {
      console.error('Error initializing default SEO data:', error);
      throw new Error(`Failed to initialize default SEO data: ${error.message}`);
    }
  }

  static async applySEOToFiles(seoData) {
    try {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to apply SEO to files');
      }

      console.log('SEO applied to files successfully:', result);
      return result;
      
    } catch (error) {
      console.error('Error applying SEO to files:', error);
      throw new Error(`Failed to apply SEO to files: ${error.message}`);
    }
  }

  static async deployAllSEOChanges() {
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deployAll'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to deploy SEO changes');
      }

      console.log('All SEO changes deployed successfully:', result);
      return result;
      
    } catch (error) {
      console.error('Error deploying SEO changes:', error);
      throw new Error(`Failed to deploy SEO changes: ${error.message}`);
    }
  }

  // Test database connection
  static async testDatabaseConnection() {
    try {
      const response = await fetch('/api/seo');
      return response.ok;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
}
