'use client';

import { FiFolder, FiFile, FiSearch, FiDatabase, FiSettings, FiChevronRight, FiChevronDown, FiMoreVertical, FiImage } from 'react-icons/fi';

const styles = {
  container: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    padding: '1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerIcon: {
    color: '#3b82f6',
    fontSize: '1.5rem',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '1rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.875rem',
    background: 'white',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  searchInputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '1rem',
  },
  tabsContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  tab: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    background: 'transparent',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  tabActive: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    color: '#1e40af',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tabHover: {
    background: '#f1f5f9',
    color: '#374151',
  },
  content: {
    flex: 1,
    padding: '1rem',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  fileList: {
    flex: 1,
    overflow: 'auto',
    paddingRight: '0.5rem',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    marginBottom: '0.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  fileItemHover: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderTopColor: '#cbd5e1',
    borderRightColor: '#cbd5e1',
    borderBottomColor: '#cbd5e1',
    borderLeftColor: '#cbd5e1',
    transform: 'translateX(4px)',
  },
  fileItemSelected: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    borderTopColor: '#3b82f6',
    borderRightColor: '#3b82f6',
    borderBottomColor: '#3b82f6',
    borderLeftColor: '#3b82f6',
    borderLeftWidth: '3px',
  },
  fileIcon: {
    fontSize: '1.25rem',
    marginRight: '0.75rem',
    flexShrink: 0,
  },
  folderIcon: {
    color: '#3b82f6',
  },
  fileIconColor: {
    color: '#10b981',
  },
  imageIconColor: {
    color: '#f59e0b',
  },
  fileContent: {
    flex: 1,
    minWidth: 0,
  },
  fileName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fileNameSelected: {
    fontWeight: '600',
    color: '#1e40af',
  },
  fileDetails: {
    fontSize: '0.75rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  fileBadge: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  folderBadge: {
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  expandIcon: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginRight: '0.5rem',
    transition: 'transform 0.2s ease',
  },
  expandIconExpanded: {
    transform: 'rotate(90deg)',
  },
  nestedContainer: {
    marginLeft: '1.5rem',
    marginTop: '0.5rem',
    borderLeft: '2px solid #e2e8f0',
    paddingLeft: '1rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    color: '#64748b',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '3rem',
    color: '#cbd5e1',
    marginBottom: '1rem',
  },
  emptyTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
  },
  emptyText: {
    fontSize: '0.875rem',
    margin: 0,
  },
  scrollbar: {
    width: '6px',
  },
  scrollbarTrack: {
    background: '#f1f5f9',
    borderRadius: '3px',
  },
  scrollbarThumb: {
    background: '#cbd5e1',
    borderRadius: '3px',
  },
  scrollbarThumbHover: {
    background: '#94a3b8',
  },
};

export default function FileExplorer({ 
  codeData, 
  activeTab, 
  setActiveTab, 
  searchTerm, 
  setSearchTerm, 
  selectedFile, 
  onFileSelect 
}) {
  // Filter files based on search term
  const filterFiles = (items) => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      if (item.type === 'file') {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.path.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (item.type === 'directory' && item.children) {
        const filteredChildren = filterFiles(item.children);
        return filteredChildren.length > 0 || 
               item.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  };

  // Render file tree with inline styles
  const renderFileTree = (items, level = 0) => {
    const filteredItems = filterFiles(items);
    
    return filteredItems.map((item, index) => (
      <div key={index}>
        <div 
          style={{
            ...styles.fileItem,
            marginLeft: `${level * 16}px`,
            ...(selectedFile?.path === item.path ? styles.fileItemSelected : {}),
          }}
          onMouseEnter={(e) => {
            if (selectedFile?.path !== item.path) {
              e.target.style.background = styles.fileItemHover.background;
              e.target.style.borderTopColor = styles.fileItemHover.borderTopColor;
              e.target.style.borderRightColor = styles.fileItemHover.borderRightColor;
              e.target.style.borderBottomColor = styles.fileItemHover.borderBottomColor;
              e.target.style.borderLeftColor = styles.fileItemHover.borderLeftColor;
              e.target.style.transform = styles.fileItemHover.transform;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedFile?.path !== item.path) {
              e.target.style.background = 'transparent';
              e.target.style.borderTopColor = 'transparent';
              e.target.style.borderRightColor = 'transparent';
              e.target.style.borderBottomColor = 'transparent';
              e.target.style.borderLeftColor = 'transparent';
              e.target.style.transform = 'translateX(0)';
            }
          }}
          onClick={() => item.type === 'file' && onFileSelect(item)}
        >
          {item.type === 'directory' ? (
            <>
              <FiFolder style={{ ...styles.fileIcon, ...styles.folderIcon }} />
              <div style={styles.fileContent}>
                <div style={styles.fileName}>{item.name}</div>
                <div style={styles.fileDetails}>
                  {item.children?.length || 0} items
                </div>
              </div>
              <div style={{ ...styles.fileBadge, ...styles.folderBadge }}>
                {item.children?.length || 0}
              </div>
            </>
                      ) : (
              <>
                {item.isImage ? (
                  <FiImage style={{ ...styles.fileIcon, ...styles.imageIconColor }} />
                ) : (
                  <FiFile style={{ ...styles.fileIcon, ...styles.fileIconColor }} />
                )}
                <div style={styles.fileContent}>
                  <div style={{
                    ...styles.fileName,
                    ...(selectedFile?.path === item.path ? styles.fileNameSelected : {})
                  }}>
                    {item.name}
                  </div>
                  <div style={styles.fileDetails}>
                    {item.extension} • {item.size} bytes • {item.isImage ? 'Image file' : `${item.content?.split('\n').length || 0} lines`}
                  </div>
                </div>
              </>
            )}
        </div>
        
        {item.type === 'directory' && item.children && (
          <div style={styles.nestedContainer}>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const currentData = codeData && activeTab === 'app' ? codeData.app : 
                     codeData && activeTab === 'components' ? codeData.components :
                     codeData && activeTab === 'public' ? codeData.public : null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>
          <FiFolder style={styles.headerIcon} />
          File Explorer
        </h2>
        
        {/* Search */}
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = styles.searchInputFocus.borderColor;
              e.target.style.boxShadow = styles.searchInputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('app')}
            style={{
              ...styles.tab,
              ...(activeTab === 'app' ? styles.tabActive : {}),
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'app') {
                e.target.style.background = styles.tabHover.background;
                e.target.style.color = styles.tabHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'app') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#64748b';
              }
            }}
          >
            <FiDatabase style={{ fontSize: '1rem' }} />
            App
          </button>
          <button
            onClick={() => setActiveTab('components')}
            style={{
              ...styles.tab,
              ...(activeTab === 'components' ? styles.tabActive : {}),
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'components') {
                e.target.style.background = styles.tabHover.background;
                e.target.style.color = styles.tabHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'components') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#64748b';
              }
            }}
          >
            <FiSettings style={{ fontSize: '1rem' }} />
            Components
          </button>
          <button
            onClick={() => setActiveTab('public')}
            style={{
              ...styles.tab,
              ...(activeTab === 'public' ? styles.tabActive : {}),
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'public') {
                e.target.style.background = styles.tabHover.background;
                e.target.style.color = styles.tabHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'public') {
                e.target.style.background = 'transparent';
                e.target.style.color = '#64748b';
              }
            }}
          >
            <FiFolder style={{ fontSize: '1rem' }} />
            Public
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.fileList}>
          {currentData && currentData.items ? (
            renderFileTree(currentData.items)
          ) : (
            <div style={styles.emptyState}>
              <FiFolder style={styles.emptyIcon} />
              <h3 style={styles.emptyTitle}>No files found</h3>
              <p style={styles.emptyText}>
                {searchTerm ? 'Try adjusting your search terms' : 'Select a tab to view files'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .file-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .file-list::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .file-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .file-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
} 