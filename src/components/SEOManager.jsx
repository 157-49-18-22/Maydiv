import { useState, useEffect } from 'react';
import SEOHead from './SEOHead';

const SEOManager = ({ 
  pagePath, 
  children, 
  customSEO = null,
  showSEOPanel = false 
}) => {
  const [seoData, setSeoData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (customSEO) {
      setSeoData(customSEO);
      setEditForm(customSEO);
    } else {
      fetchSEOData();
    }
  }, [pagePath, customSEO]);

  const fetchSEOData = async () => {
    try {
              const response = await fetch(`https://maydiv-backend.onrender.com/api/v1/seo/page${pagePath}`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setSeoData(result.data);
        setEditForm(result.data);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSEOData = async () => {
    try {
              const response = await fetch('https://maydiv-backend.onrender.com/api/v1/admin/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...editForm,
          pagePath: pagePath,
          isPublished: true
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage('✅ SEO data saved successfully!');
        setSeoData(editForm);
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Error saving SEO data');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Network error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm(seoData || {});
    }
  };

  return (
    <>
      {/* SEO Head Component */}
      <SEOHead 
        pagePath={pagePath} 
        customData={seoData}
      />

      {/* SEO Management Panel */}
      {showSEOPanel && (
        <div className="seo-manager-panel">
          <div className="seo-panel-header">
            <h3>🎯 SEO Manager - {pagePath}</h3>
            <button onClick={toggleEdit} className="seo-edit-btn">
              {isEditing ? '❌ Cancel' : '✏️ Edit SEO'}
            </button>
          </div>

          {message && (
            <div className={`seo-message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {isEditing ? (
            <div className="seo-edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Page Title</label>
                  <input
                    type="text"
                    name="pageTitle"
                    value={editForm.pageTitle || ''}
                    onChange={handleInputChange}
                    placeholder="Enter page title"
                  />
                </div>
                <div className="form-group">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={editForm.metaTitle || ''}
                    onChange={handleInputChange}
                    placeholder="Enter meta title"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  name="metaDescription"
                  value={editForm.metaDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Enter meta description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Page Content</label>
                <textarea
                  name="content"
                  value={editForm.content || ''}
                  onChange={handleInputChange}
                  placeholder="Enter the main content for this page..."
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={editForm.keywords || ''}
                  onChange={handleInputChange}
                  placeholder="Enter keywords separated by commas"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Canonical URL</label>
                  <input
                    type="url"
                    name="canonicalUrl"
                    value={editForm.canonicalUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://maydiv.com/page"
                  />
                </div>
                <div className="form-group">
                  <label>Robots</label>
                  <select
                    name="robots"
                    value={editForm.robots || 'index, follow'}
                    onChange={handleInputChange}
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>OG Title</label>
                <input
                  type="text"
                  name="ogTitle"
                  value={editForm.ogTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph title"
                />
              </div>

              <div className="form-group">
                <label>OG Description</label>
                <textarea
                  name="ogDescription"
                  value={editForm.ogDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph description"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>OG Image URL</label>
                <input
                  type="url"
                  name="ogImage"
                  value={editForm.ogImage || ''}
                  onChange={handleInputChange}
                  placeholder="https://maydiv.com/og-image.jpg"
                />
              </div>

              <div className="form-actions">
                <button onClick={saveSEOData} className="save-btn">
                  💾 Save SEO Data
                </button>
                <button onClick={toggleEdit} className="cancel-btn">
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="seo-preview">
              <div className="seo-info">
                <p><strong>Title:</strong> {seoData?.metaTitle || 'Not set'}</p>
                <p><strong>Description:</strong> {seoData?.metaDescription || 'Not set'}</p>
                <p><strong>Keywords:</strong> {seoData?.keywords || 'Not set'}</p>
                <p><strong>SEO Score:</strong> {seoData?.seoScore || 0}/100</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Page Content */}
      {children}

      <style jsx>{`
        .seo-manager-panel {
          background: #f8f9fa;
          border: 2px solid #667eea;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          position: relative;
        }

        .seo-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .seo-panel-header h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 18px;
        }

        .seo-edit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .seo-edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .seo-message {
          padding: 10px 15px;
          border-radius: 5px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .seo-message.success {
          background: #d4edda;
          color: #155724;
          border-left: 4px solid #28a745;
        }

        .seo-message.error {
          background: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }

        .seo-edit-form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 2px solid #e9ecef;
          border-radius: 5px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .save-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .save-btn:hover {
          background: #218838;
          transform: translateY(-2px);
        }

        .cancel-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .cancel-btn:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }

        .seo-preview {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .seo-info p {
          margin: 5px 0;
          color: #6c757d;
          font-size: 14px;
        }

        .seo-info strong {
          color: #2c3e50;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .seo-panel-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default SEOManager; 