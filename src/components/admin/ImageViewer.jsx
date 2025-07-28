'use client';

import { FiImage, FiDownload, FiMaximize2, FiX, FiFolder, FiFile, FiBarChart2 } from 'react-icons/fi';

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
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerIcon: {
    color: '#f59e0b',
    fontSize: '1.5rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
  },
  fullscreenButton: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
  },
  buttonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  fileInfo: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid #f59e0b',
  },
  fileInfoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  fileInfoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#92400e',
  },
  fileInfoIcon: {
    fontSize: '1rem',
    color: '#f59e0b',
  },
  content: {
    flex: 1,
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '16px',
    border: '2px dashed #e2e8f0',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
  },
  imageHover: {
    transform: 'scale(1.02)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#6b7280',
    textAlign: 'center',
    padding: '2rem',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    color: '#d1d5db',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#374151',
  },
  emptyText: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    maxWidth: '400px',
  },
  errorState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#ef4444',
    textAlign: 'center',
    padding: '2rem',
  },
  errorIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#fca5a5',
  },
  errorTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#dc2626',
  },
  errorText: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    maxWidth: '400px',
    color: '#991b1b',
  },
};

export default function ImageViewer({ selectedFile }) {
  const getImageUrl = () => {
    if (!selectedFile) return '';
    
    // For public folder files, the path should already be correct
    // Just ensure we have the proper URL format
    const imageUrl = `/${selectedFile.path}`;
    
    console.log('ImageViewer Debug:', {
      fileName: selectedFile.name,
      filePath: selectedFile.path,
      generatedUrl: imageUrl
    });
    
    return imageUrl;
  };

  const handleDownload = () => {
    if (selectedFile) {
      const link = document.createElement('a');
      link.href = getImageUrl();
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFullscreen = () => {
    if (selectedFile) {
      const imageUrl = getImageUrl();
      window.open(imageUrl, '_blank');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!selectedFile) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h2 style={styles.headerTitle}>
              <FiImage style={styles.headerIcon} />
              Image Viewer
            </h2>
          </div>
        </div>
        <div style={styles.content}>
          <div style={styles.emptyState}>
            <FiImage style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No image selected</h3>
            <p style={styles.emptyText}>
              Select an image file from the explorer to view it here. You can browse through the public folder to find images.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.headerTitle}>
            <FiImage style={styles.headerIcon} />
            {selectedFile.name}
          </h2>
          <div style={styles.actionButtons}>
            <button
              onClick={handleDownload}
              style={styles.downloadButton}
              onMouseEnter={(e) => {
                e.target.style.transform = styles.buttonHover.transform;
                e.target.style.boxShadow = styles.buttonHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <FiDownload style={{ fontSize: '1rem' }} />
              Download
            </button>
            <button
              onClick={handleFullscreen}
              style={styles.fullscreenButton}
              onMouseEnter={(e) => {
                e.target.style.transform = styles.buttonHover.transform;
                e.target.style.boxShadow = styles.buttonHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <FiMaximize2 style={{ fontSize: '1rem' }} />
              Fullscreen
            </button>
          </div>
        </div>
        
        {/* File Information */}
        <div style={styles.fileInfo}>
          <div style={styles.fileInfoGrid}>
            <div style={styles.fileInfoItem}>
              <FiFolder style={styles.fileInfoIcon} />
              <strong>Path:</strong> {selectedFile.path}
            </div>
            <div style={styles.fileInfoItem}>
              <FiFile style={styles.fileInfoIcon} />
              <strong>Type:</strong> {selectedFile.extension}
            </div>
            <div style={styles.fileInfoItem}>
              <FiBarChart2 style={styles.fileInfoIcon} />
              <strong>Size:</strong> {formatFileSize(selectedFile.size)}
            </div>
            <div style={styles.fileInfoItem}>
              <FiImage style={styles.fileInfoIcon} />
              <strong>Format:</strong> {selectedFile.extension.replace('.', '').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img
            src={getImageUrl()}
            alt={selectedFile.name}
            style={styles.image}
            onMouseEnter={(e) => {
              e.target.style.transform = styles.imageHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.display = 'none';
              // Show error state
              const errorDiv = document.createElement('div');
              errorDiv.innerHTML = `
                <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100%;
                  color: #ef4444;
                  text-align: center;
                  padding: 2rem;
                ">
                  <div style="font-size: 3rem; margin-bottom: 1rem; color: #fca5a5;">⚠️</div>
                  <h3 style="font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; color: #dc2626;">
                    Image failed to load
                  </h3>
                  <p style="font-size: 0.875rem; line-height: 1.5; max-width: 400px; color: #991b1b;">
                    Unable to load the image. Please check if the file exists and the path is correct.
                  </p>
                  <p style="font-size: 0.75rem; color: #7f1d1d; margin-top: 1rem;">
                    Path: ${selectedFile.path}<br/>
                    URL: ${getImageUrl()}
                  </p>
                </div>
              `;
              e.target.parentNode.appendChild(errorDiv);
            }}
          />
        </div>
      </div>
    </div>
  );
} 