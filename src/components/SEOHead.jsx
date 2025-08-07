'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SEOService } from '../lib/seoService.js';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  canonical,
  noIndex = false,
  children 
}) => {
  const pathname = usePathname();
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSEOData = async () => {
      try {
        setLoading(true);
        const data = await SEOService.getSEOByPath(pathname);
        setSeoData(data);
      } catch (error) {
        console.error('Error loading SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSEOData();
  }, [pathname]);

  // Use provided props as fallback if no SEO data from Firebase
  const finalTitle = seoData?.title || title || 'Maydiv - Digital Solutions';
  const finalDescription = seoData?.description || description || 'Leading digital solutions provider offering web development, app development, AI solutions, and more.';
  const finalKeywords = seoData?.keywords || keywords || 'web development, app development, AI, digital solutions, technology';
  const finalOgImage = seoData?.ogImage || ogImage || '/logo.png';
  const finalCanonical = seoData?.canonical || canonical || `https://maydiv.com${pathname}`;
  const finalNoIndex = seoData?.noIndex || noIndex;

  // Debug logging
  console.log('SEOHead rendering with title:', finalTitle, 'for path:', pathname);

  if (loading) {
    return null; // Don't render anything while loading
  }

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content={finalNoIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content="Maydiv" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content="Maydiv" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@maydiv" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="Maydiv" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Maydiv",
            "url": "https://maydiv.com",
            "logo": "https://maydiv.com/logo.png",
            "description": finalDescription,
            "sameAs": [
              "https://www.linkedin.com/company/maydiv",
              "https://twitter.com/maydiv"
            ]
          })
        }}
      />
      
      {/* Custom Meta Tags from Firebase */}
      {seoData?.customMetaTags && seoData.customMetaTags.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}
      
      {children}
    </>
  );
};

export default SEOHead; 