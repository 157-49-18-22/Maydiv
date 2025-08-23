'use client';

import { useState } from 'react';
import SEOHead from '../../components/SEOHead';

export default function SEODemoPage() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <SEOHead 
        pagePath="/seo-demo"
        defaultTitle="SEO Demo - Maydiv"
        defaultDescription="This page demonstrates how SEO changes are dynamically applied to live website"
      />
      
      <h1>🚀 SEO Demo Page</h1>
      <p>This page shows how SEO changes work in real-time!</p>
      
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        padding: '20px', 
        borderRadius: '8px', 
        margin: '20px 0',
        border: '2px solid #007bff'
      }}>
        <h3>📱 How It Works:</h3>
        <ol>
          <li><strong>Go to Admin Panel:</strong> <code>/admin/seo</code></li>
          <li><strong>Edit this page's SEO:</strong> Change title, description, keywords</li>
          <li><strong>Click "🚀 DEPLOY ALL SEO CHANGES NOW!"</strong></li>
          <li><strong>Refresh this page:</strong> Changes appear immediately!</li>
        </ol>
      </div>

      <button 
        onClick={() => setShowInfo(!showInfo)}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {showInfo ? 'Hide' : 'Show'} Current SEO Data
      </button>

      {showInfo && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '20px', 
          borderRadius: '8px', 
          margin: '20px 0',
          border: '2px solid #ffc107'
        }}>
          <h3>🔍 Current SEO Data:</h3>
          <p><strong>Page Path:</strong> <code>/seo-demo</code></p>
          <p><strong>Title:</strong> Check browser tab title!</p>
          <p><strong>Description:</strong> Check page source meta description!</p>
          <p><strong>Keywords:</strong> Check page source meta keywords!</p>
          
          <div style={{ marginTop: '15px', fontSize: '14px' }}>
            <p><strong>💡 Tip:</strong> Open browser DevTools → Elements → Head section to see meta tags!</p>
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#d4edda', 
        padding: '20px', 
        borderRadius: '8px', 
        margin: '20px 0',
        border: '2px solid #28a745'
      }}>
        <h3>✅ What Happens:</h3>
        <ul>
          <li><strong>SEO changes</strong> save in localStorage</li>
          <li><strong>API route</strong> creates SEO files</li>
          <li><strong>SEOHead component</strong> loads data dynamically</li>
          <li><strong>Page updates</strong> in real-time</li>
          <li><strong>Search engines</strong> see new meta tags</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a 
          href="/admin/seo" 
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            display: 'inline-block'
          }}
        >
          🎯 Go to SEO Dashboard
        </a>
      </div>
    </div>
  );
}
