'use client';

import { FiFile, FiEdit, FiSave, FiX, FiFolder, FiBarChart2, FiCode, FiDownload, FiCopy, FiMaximize2, FiImage } from 'react-icons/fi';

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
    color: '#10b981',
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
  editButton: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
  },
  saveButton: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
  },
  cancelButton: {
    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
    color: 'white',
  },
  buttonHover: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },
  fileInfo: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid #93c5fd',
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
    color: '#1e40af',
  },
  fileInfoIcon: {
    fontSize: '1rem',
    color: '#3b82f6',
  },
  content: {
    flex: 1,
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  codeEditor: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  editorHeader: {
    background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #4b5563',
  },
  editorTitle: {
    color: '#d1d5db',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  editorControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  controlButton: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
  },
  closeButton: {
    background: '#ef4444',
  },
  minimizeButton: {
    background: '#f59e0b',
  },
  maximizeButton: {
    background: '#10b981',
  },
  textarea: {
    flex: 1,
    minHeight: '600px',
    background: '#1a1a1a',
    color: '#e6e6e6',
    fontFamily: "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
    fontSize: '13px',
    lineHeight: '1.6',
    padding: '1rem',
    border: 'none',
    outline: 'none',
    resize: 'vertical',
    borderRadius: '0 0 12px 12px',
  },
  codeDisplay: {
    flex: 1,
    background: '#1a1a1a',
    borderRadius: '0 0 12px 12px',
    overflow: 'hidden',
  },
  codeContent: {
    padding: '1rem',
    fontFamily: "'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace",
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#e6e6e6',
    overflow: 'auto',
    height: '100%',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    textAlign: 'center',
    color: '#64748b',
  },
  emptyIcon: {
    fontSize: '4rem',
    color: '#cbd5e1',
    marginBottom: '1.5rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#374151',
  },
  emptyText: {
    fontSize: '1rem',
    margin: 0,
    maxWidth: '400px',
    lineHeight: '1.6',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    background: '#2d3748',
    borderBottom: '1px solid #4a5568',
  },
  toolbarButton: {
    padding: '0.25rem 0.5rem',
    background: 'transparent',
    border: '1px solid #4a5568',
    borderRadius: '4px',
    color: '#a0aec0',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  toolbarButtonHover: {
    background: '#4a5568',
    color: '#e2e8f0',
  },
  lineNumbers: {
    display: 'inline-block',
    width: '3rem',
    color: '#6b7280',
    textAlign: 'right',
    paddingRight: '1rem',
    userSelect: 'none',
    borderRight: '1px solid #374151',
    marginRight: '1rem',
  },
  syntaxHighlight: {
    color: '#e6e6e6',
  },
  keyword: {
    color: '#ff79c6',
  },
  string: {
    color: '#f1fa8c',
  },
  comment: {
    color: '#6272a4',
    fontStyle: 'italic',
  },
  function: {
    color: '#50fa7b',
  },
  number: {
    color: '#bd93f9',
  },
};

export default function CodeViewer({ 
  selectedFile, 
  editingFile, 
  editContent, 
  setEditContent, 
  onEditFile, 
  onSaveFile, 
  onCancelEdit 
}) {
  // Simple syntax highlighting function
  const highlightSyntax = (code) => {
    if (!code) return '';
    
    return code
      .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|default|class|extends|super|new|try|catch|finally|throw|break|continue|switch|case|do|with|typeof|instanceof|delete|void|this|true|false|null|undefined|NaN|Infinity)\b/g, '<span style="color: #ff79c6;">$1</span>')
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span style="color: #f1fa8c;">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span style="color: #6272a4; font-style: italic;">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6272a4; font-style: italic;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #bd93f9;">$1</span>')
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span style="color: #50fa7b;">$1</span>(');
  };

  // Add line numbers to code
  const addLineNumbers = (code) => {
    if (!code) return '';
    const lines = code.split('\n');
    return lines.map((line, index) => 
      `<span style="${styles.lineNumbers}">${index + 1}</span>${line}`
    ).join('\n');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.headerTitle}>
            <FiFile style={styles.headerIcon} />
            {selectedFile ? selectedFile.name : 'Select a file to view'}
          </h2>
          
          {selectedFile && !editingFile && (
            <div style={styles.actionButtons}>
              <button
                onClick={onEditFile}
                style={styles.editButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <FiEdit style={{ fontSize: '1rem' }} />
                Edit
              </button>
            </div>
          )}
          
          {editingFile && (
            <div style={styles.actionButtons}>
              <button
                onClick={onSaveFile}
                style={styles.saveButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <FiSave style={{ fontSize: '1rem' }} />
                Save
              </button>
              <button
                onClick={onCancelEdit}
                style={styles.cancelButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.buttonHover.transform;
                  e.target.style.boxShadow = styles.buttonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
              >
                <FiX style={{ fontSize: '1rem' }} />
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {selectedFile && (
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
                <strong>Size:</strong> {selectedFile.size} bytes
              </div>
              <div style={styles.fileInfoItem}>
                <FiCode style={styles.fileInfoIcon} />
                <strong>Lines:</strong> {selectedFile.content?.split('\n').length || 0}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div style={styles.content}>
        {selectedFile ? (
          selectedFile.isImage ? (
            <div style={styles.codeEditor}>
              <div style={styles.editorHeader}>
                <div style={styles.editorTitle}>
                  <FiImage style={{ fontSize: '1rem' }} />
                  {selectedFile.name}
                </div>
                <div style={styles.editorControls}>
                  <button style={{ ...styles.controlButton, ...styles.closeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.minimizeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.maximizeButton }} />
                </div>
              </div>
              <div style={styles.toolbar}>
                <button
                  style={styles.toolbarButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = styles.toolbarButtonHover.background;
                    e.target.style.color = styles.toolbarButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a0aec0';
                  }}
                >
                  <FiDownload style={{ fontSize: '0.75rem' }} />
                  Download
                </button>
                <button
                  style={styles.toolbarButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = styles.toolbarButtonHover.background;
                    e.target.style.color = styles.toolbarButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a0aec0';
                  }}
                >
                  <FiMaximize2 style={{ fontSize: '0.75rem' }} />
                  Fullscreen
                </button>
              </div>
              <div style={{
                ...styles.codeDisplay,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <img 
                  src={`/${selectedFile.path}`} 
                  alt={selectedFile.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </div>
          ) : editingFile ? (
            <div style={styles.codeEditor}>
              <div style={styles.editorHeader}>
                <div style={styles.editorTitle}>
                  <FiEdit style={{ fontSize: '1rem' }} />
                  Editing {selectedFile.name}
                </div>
                <div style={styles.editorControls}>
                  <button style={{ ...styles.controlButton, ...styles.closeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.minimizeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.maximizeButton }} />
                </div>
              </div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={styles.textarea}
                placeholder="Edit file content..."
              />
            </div>
          ) : (
            <div style={styles.codeEditor}>
              <div style={styles.editorHeader}>
                <div style={styles.editorTitle}>
                  <FiFile style={{ fontSize: '1rem' }} />
                  {selectedFile.name}
                </div>
                <div style={styles.editorControls}>
                  <button style={{ ...styles.controlButton, ...styles.closeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.minimizeButton }} />
                  <button style={{ ...styles.controlButton, ...styles.maximizeButton }} />
                </div>
              </div>
              <div style={styles.toolbar}>
                <button
                  style={styles.toolbarButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = styles.toolbarButtonHover.background;
                    e.target.style.color = styles.toolbarButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a0aec0';
                  }}
                >
                  <FiCopy style={{ fontSize: '0.75rem' }} />
                  Copy
                </button>
                <button
                  style={styles.toolbarButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = styles.toolbarButtonHover.background;
                    e.target.style.color = styles.toolbarButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a0aec0';
                  }}
                >
                  <FiDownload style={{ fontSize: '0.75rem' }} />
                  Download
                </button>
                <button
                  style={styles.toolbarButton}
                  onMouseEnter={(e) => {
                    e.target.style.background = styles.toolbarButtonHover.background;
                    e.target.style.color = styles.toolbarButtonHover.color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#a0aec0';
                  }}
                >
                  <FiMaximize2 style={{ fontSize: '0.75rem' }} />
                  Fullscreen
                </button>
              </div>
              <div style={styles.codeDisplay}>
                <pre style={styles.codeContent}>
                  <code 
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSyntax(addLineNumbers(selectedFile.content)) 
                    }}
                  />
                </pre>
              </div>
            </div>
          )
        ) : (
          <div style={styles.emptyState}>
            <FiFile style={styles.emptyIcon} />
            <h3 style={styles.emptyTitle}>No file selected</h3>
            <p style={styles.emptyText}>
              Select a file from the explorer to view its content. You can browse through the app, components, and public folders to find the files you want to examine.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 