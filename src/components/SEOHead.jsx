'use client';

import { useEffect } from 'react';
import { useSEO } from '../lib/useSEO.js';

export default function SEOHead({ pagePath, defaultTitle = 'Maydiv - Web Development', defaultDescription = 'Professional web development services' }) {
  const { seoData, loading } = useSEO(pagePath);

  useEffect(() => {
    console.log('🔍 SEOHead: pagePath =', pagePath);
    console.log('🔍 SEOHead: seoData =', seoData);
    console.log('🔍 SEOHead: loading =', loading);
    
    if (seoData && !loading) {
      console.log('✅ Applying SEO data to page:', seoData);
      
      // Update page title
      const newTitle = seoData.title || defaultTitle;
      document.title = newTitle;
      console.log('✅ Title updated to:', newTitle);
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = seoData.description || defaultDescription;
      console.log('✅ Meta description updated to:', metaDescription.content);
      
      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = seoData.keywords || '';
      console.log('✅ Meta keywords updated to:', metaKeywords.content);
      
      // Update Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = seoData.title || defaultTitle;
      console.log('✅ OG title updated to:', ogTitle.content);
      
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = seoData.description || defaultDescription;
      console.log('✅ OG description updated to:', ogDescription.content);
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://maydiv.com${pagePath}`;
      console.log('✅ Canonical URL updated to:', canonical.href);
      
      // Add noindex if specified
      if (seoData.noIndex) {
        let robots = document.querySelector('meta[name="robots"]');
        if (!robots) {
          robots = document.createElement('meta');
          robots.name = 'robots';
          document.head.appendChild(robots);
        }
        robots.content = 'noindex, nofollow';
        console.log('✅ Robots meta set to noindex, nofollow');
      }
      
      console.log('🎉 All SEO data applied successfully to page!');
      
      // Force a small delay to ensure DOM updates are visible
      setTimeout(() => {
        console.log('🔍 Final page title:', document.title);
        console.log('🔍 Final meta description:', document.querySelector('meta[name="description"]')?.content);
      }, 100);
      
    } else if (loading) {
      console.log('⏳ Loading SEO data...');
    } else {
      console.log('⚠️ No SEO data available, using defaults');
      // Apply default values
      document.title = defaultTitle;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = defaultDescription;
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