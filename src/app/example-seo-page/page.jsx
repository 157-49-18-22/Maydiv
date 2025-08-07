'use client';
import SEOHead from '../../components/SEOHead';

export default function ExampleSEOPage() {
  return (
    <>
      <SEOHead 
        title="Example SEO Page - Maydiv"
        description="This page demonstrates how to use SEO components in any page/component with automatic meta tags, Open Graph, and Twitter Card support."
        keywords="SEO example, meta tags, Open Graph, Twitter Cards, structured data"
        ogImage="/logo.png"
        canonical="https://maydiv.com/example-seo-page"
      />
      
      <div className="example-page">
        <h1>🎯 Example SEO Page</h1>
        <p>This page demonstrates how to use SEO components in any page/component.</p>
        
        <div className="seo-info">
          <h2>📊 SEO Features:</h2>
          <ul>
            <li>✅ Automatic SEO meta tags</li>
            <li>✅ Open Graph tags</li>
            <li>✅ Twitter Card tags</li>
            <li>✅ Structured data (JSON-LD)</li>
            <li>✅ In-page SEO management</li>
            <li>✅ Real-time SEO editing</li>
          </ul>
        </div>

        <div className="usage-examples">
          <h2>🔧 Usage Examples:</h2>
          
          <div className="example">
            <h3>1. Basic SEO (Auto-fetch from localStorage):</h3>
            <pre>{`
import SEOHead from '../../components/SEOHead';

export default function YourPage() {
  return (
    <>
      <SEOHead 
        title="Your Page Title"
        description="Your page description"
        keywords="your, keywords"
      />
      <YourPageContent />
    </>
  );
}
            `}</pre>
          </div>

          <div className="example">
            <h3>2. With Custom Meta Tags:</h3>
            <pre>{`
<SEOHead 
  title="Custom Title"
  description="Custom description"
  keywords="custom, keywords"
  ogImage="/custom-image.jpg"
  canonical="https://maydiv.com/custom-page"
/>
            `}</pre>
          </div>

          <div className="example">
            <h3>3. SEO Dashboard Management:</h3>
            <pre>{`
// Go to /admin/seo to manage SEO data
// for all pages with full CRUD operations
            `}</pre>
          </div>
        </div>

        <div className="seo-checklist">
          <h2>✅ SEO Checklist:</h2>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Meta title is set and optimized</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Meta description is compelling</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Keywords are relevant</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Open Graph tags are set</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Twitter Card tags are set</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Structured data is implemented</span>
          </div>
          <div className="checklist-item">
            <input type="checkbox" checked readOnly />
            <span>Canonical URL is set</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .example-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h1 {
          color: #2c3e50;
          font-size: 2.5em;
          margin-bottom: 20px;
          text-align: center;
        }

        h2 {
          color: #34495e;
          font-size: 1.8em;
          margin: 30px 0 15px 0;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }

        h3 {
          color: #2c3e50;
          font-size: 1.3em;
          margin: 20px 0 10px 0;
        }

        .seo-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 10px;
          margin: 30px 0;
        }

        .seo-info ul {
          list-style: none;
          padding: 0;
        }

        .seo-info li {
          margin: 10px 0;
          padding-left: 20px;
          position: relative;
        }

        .seo-info li:before {
          content: "✅";
          position: absolute;
          left: 0;
        }

        .usage-examples {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          margin: 30px 0;
          border-left: 4px solid #667eea;
        }

        .example {
          margin: 20px 0;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        pre {
          background: #2c3e50;
          color: #ecf0f1;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 14px;
          line-height: 1.4;
        }

        .seo-checklist {
          background: #e8f5e8;
          padding: 25px;
          border-radius: 10px;
          margin: 30px 0;
          border-left: 4px solid #28a745;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
          padding: 8px 0;
        }

        .checklist-item input[type="checkbox"] {
          margin-right: 10px;
          transform: scale(1.2);
        }

        .checklist-item span {
          color: #2c3e50;
          font-weight: 500;
        }

        p {
          color: #6c757d;
          font-size: 16px;
          line-height: 1.6;
          margin: 15px 0;
        }

        @media (max-width: 768px) {
          .example-page {
            padding: 20px 15px;
          }

          h1 {
            font-size: 2em;
          }

          h2 {
            font-size: 1.5em;
          }

          pre {
            font-size: 12px;
            padding: 10px;
          }
        }
      `}</style>
    </>
  );
} 