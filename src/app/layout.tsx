import Script from 'next/script'

export const metadata = {
  description: 'Maydiv Website',
  icons: {
    icon: '/Lo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZELL05P2J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZELL05P2J');
          `}
        </Script>
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WZELL05P2J"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZELL05P2J');
          `
        }} />

        {/* Pure Live SEO System - Optimized for 300 second intervals */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Pure Live SEO System - Optimized for 300 second intervals
            window.PureLiveSEO = {
              data: {},
              currentPage: window.location.pathname,
              isInitialized: false,
              
              init() {
                if (this.isInitialized) return;
                
                console.log('🚀 Pure Live SEO System Starting...');
                console.log('📍 Current page:', this.currentPage);
                
                // Load data immediately
                this.loadLiveData();
                
                // Set up auto-refresh every 300 seconds (5 minutes) to save costs
                setInterval(() => {
                  this.loadLiveData();
                }, 300000); // 300 seconds = 5 minutes
                
                this.isInitialized = true;
                console.log('🚀 Pure Live SEO System Ready! (300s intervals)');
              },
              
              // Load live data from server
              async loadLiveData() {
                try {
                  console.log('📥 Pure Live SEO: Loading live data from server...');
                  
                  const apiUrl = 'https://maydivcrm.onrender.com';
                  const response = await fetch(\`\${apiUrl}/api/v1/seo?\${Date.now()}\`, {
                    cache: 'no-cache',
                    headers: {
                      'Cache-Control': 'no-cache, no-store, must-revalidate',
                      'Pragma': 'no-cache',
                      'Expires': '0'
                    }
                  });
                  
                  if (response.ok) {
                    const serverData = await response.json();
                    console.log('📥 Pure Live SEO: Live data loaded from server:', serverData);
                    
                    // Update local data
                    if (serverData.success && serverData.seoData) {
                      this.data = {};
                      serverData.seoData.forEach(item => {
                        this.data[item.pagePath] = {
                          title: item.metaTitle || item.pageTitle,
                          description: item.metaDescription,
                          keywords: item.keywords,
                          content: item.content,
                          h1Tag: item.pageTitle,
                          ogTitle: item.ogTitle,
                          ogDescription: item.ogDescription,
                          ogImage: item.ogImage,
                          updatedAt: item.updatedAt,
                          savedLive: true,
                          liveTimestamp: Date.now()
                        };
                      });
                    } else {
                      this.data = {};
                    }
                    
                    // Apply to current page
                    this.applyToCurrentPage();
                    
                    // Show admin panel if on admin page
                    if (this.currentPage.includes('/admin/seo') || this.currentPage.includes('/admin')) {
                      this.showPureLiveAdminPanel(this.data);
                    }
                    
                    console.log('✅ Pure Live SEO: Data updated successfully');
                  } else {
                    console.log('📥 Pure Live SEO: No live data found, starting fresh');
                    this.data = {};
                  }
                } catch (e) {
                  console.log('📥 Pure Live SEO: Server not available, using empty data');
                  this.data = {};
                }
              },
              
              // Save changes live to server
              async saveLiveChanges(pagePath, seoData) {
                try {
                  console.log('💾 Pure Live SEO: Saving live changes for', pagePath, ':', seoData);
                  
                  const apiUrl = 'https://maydivcrm.onrender.com';
                  const response = await fetch(\`\${apiUrl}/api/v1/seo\`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Cache-Control': 'no-cache, no-store, must-revalidate'
                    },
                    body: JSON.stringify({
                      page: pagePath,
                      data: {
                        ...seoData,
                        pagePath: pagePath,
                        updatedAt: new Date().toISOString(),
                        savedLive: true,
                        liveTimestamp: Date.now()
                      }
                    })
                  });
                  
                  if (response.ok) {
                    const result = await response.json();
                    console.log('✅ Pure Live SEO: Changes saved live to server:', result);
                    
                    // Update website immediately
                    this.updateWebsiteLive(pagePath, seoData);
                    
                    // Reload data immediately
                    this.loadLiveData();
                    
                    return { success: true, message: 'Changes saved live and visible to everyone now!' };
                  } else {
                    throw new Error('Failed to save changes live');
                  }
                } catch (e) {
                  console.error('❌ Pure Live SEO: Error saving changes:', e);
                  return { success: false, message: 'Error saving changes: ' + e.message };
                }
              },
              
              // Update website live
              updateWebsiteLive(pagePath, seoData) {
                console.log('🌐 Pure Live SEO: Updating website live for', pagePath);
                
                if (this.currentPage === pagePath) {
                  this.applyToCurrentPage();
                }
                
                // Update meta tags live
                if (seoData.title) {
                  document.title = seoData.title;
                }
                
                if (seoData.description) {
                  let meta = document.querySelector('meta[name="description"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'description';
                    document.head.appendChild(meta);
                  }
                  meta.content = seoData.description;
                }
                
                if (seoData.keywords) {
                  let meta = document.querySelector('meta[name="keywords"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'keywords';
                    document.head.appendChild(meta);
                  }
                  meta.content = seoData.keywords;
                }
                
                // Update Open Graph tags
                if (seoData.ogTitle) {
                  let ogTitle = document.querySelector('meta[property="og:title"]');
                  if (!ogTitle) {
                    ogTitle = document.createElement('meta');
                    ogTitle.setAttribute('property', 'og:title');
                    document.head.appendChild(ogTitle);
                  }
                  ogTitle.content = seoData.ogTitle;
                }
                
                if (seoData.ogDescription) {
                  let ogDesc = document.querySelector('meta[property="og:description"]');
                  if (!ogDesc) {
                    ogDesc = document.createElement('meta');
                    ogDesc.setAttribute('property', 'og:description');
                    document.head.appendChild(ogDesc);
                  }
                  ogDesc.content = seoData.ogDescription;
                }
                
                if (seoData.ogImage) {
                  let ogImg = document.querySelector('meta[property="og:image"]');
                  if (!ogImg) {
                    ogImg = document.createElement('meta');
                    ogImg.setAttribute('property', 'og:image');
                    document.head.appendChild(ogImg);
                  }
                  ogImg.content = seoData.ogImage;
                }
                
                console.log('✅ Pure Live SEO: Website updated live');
              },
              
              // Apply SEO data to current page
              applyToCurrentPage() {
                const pageData = this.data[this.currentPage];
                if (!pageData) return;
                
                console.log('🔧 Pure Live SEO: Applying live data to current page:', pageData);
                
                if (pageData.title) {
                  document.title = pageData.title;
                }
                
                if (pageData.description) {
                  let meta = document.querySelector('meta[name="description"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'description';
                    document.head.appendChild(meta);
                  }
                  meta.content = pageData.description;
                }
                
                if (pageData.keywords) {
                  let meta = document.querySelector('meta[name="keywords"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'keywords';
                    document.head.appendChild(meta);
                  }
                  meta.content = pageData.keywords;
                }
                
                if (pageData.h1Tag) {
                  const h1 = document.querySelector('h1');
                  if (h1) {
                    h1.textContent = pageData.h1Tag;
                  }
                }
                
                console.log('✅ Pure Live SEO: Data applied successfully');
              },
              
              // Show admin panel
              showPureLiveAdminPanel(allData) {
                if (document.getElementById('pure-live-seo-admin-panel')) return;
                
                const panel = document.createElement('div');
                panel.id = 'pure-live-seo-admin-panel';
                panel.innerHTML = \`
                  <div style="
                    position: fixed; top: 20px; left: 20px; 
                    background: white; border: 2px solid #e83e8c; 
                    border-radius: 10px; padding: 20px; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 10000; max-width: 800px; font-family: Arial;
                    max-height: 80vh; overflow-y: auto;
                  ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                      <h3 style="margin: 0; color: #e83e8c;">🚀 Pure Live SEO Admin Panel</h3>
                      <button onclick="document.getElementById('pure-live-seo-admin-panel').remove()" style="
                        background: #dc3545; color: white; border: none; 
                        padding: 5px 10px; border-radius: 5px; cursor: pointer;
                      ">✕</button>
                    </div>
                    
                    <div style="margin-bottom: 15px; padding: 10px; background: #f8d7da; border-radius: 5px; font-size: 12px;">
                      <strong>📊 Total Pages with Live SEO Data:</strong> \${Object.keys(allData).length}
                      <br><strong>🔄 Auto-refresh:</strong> Every 5 minutes (Cost optimized!)
                      <br><strong>📍 Current Page:</strong> \${this.currentPage}
                      <br><strong>💰 Cost Savings:</strong> 30x less API calls!
                    </div>
                    
                    \${Object.keys(allData).length > 0 ? 
                      Object.keys(allData).map(page => {
                        const pageData = allData[page];
                        return \`
                          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #f8f9fa;">
                            <h4 style="margin: 0 0 10px 0; color: #495057;">📄 \${page}</h4>
                            <div style="font-size: 12px; color: #6c757d; margin-bottom: 10px;">
                              Last updated: \${pageData.updatedAt ? new Date(pageData.updatedAt).toLocaleString() : 'Unknown'}
                              <br>Status: \${pageData.savedLive ? '✅ LIVE & SAVED TO SERVER' : '⏳ Saving...'}
                            </div>
                            \${pageData.title ? \`<div><strong>Title:</strong> \${pageData.title}</div>\` : ''}
                            \${pageData.description ? \`<div><strong>Description:</strong> \${pageData.description}</div>\` : ''}
                            \${pageData.keywords ? \`<div><strong>Keywords:</strong> \${pageData.keywords}</div>\` : ''}
                            
                            <div style="margin-top: 10px; display: flex; gap: 10px;">
                              <button onclick="window.PureLiveSEO.editPageData('\${page}')" style="
                                background: #17a2b8; color: white; border: none; 
                                padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;
                              ">✏️ Edit</button>
                              <button onclick="window.PureLiveSEO.deletePageData('\${page}')" style="
                                background: #dc3545; color: white; border: none; 
                                padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 12px;
                              ">🗑️ Delete</button>
                            </div>
                          </div>
                        \`;
                      }).join('') :
                      '<div style="padding: 20px; text-align: center; color: #6c757d;">No live SEO data found yet. Create some SEO data first!</div>'
                    }
                    
                    <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 12px;">
                      <strong>💡 Cost Optimized Features:</strong><br>
                      • 300 second intervals (5 minutes)<br>
                      • 30x less API calls<br>
                      • Same functionality, lower cost<br>
                      • Backend friendly
                    </div>
                  </div>
                \`;
                
                document.body.appendChild(panel);
                console.log('👑 Pure Live SEO: Admin panel created with', Object.keys(allData).length, 'pages');
              },
              
              // Edit page data
              editPageData(pagePath) {
                console.log('✏️ Pure Live SEO: Editing page:', pagePath);
                window.location.href = pagePath;
              },
              
              // Delete page data
              async deletePageData(pagePath) {
                if (!confirm(\`Are you sure you want to delete live SEO data for \${pagePath}?\`)) {
                  return;
                }
                
                try {
                  const apiUrl = 'https://maydivcrm.onrender.com';
                  const response = await fetch(\`\${apiUrl}/api/v1/seo\`, {
                    method: 'DELETE',
                    headers: { 
                      'Content-Type': 'application/json',
                      'Cache-Control': 'no-cache, no-store, must-revalidate'
                    },
                    body: JSON.stringify({ page: pagePath })
                  });
                  
                  if (response.ok) {
                    delete this.data[pagePath];
                    this.showPureLiveAdminPanel(this.data);
                    alert('Live SEO data deleted successfully from server!');
                  } else {
                    alert('Error deleting live SEO data');
                  }
                } catch (e) {
                  console.error('❌ Pure Live SEO: Error deleting data:', e);
                  alert('Error deleting live SEO data');
                }
              }
            };
            
            // Initialize when page loads
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', () => window.PureLiveSEO.init());
            } else {
              window.PureLiveSEO.init();
            }
            
            // Add floating button for quick access
            setTimeout(() => {
              if (!document.getElementById('pure-live-seo-button')) {
                const button = document.createElement('button');
                button.id = 'pure-live-seo-button';
                button.innerHTML = '🚀 Pure Live SEO';
                button.style.cssText = \`
                  position: fixed; bottom: 20px; right: 20px; 
                  background: linear-gradient(45deg, #e83e8c, #fd7e14); 
                  color: white; border: none; 
                  padding: 15px 20px; border-radius: 50px; cursor: pointer;
                  font-size: 16px; font-weight: bold; z-index: 9999;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.3); transition: all 0.3s;
                \`;
                button.onmouseover = () => button.style.transform = 'scale(1.1)';
                button.onmouseout = () => button.style.transform = 'scale(1)';
                button.onclick = () => {
                  if (window.location.pathname.includes('/admin/seo') || window.location.pathname.includes('/admin')) {
                    window.PureLiveSEO.showPureLiveAdminPanel(window.PureLiveSEO.data);
                  } else {
                    alert('Go to admin/SEO page to view all live SEO data');
                  }
                };
                document.body.appendChild(button);
              }
            }, 3000);
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
