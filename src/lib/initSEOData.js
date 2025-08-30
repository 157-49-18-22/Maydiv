import { SEOService } from './seoService.js';

// Empty default SEO data - all data will come from database
const defaultSEOData = [];

export const initializeSEOData = async () => {
  try {
    console.log('Initializing SEO data...');
    
    // No hardcoded data - everything comes from database
    console.log('✅ SEO data initialization completed - using database only!');
  } catch (error) {
    console.error('❌ Error initializing SEO data:', error);
  }
};

// Function to run initialization (can be called from admin panel)
export const runSEOInitialization = () => {
  if (typeof window !== 'undefined') {
    initializeSEOData();
  }
};

