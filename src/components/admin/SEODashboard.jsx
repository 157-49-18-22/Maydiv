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
    customMetaTags: []
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [initializing, setInitializing] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

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
      customMetaTags: page.customMetaTags || []
    });
    setShowForm(true);
  };

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
      customMetaTags: []
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
                <input
                  type="text"
                  name="pagePath"
                  value={formData.pagePath}
                  onChange={handleInputChange}
                  placeholder="/about"
                  required
                />
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
