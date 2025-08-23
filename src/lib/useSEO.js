import { useState, useEffect } from 'react';
import { SEOService } from './seoService.js';

export function useSEO(pagePath) {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSEO = async () => {
      try {
        setLoading(true);
        const data = await SEOService.getSEOByPath(pagePath);
        setSeoData(data);
      } catch (error) {
        console.error('Error loading SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pagePath) {
      loadSEO();
    }
  }, [pagePath]);

  return { seoData, loading };
}

// Helper function to get SEO data for any page
export async function getSEOForPage(pagePath) {
  try {
    return await SEOService.getSEOByPath(pagePath);
  } catch (error) {
    console.error('Error getting SEO for page:', error);
    return null;
  }
}
