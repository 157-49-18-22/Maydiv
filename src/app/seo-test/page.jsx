'use client';

import SEOHead from '../../components/SEOHead';
import { useState, useEffect } from 'react';

export default function SEOTestPage() {
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test fetching SEO data
    const testSEO = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/seo?page=/seo-test');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setSeoData(result.seoData);
            console.log('✅ SEO data fetched successfully:', result.seoData);
          }
        }
      } catch (error) {
        console.error('❌ Error fetching SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    testSEO();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <SEOHead 
        pagePath="/seo-test"
        defaultTitle="SEO Test Page - Maydiv"
        defaultDescription="This is a test page to verify SEO functionality"
      />
      
      <h1>🔍 SEO Test Page</h1>
      <p>This page is used to test the SEO system functionality.</p>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px', 
        margin: '20px 0' 
      }}>
        <h3>📊 Current SEO Data:</h3>
        {loading ? (
          <p>⏳ Loading SEO data...</p>
        ) : seoData ? (
          <div>
            <p><strong>Title:</strong> {seoData.title}</p>
            <p><strong>Description:</strong> {seoData.description}</p>
            <p><strong>Keywords:</strong> {seoData.keywords}</p>
            <p><strong>No Index:</strong> {seoData.noIndex ? 'Yes' : 'No'}</p>
            <p><strong>Last Updated:</strong> {seoData.updatedAt}</p>
          </div>
        ) : (
          <p>⚠️ No SEO data found for this page</p>
        )}
      </div>
      
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px', 
        margin: '20px 0' 
      }}>
        <h3>✅ How to Test:</h3>
        <ol>
          <li>Go to <strong>/admin/seo</strong> in another tab</li>
          <li>Select "SEO Demo" page from the dropdown</li>
          <li>Change the title and description</li>
          <li>Click "Update" to save</li>
          <li>Come back to this page and refresh</li>
          <li>Check the browser tab title - it should change!</li>
          <li>Check browser console for SEO logs</li>
        </ol>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '15px', 
        borderRadius: '8px', 
        margin: '20px 0' 
      }}>
        <h3>🔍 Debug Information:</h3>
        <p><strong>Page Path:</strong> /seo-test</p>
        <p><strong>Current Title:</strong> <span id="current-title">{typeof document !== 'undefined' ? document.title : 'Loading...'}</span></p>
        <p><strong>Meta Description:</strong> <span id="current-description">Check browser console</span></p>
        <p><strong>localStorage SEO Data:</strong> <span id="localstorage-data">Check browser console</span></p>
      </div>
      
      <button 
        onClick={() => {
          console.log('🔍 Current document.title:', document.title);
          console.log('🔍 Current meta description:', document.querySelector('meta[name="description"]')?.content);
          console.log('🔍 localStorage SEO data:', localStorage.getItem('maydiv_seo_data'));
          alert('Check browser console for debug information!');
        }}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        🔍 Debug SEO Data
      </button>
    </div>
  );
}
