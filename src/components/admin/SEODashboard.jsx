'use client';

import { useState, useEffect } from 'react';
import { SEOService } from '../../lib/seoService.js';
import { initializeSEOData } from '../../lib/initSEOData.js';
import './SEODashboard.css';

const SEODashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pagePath: '',
    title: '',
    description: '',
    content: '',
    keywords: '',
    ogImage: '',
    canonical: '',
    noIndex: false,
    customMetaTags: [],
    h1Tag: '',
    h2Tags: [],
    h3Tags: []
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [initializing, setInitializing] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [exportingData, setExportingData] = useState(false);
  const [bypassSrcRestriction, setBypassSrcRestriction] = useState(false);

  // Available pages for dropdown
  const availablePages = [
    { path: '/', name: 'Home Page', description: 'Main landing page' },
    { path: '/about', name: 'About Page', description: 'Company information and team' },
    { path: '/contact', name: 'Contact Page', description: 'Contact information and form' },
    { path: '/web-development', name: 'Web Development', description: 'Web development services' },
    { path: '/apps', name: 'Mobile Apps', description: 'Mobile app development services' },
    { path: '/apps/ui-ux', name: 'UI/UX Design', description: 'UI/UX design services' },
    { path: '/ai', name: 'AI Solutions', description: 'Artificial intelligence services' },
    { path: '/projects', name: 'Projects Portfolio', description: 'Our work portfolio' },
    { path: '/marketing', name: 'Digital Marketing', description: 'Digital marketing services' },
    { path: '/seo-demo', name: 'SEO Demo', description: 'SEO demonstration page' }
  ];

  useEffect(() => {
    loadPages();
  }, []);

  // Function to bypass src restriction for file editing
  const enableFileEditing = () => {
    setBypassSrcRestriction(true);
    setMessage({ 
      type: 'success', 
      text: 'File editing enabled! You can now edit files without src restriction.' 
    });
  };

  // Function to create virtual src paths
  const createVirtualSrcPath = (fileName) => {
    if (bypassSrcRestriction) {
      return `src/components/${fileName}`;
    }
    return fileName;
  };

  // Function to open virtual file editor
  const openVirtualFileEditor = (fileName) => {
    if (bypassSrcRestriction) {
      // Create a virtual file path that bypasses src restriction
      const virtualPath = `src/components/${fileName}`;
      
      // Open file in editor with virtual path
      window.open(`/admin/editor?file=${encodeURIComponent(virtualPath)}`, '_blank');
      
      setMessage({ 
        type: 'success', 
        text: `Virtual file editor opened for ${fileName} with src path!` 
      });
    } else {
      setMessage({ 
        type: 'error', 
        text: 'Please enable file editing first by clicking "Enable File Editing" button!' 
      });
    }
  };

  const loadPages = async () => {
    try {
      setLoading(true);
      const data = await SEOService.getPagesForDashboard();
      setPages(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error loading pages: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCustomMetaTagChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      customMetaTags: prev.customMetaTags.map((tag, i) => 
        i === index ? { ...tag, [field]: value } : tag
      )
    }));
  };

  // Handle page selection from dropdown
  const handlePageSelection = (selectedPath) => {
    const selectedPage = availablePages.find(page => page.path === selectedPath);
    if (selectedPage) {
      setFormData(prev => ({
        ...prev,
        pagePath: selectedPath,
        title: selectedPage.name,
        description: selectedPage.description
      }));
    }
  };

  const addCustomMetaTag = () => {
    setFormData(prev => ({
      ...prev,
      customMetaTags: [...prev.customMetaTags, { name: '', content: '' }]
    }));
  };

  const removeCustomMetaTag = (index) => {
    setFormData(prev => ({
      ...prev,
      customMetaTags: prev.customMetaTags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await SEOService.updateSEO(editingPage.id, formData);
        setMessage({ type: 'success', text: 'SEO data updated successfully!' });
      } else {
        await SEOService.createSEO(formData);
        setMessage({ type: 'success', text: 'SEO data created successfully!' });
      }
      
      // 🚀 AUTOMATICALLY APPLY CHANGES TO LIVE WEBSITE FILES!
      try {
        const result = await SEOService.applySEOToFiles(formData);
        setMessage({ 
          type: 'success', 
          text: `✅ SEO changes saved AND applied to live website! ${result.message}` 
        });
      } catch (fileError) {
        setMessage({ 
          type: 'warning', 
          text: `⚠️ SEO data saved but file update failed: ${fileError.message}` 
        });
      }
      
      resetForm();
      loadPages();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving SEO data: ' + error.message });
    }
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({
      pagePath: page.pagePath || '',
      title: page.title || '',
      description: page.description || '',
      content: page.content || '',
      keywords: page.keywords || '',
      ogImage: page.ogImage || '',
      canonical: page.canonical || '',
      noIndex: page.noIndex || false,
      customMetaTags: page.customMetaTags || [],
      h1Tag: page.h1Tag || '',
      h2Tags: Array.isArray(page.h2Tags) ? page.h2Tags : [],
      h3Tags: Array.isArray(page.h3Tags) ? page.h3Tags : []
    });
    setShowForm(true);
  };

  // Auto-fill form with page data when page path changes
  useEffect(() => {
    if (formData.pagePath && !editingPage) {
      const selectedPage = availablePages.find(page => page.path === formData.pagePath);
      if (selectedPage && (!formData.title || formData.title === selectedPage.name)) {
        setFormData(prev => ({
          ...prev,
          title: selectedPage.name,
          description: selectedPage.description
        }));
      }
    }
  }, [formData.pagePath, editingPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this SEO data?')) {
      try {
        await SEOService.deleteSEO(id);
        setMessage({ type: 'success', text: 'SEO data deleted successfully!' });
        loadPages();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error deleting SEO data: ' + error.message });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      pagePath: '',
      title: '',
      description: '',
      content: '',
      keywords: '',
      ogImage: '',
      canonical: '',
      noIndex: false,
      customMetaTags: [],
      h1Tag: '',
      h2Tags: [],
      h3Tags: []
    });
    setEditingPage(null);
    setShowForm(false);
  };

  const formatDate = (date) => {
    return new Date(date?.toDate?.() || date).toLocaleDateString();
  };

  const handleInitializeSEO = async () => {
    if (window.confirm('This will create default SEO data for all pages. Continue?')) {
      try {
        setInitializing(true);
        await initializeSEOData();
        setMessage({ type: 'success', text: 'SEO data initialized successfully!' });
        loadPages();
      } catch (error) {
        setMessage({ type: 'error', text: 'Error initializing SEO data: ' + error.message });
      } finally {
        setInitializing(false);
      }
    }
  };

  const handleTestConnection = async () => {
    try {
      setTestingConnection(true);
      const isConnected = await SEOService.testConnection();
      if (isConnected) {
        setMessage({ type: 'success', text: 'Firebase connection successful!' });
      } else {
        setMessage({ type: 'error', text: 'Firebase connection failed!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection test error: ' + error.message });
    } finally {
      setTestingConnection(false);
    }
  };

  const exportSEOToFiles = async () => {
    try {
      setExportingData(true);
      setMessage({ type: 'info', text: 'Exporting SEO data to files...' });
      
      // Get all SEO data
      const allSEOData = await SEOService.getAllSEO();
      
      // Create export data
      const exportData = {
        timestamp: new Date().toISOString(),
        totalPages: allSEOData.length,
        seoData: allSEOData
      };
      
      // Save to localStorage for backup
      localStorage.setItem('maydiv_seo_export', JSON.stringify(exportData));
      
      // Create downloadable file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `seo-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      setMessage({ 
        type: 'success', 
        text: `SEO data exported successfully! ${allSEOData.length} pages exported. Download the file and follow deployment instructions.` 
      });
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Error exporting SEO data: ' + error.message });
    } finally {
      setExportingData(false);
    }
  };

  const deploySEOChanges = async () => {
    try {
      setMessage({ type: 'info', text: '🚀 Deploying ALL SEO changes to live website files...' });
      
      // Get all SEO data
      const allSEOData = await SEOService.getAllSEO();
      
      // Apply ALL SEO changes to files via API
      let successCount = 0;
      let errorCount = 0;
      
      for (const page of allSEOData) {
        try {
          await SEOService.applySEOToFiles(page);
          successCount++;
        } catch (error) {
          console.error(`Failed to apply SEO for ${page.pagePath}:`, error);
          errorCount++;
        }
      }
      
      // Create deployment summary
      const deploymentSummary = {
        timestamp: new Date().toISOString(),
        totalPages: allSEOData.length,
        successful: successCount,
        failed: errorCount,
        pages: allSEOData.map(page => ({
          page: page.pagePath,
          title: page.title,
          status: 'deployed'
        }))
      };
      
      // Save deployment summary
      localStorage.setItem('maydiv_seo_deployment_summary', JSON.stringify(deploymentSummary));
      
      if (errorCount === 0) {
        setMessage({ 
          type: 'success', 
          text: `🎉 ALL SEO changes deployed successfully! ${successCount} pages updated on live website. Changes are now LIVE!` 
        });
      } else {
        setMessage({ 
          type: 'warning', 
          text: `⚠️ Partial deployment: ${successCount} successful, ${errorCount} failed. Check console for details.` 
        });
      }
      
    } catch (error) {
      setMessage({ type: 'error', text: '❌ Deployment failed: ' + error.message });
    }
  };

  if (loading) {
    return <div className="seo-dashboard-loading">Loading SEO Dashboard...</div>;
  }

  return (
    <div className="seo-dashboard">
      <div className="seo-dashboard-header">
        <h1>SEO Management Dashboard</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleTestConnection}
            disabled={testingConnection}
          >
            {testingConnection ? 'Testing...' : 'Test Connection'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleInitializeSEO}
            disabled={initializing}
          >
            {initializing ? 'Initializing...' : 'Initialize Default SEO'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add New SEO Data
          </button>
        </div>
      </div>

      {/* Quick Page Selector */}
      <div className="quick-page-selector" style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>
          🚀 Quick SEO Management
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {availablePages.map((page) => (
            <button
              key={page.path}
              onClick={() => {
                setFormData({
                  pagePath: page.path,
                  title: page.name,
                  description: page.description,
                  content: '',
                  keywords: '',
                  ogImage: '',
                  canonical: '',
                  noIndex: false,
                  customMetaTags: [],
                  h1Tag: '',
                  h2Tags: [],
                  h3Tags: []
                });
                setShowForm(true);
              }}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              {page.name}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          💡 Click any page button to quickly start editing its SEO data!
        </div>
      </div>

      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
          <button onClick={() => setMessage({ type: '', text: '' })}>×</button>
        </div>
      )}

      {showForm && (
        <div className="seo-form-overlay">
          <div className="seo-form-container">
            <div className="seo-form-header">
              <h2>{editingPage ? 'Edit SEO Data' : 'Add New SEO Data'}</h2>
              <button onClick={resetForm} className="close-btn">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="seo-form">
              <div className="form-group">
                <label>Page Path *</label>
                <select
                  name="pagePath"
                  value={formData.pagePath}
                  onChange={(e) => handlePageSelection(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select a page...</option>
                  {availablePages.map((page) => (
                    <option key={page.path} value={page.path}>
                      {page.name} - {page.path}
                    </option>
                  ))}
                </select>
                {formData.pagePath && (
                  <div style={{ 
                    marginTop: '5px', 
                    fontSize: '12px', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    📍 Selected: {formData.pagePath}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Page Title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Meta description"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Page Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter the main content for this page..."
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>H1 Tag</label>
                <input
                  type="text"
                  name="h1Tag"
                  value={formData.h1Tag}
                  onChange={handleInputChange}
                  placeholder="Main heading (H1)"
                />
              </div>

              <div className="form-group">
                <label>H2 Tags (comma-separated)</label>
                <input
                  type="text"
                  name="h2Tags"
                  value={Array.isArray(formData.h2Tags) ? formData.h2Tags.join(', ') : ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    h2Tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }))}
                  placeholder="Subheadings (H2)"
                />
              </div>

              <div className="form-group">
                <label>H3 Tags (comma-separated)</label>
                <input
                  type="text"
                  name="h3Tags"
                  value={Array.isArray(formData.h3Tags) ? formData.h3Tags.join(', ') : ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    h3Tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  }))}
                  placeholder="Sub-subheadings (H3)"
                />
              </div>

              <div className="form-group">
                <label>Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="form-group">
                <label>OG Image URL</label>
                <input
                  type="url"
                  name="ogImage"
                  value={formData.ogImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Canonical URL</label>
                <input
                  type="url"
                  name="canonical"
                  value={formData.canonical}
                  onChange={handleInputChange}
                  placeholder="https://maydiv.com/page"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="noIndex"
                    checked={formData.noIndex}
                    onChange={handleInputChange}
                  />
                  No Index (Prevent search engines from indexing)
                </label>
              </div>

              <div className="form-group">
                <label>Custom Meta Tags</label>
                {formData.customMetaTags.map((tag, index) => (
                  <div key={index} className="custom-meta-tag">
                    <input
                      type="text"
                      placeholder="Meta name"
                      value={tag.name}
                      onChange={(e) => handleCustomMetaTagChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Meta content"
                      value={tag.content}
                      onChange={(e) => handleCustomMetaTagChange(index, 'content', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomMetaTag(index)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCustomMetaTag}
                  className="btn btn-secondary btn-sm"
                >
                  Add Custom Meta Tag
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPage ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="seo-pages-list">
        <h3>SEO Data ({pages.length} pages)</h3>
        
        {/* Export and Deployment Section */}
        <div className="export-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>🚀 Deploy SEO Changes to Live Website</h4>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={deploySEOChanges}
              disabled={pages.length === 0}
              className="btn btn-primary"
              style={{ minWidth: '250px', fontSize: '16px', padding: '12px' }}
            >
              🚀 DEPLOY ALL SEO CHANGES NOW!
            </button>
            
            <button
              onClick={exportSEOToFiles}
              disabled={exportingData || pages.length === 0}
              className="btn btn-success"
              style={{ minWidth: '200px' }}
            >
              {exportingData ? '📤 Exporting...' : '📤 Export SEO Data'}
            </button>

            <button
              onClick={enableFileEditing}
              className="btn btn-warning"
              style={{ minWidth: '200px' }}
            >
              🔓 Enable File Editing
            </button>
          </div>
          
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            <p><strong>🎯 NEW:</strong> SEO changes are now automatically applied to live website files!</p>
            <p><strong>🚀 DEPLOY NOW:</strong> Click "DEPLOY ALL SEO CHANGES NOW!" to apply all changes immediately</p>
            <p><strong>📁 Files Created:</strong> SEO files saved to `public/seo/` folder</p>
            <p><strong>🌐 Live Updates:</strong> Changes appear on website after deployment</p>
          </div>
        </div>
        
        {pages.length === 0 ? (
          <div className="no-data">No SEO data found. Add your first page!</div>
        ) : (
          <div className="pages-grid">
            {pages.map((page) => (
              <div key={page.id} className="page-card">
                <div className="page-header">
                  <h4>{page.title || page.pagePath}</h4>
                  <div className="page-actions">
                    <button
                      onClick={() => handleEdit(page)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="page-details">
                  <p><strong>Path:</strong> {page.pagePath}</p>
                  <p><strong>Description:</strong> {page.description?.substring(0, 100)}...</p>
                  <p><strong>Content:</strong> {page.content?.substring(0, 150)}...</p>
                  <p><strong>Keywords:</strong> {page.keywords}</p>
                  <p><strong>No Index:</strong> {page.noIndex ? 'Yes' : 'No'}</p>
                  <p><strong>Updated:</strong> {formatDate(page.updatedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SEODashboard;
