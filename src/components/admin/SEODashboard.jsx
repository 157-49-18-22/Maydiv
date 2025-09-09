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
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);


  // Available pages for dropdown
  const availablePages = [
    { path: '/', name: 'Home Page', description: 'Main landing page' },
    { path: '/about', name: 'About Page', description: 'Company information and team' },
    { path: '/contact', name: 'Contact Page', description: 'Contact information and form' },
    { path: '/web-development', name: 'Web Development', description: 'Web development services' },
    { path: '/app-development', name: 'Mobile Apps', description: 'Mobile app development services' },
    { path: '/apps/ui-ux', name: 'UI/UX Design', description: 'UI/UX design services' },
    { path: '/ai', name: 'AI Solutions', description: 'Artificial intelligence services' },
    { path: '/projects', name: 'Projects Portfolio', description: 'Our work portfolio' },
    { path: '/marketing', name: 'Digital Marketing', description: 'Digital marketing services' },
    { path: '/blog', name: 'Blog | Maydiv Digital Solutions - Latest Tech Insights & Digital Solutions', description: 'Read our latest insights on web development, AI, digital solutions, and technology trends. Expert articles on UI/UX, marketing, and business growth strategies.' },
    { path: '/seo-demo', name: 'SEO Demo', description: 'SEO demonstration page' },
    { path: '/seo-test', name: 'SEO Test Page', description: 'Test page for SEO functionality' }
  ];

  useEffect(() => {
    loadPages();
  }, []);



  const loadPages = async () => {
    try {
      setLoading(true);
      console.log('Loading pages...');
      const data = await SEOService.getPagesForDashboard();
      console.log('Pages loaded:', data);
      setPages(data);
      
      if (data.length === 0) {
        setMessage({ type: 'info', text: 'No SEO data found. Create some SEO data to get started!' });
      } else {
        setMessage({ type: 'success', text: `Loaded ${data.length} pages successfully!` });
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      setMessage({ type: 'error', text: 'Error loading pages: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh function
  const handleRefresh = () => {
    setMessage({ type: 'info', text: 'Refreshing data...' });
    loadPages();
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
      // Set default keywords for specific pages
      let defaultKeywords = '';
      if (selectedPath === '/blog') {
        defaultKeywords = 'blog, web development, AI, digital solutions, technology insights, UI/UX design, digital marketing, business growth, tech trends, software development';
      } else if (selectedPath === '/') {
        defaultKeywords = 'web development, UI/UX design, mobile apps, digital solutions, Maydiv';
      } else if (selectedPath === '/about') {
        defaultKeywords = 'about us, team, company, web development agency, digital solutions';
      } else if (selectedPath === '/contact') {
        defaultKeywords = 'contact us, get in touch, web development, digital solutions, Maydiv contact';
      }
      
      setFormData(prev => ({
        ...prev,
        pagePath: selectedPath,
        title: selectedPage.name,
        description: selectedPage.description,
        keywords: defaultKeywords
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
      console.log('Form submission - editingPage:', editingPage);
      console.log('Form submission - formData:', formData);
      
      if (editingPage) {
        console.log('Updating existing SEO data...');
        await SEOService.updateSEO(editingPage.id, formData);
        setMessage({ type: 'success', text: 'SEO data updated successfully!' });
      } else {
        console.log('Creating new SEO data...');
        console.log('Page path:', formData.pagePath);
        console.log('Title:', formData.title);
        console.log('Description:', formData.description);
        
        await SEOService.createSEO(formData);
        setMessage({ type: 'success', text: 'SEO data created successfully!' });
      }
      
      // Apply changes to files immediately
      try {
        const result = await SEOService.applySEOToFiles(formData);
        setMessage({ 
          type: 'success', 
          text: `✅ ${result.message}` 
        });
        
        // Show additional info if available
        if (result.note) {
          setTimeout(() => {
            setMessage({ 
              type: 'info', 
              text: `ℹ️ ${result.note}` 
            });
          }, 2000);
        }
      } catch (fileError) {
        setMessage({ 
          type: 'warning', 
          text: `⚠️ SEO data saved but file update failed: ${fileError.message}` 
        });
      }
      
      resetForm();
      loadPages();
      
      // Show success message for a longer time
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    } catch (error) {
      console.error('SEO form submission error:', error);
      
      // Provide more helpful error messages
      let errorMessage = 'Error saving SEO data: ' + error.message;
      
      if (error.message.includes('500')) {
        errorMessage = 'Server error (500): The backend server may be experiencing issues. Check the backend status above.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout: The backend server is taking too long to respond. It may be overloaded or starting up.';
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Network error: Unable to connect to the backend server. Check your internet connection and the backend status.';
      } else if (error.message.includes('Backend API error')) {
        errorMessage = 'Backend API error: The backend server is running but returned an error. Check the backend logs for details.';
      }
      
      setMessage({ type: 'error', text: errorMessage });
      
      // If it's a backend error, also check the backend status
      if (error.message.includes('500') || error.message.includes('timeout') || error.message.includes('fetch')) {
        setTimeout(() => {
          checkBackendStatus();
        }, 1000);
      }
    }
  };

  const handleEdit = (page) => {
    console.log('Editing page data:', page);
    setEditingPage(page);
    setEditingId(page.id);
    
    // Map backend data to frontend form fields
    // Backend uses: pageTitle, metaTitle, metaDescription
    // Frontend expects: title, description
    setFormData({
      pagePath: page.pagePath || '',
      title: page.pageTitle || page.metaTitle || page.title || '',
      description: page.metaDescription || page.description || '',
      content: page.content || '',
      keywords: page.keywords || '',
      ogImage: page.ogImage || '',
      canonical: page.canonicalUrl || page.canonical || '',
      noIndex: page.robots === 'noindex, nofollow' || page.noIndex || false,
      customMetaTags: page.customMetaTags || [],
      h1Tag: page.h1Tag || page.pageTitle || '',
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
        setDeletingId(id);
        console.log('Deleting SEO data with ID:', id);
        await SEOService.deleteSEO(id);
        setMessage({ type: 'success', text: 'SEO data deleted successfully!' });
        loadPages();
      } catch (error) {
        console.error('Error deleting SEO data:', error);
        
        // Provide more helpful error messages
        let errorMessage = 'Error deleting SEO data: ' + error.message;
        
        if (error.message.includes('500')) {
          errorMessage = 'Server error (500): The backend server may be experiencing issues. Check the backend status above.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timeout: The backend server is taking too long to respond. It may be overloaded or starting up.';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error: Unable to connect to the backend server. Check your internet connection and the backend status.';
        } else if (error.message.includes('Backend API error')) {
          errorMessage = 'Backend API error: The backend server is running but returned an error. Check the backend logs for details.';
        }
        
        setMessage({ type: 'error', text: errorMessage });
        
        // If it's a backend error, also check the backend status
        if (error.message.includes('500') || error.message.includes('timeout') || error.message.includes('fetch')) {
          setTimeout(() => {
            checkBackendStatus();
          }, 1000);
        }
      } finally {
        setDeletingId(null);
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
    setEditingId(null);
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

  // Check backend status function
  const checkBackendStatus = async () => {
    try {
      const response = await fetch('https://maydivcrm.onrender.com/health');
      if (response.ok) {
        console.log('Backend is running');
      } else {
        console.log('Backend is not responding properly');
      }
    } catch (error) {
      console.log('Backend is not accessible:', error.message);
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
          <button 
            className="btn btn-info"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
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
          {availablePages.map((page) => {
            // Set default keywords for specific pages
            let defaultKeywords = '';
            if (page.path === '/blog') {
              defaultKeywords = 'blog, web development, AI, digital solutions, technology insights, UI/UX design, digital marketing, business growth, tech trends, software development';
            } else if (page.path === '/') {
              defaultKeywords = 'web development, UI/UX design, mobile apps, digital solutions, Maydiv';
            } else if (page.path === '/about') {
              defaultKeywords = 'about us, team, company, web development agency, digital solutions';
            } else if (page.path === '/contact') {
              defaultKeywords = 'contact us, get in touch, web development, digital solutions, Maydiv contact';
            }
            
            return (
              <button
                key={page.path}
                onClick={() => {
                  setFormData({
                    pagePath: page.path,
                    title: page.name,
                    description: page.description,
                    content: '',
                    keywords: defaultKeywords,
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
            );
          })}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          🚀 Click any page button to start editing SEO data!
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
        
        {/* Clean SEO Management Section */}
        <div className="seo-management-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>🚀 Live SEO Management</h4>
          
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            <p><strong>✅ LIVE SYSTEM:</strong> SEO changes are automatically applied in real-time!</p>
            <p><strong>🔄 REAL-TIME:</strong> Updates visible immediately to all users</p>
            <p><strong>💾 SERVER STORAGE:</strong> All data saved to cloud database</p>
          </div>
        </div>
        
        {pages.length === 0 ? (
          <div className="no-data">No SEO data found. Add your first page!</div>
        ) : (
          <div className="pages-grid">
            {pages.map((page) => (
              <div key={page.id} className="page-card">
                <div className="page-header">
                  <h4>{page.pageTitle || page.metaTitle || page.title || page.pagePath}</h4>
                  <div className="page-actions">
                    <button
                      onClick={() => handleEdit(page)}
                      className="btn btn-sm btn-primary"
                      disabled={editingId === page.id}
                    >
                      {editingId === page.id ? 'Editing...' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="btn btn-sm btn-danger"
                      disabled={deletingId === page.id}
                    >
                      {deletingId === page.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
                
                <div className="page-details">
                  <p><strong>Path:</strong> {page.pagePath}</p>
                  <p><strong>Title:</strong> {page.pageTitle || page.metaTitle || page.title || 'N/A'}</p>
                  <p><strong>Description:</strong> {page.metaDescription || page.description || 'N/A'}</p>
                  <p><strong>Content:</strong> {page.content ? page.content.substring(0, 150) + '...' : 'N/A'}</p>
                  <p><strong>Keywords:</strong> {page.keywords || 'N/A'}</p>
                  <p><strong>No Index:</strong> {page.robots === 'noindex, nofollow' || page.noIndex ? 'Yes' : 'No'}</p>
                  <p><strong>SEO Score:</strong> {page.seoScore || 'N/A'}</p>
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
