'use client';

import { useEffect } from 'react';
import { useSEO } from '../lib/useSEO.js';

export default function SEOHead({ pagePath, defaultTitle = 'Maydiv - Web Development', defaultDescription = 'Professional web development services' }) {
  const { seoData, loading } = useSEO(pagePath);

  useEffect(() => {
    if (seoData && !loading) {
      // Update page title
      document.title = seoData.title || defaultTitle;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = seoData.description || defaultDescription;
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = seoData.keywords || '';
      
      // Update Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = seoData.title || defaultTitle;
      
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = seoData.description || defaultDescription;
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://maydiv.com${pagePath}`;
      
      console.log('✅ SEO data applied to page:', seoData);
    }
  }, [seoData, loading, pagePath, defaultTitle, defaultDescription]);

  // Show loading indicator (optional)
  if (loading) {
    return (
      <div style={{ display: 'none' }}>
        Loading SEO data...
      </div>
    );
  }

  // This component doesn't render anything visible
  return null;
} 