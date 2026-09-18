'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaUser, 
  FaLock, 
  FaSignOutAlt, 
  FaSearch, 
  FaFilePdf, 
  FaDownload, 
  FaEye, 
  FaTrash, 
  FaSync, 
  FaEnvelope, 
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

// Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'admin@maydiv.com',
  password: 'Maydiv@2026'
};

export default function ResumesDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    setMounted(true);
    try {
      const savedAuth = localStorage.getItem('maydiv_resume_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        fetchApplications();
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const inputUser = usernameInput.trim().toLowerCase();
    if (
      (inputUser === ADMIN_CREDENTIALS.username || inputUser === ADMIN_CREDENTIALS.email) &&
      passwordInput === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('maydiv_resume_auth', 'true');
      } catch (e) {}
      fetchApplications();
    } else {
      setLoginError('Invalid username or password. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('maydiv_resume_auth');
    } catch (e) {}
    setUsernameInput('');
    setPasswordInput('');
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/resumes');
      const data = await res.json();
      if (data.success) {
        setApplications(data.data || []);
      } else {
        setActionMessage({ type: 'error', text: data.error || 'Failed to fetch data' });
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: 'Error connecting to server database.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete application #${id} from ${name}?`)) {
      return;
    }

    setDeleteLoadingId(id);
    try {
      const res = await fetch(`/api/admin/resumes?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.filter(app => app.id !== id));
        setActionMessage({ type: 'success', text: `Application #${id} deleted successfully.` });
        setTimeout(() => setActionMessage({ type: '', text: '' }), 4000);
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting application');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    const q = searchQuery.toLowerCase();
    return (
      (app.name && app.name.toLowerCase().includes(q)) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      (app.message && app.message.toLowerCase().includes(q)) ||
      (app.resume_file && app.resume_file.toLowerCase().includes(q))
    );
  });

  const getViewUrl = (id) => `/api/admin/resumes/view?id=${id}`;
  const getDownloadUrl = (id) => `/api/admin/resumes/view?id=${id}&download=true`;

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#090a0f',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', Roboto, sans-serif"
      }}>
        <div style={{ textAlign: 'center', color: '#8892b0' }}>Loading Resume Portal...</div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b0c10 0%, #1f2833 50%, #0b0c10 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: '#fff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(20, 24, 33, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Image src="/logo.png" alt="MayDiv Logo" width={160} height={52} quality={100} unoptimized />
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginTop: '1.2rem',
              marginBottom: '0.4rem',
              background: 'linear-gradient(90deg, #FF3BFF, #ECBFBF, #5C24FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Resume Portal
            </h2>
            <p style={{ color: '#8892b0', fontSize: '0.85rem' }}>Login to view candidate applications & resumes</p>
          </div>

          {loginError && (
            <div style={{
              background: 'rgba(255, 71, 87, 0.15)',
              border: '1px solid #ff4757',
              color: '#ff4757',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaExclamationTriangle /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#ccd6f6', marginBottom: '0.4rem' }}>
                Username / Email
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
                gap: '0.8rem'
              }}>
                <FaUser style={{ color: '#FF3BFF' }} />
                <input
                  type="text"
                  placeholder="admin or admin@maydiv.com"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    outline: 'none',
                    width: '100%',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#ccd6f6', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
                gap: '0.8rem'
              }}>
                <FaLock style={{ color: '#FF3BFF' }} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    outline: 'none',
                    width: '100%',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                background: 'linear-gradient(90deg, #FF3BFF, #5C24FF)',
                border: 'none',
                color: '#fff',
                padding: '0.85rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 59, 255, 0.3)'
              }}
            >
              Sign In
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            MayDiv Digital Agency • Secure Portal
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div style={{
      minHeight: '100vh',
      background: '#090a0f',
      color: '#fff',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      paddingBottom: '3rem'
    }}>
      {/* Top Navbar */}
      <header style={{
        background: 'rgba(15, 18, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/">
            <Image src="/logo.png" alt="MayDiv Logo" width={140} height={45} quality={100} unoptimized />
          </Link>
          <span style={{
            background: 'linear-gradient(90deg, #FF3BFF, #5C24FF)',
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ADMIN PORTAL
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={fetchApplications}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ccd6f6',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <FaSync />
            Refresh
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 71, 87, 0.15)',
              border: '1px solid #ff4757',
              color: '#ff4757',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
        {/* Title & Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              margin: 0,
              background: 'linear-gradient(90deg, #fff, #a5b4fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Career Applications & Resumes
            </h1>
            <p style={{ color: '#8892b0', margin: '0.4rem 0 0 0', fontSize: '0.95rem' }}>
              Manage all incoming applicant submissions and download resumes.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '0.8rem 1.4rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#FF3BFF' }}>
                {applications.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8892b0', textTransform: 'uppercase' }}>
                Total Applicants
              </div>
            </div>
          </div>
        </div>

        {/* Action Status Notification */}
        {actionMessage.text && (
          <div style={{
            background: actionMessage.type === 'success' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 71, 87, 0.15)',
            border: actionMessage.type === 'success' ? '1px solid #2ed573' : '1px solid #ff4757',
            color: actionMessage.type === 'success' ? '#2ed573' : '#ff4757',
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem'
          }}>
            {actionMessage.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
            {actionMessage.text}
          </div>
        )}

        {/* Search Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '0.8rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          marginBottom: '1.5rem'
        }}>
          <FaSearch style={{ color: '#8892b0' }} />
          <input
            type="text"
            placeholder="Search by candidate name, email, message, or file name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8892b0',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Applications Data Table */}
        <div style={{
          background: 'rgba(15, 18, 25, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#8892b0',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <th style={{ padding: '1rem 1.2rem', width: '60px' }}>ID</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Candidate</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Message / Note</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Applied At</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Resume File</th>
                  <th style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#8892b0' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⏳</div>
                      <div>Loading applications from database...</div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#8892b0' }}>
                      {searchQuery ? 'No applicants match your search query.' : 'No applications received yet.'}
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const isDeleting = deleteLoadingId === app.id;

                    return (
                      <tr 
                        key={app.id} 
                        style={{ 
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          transition: 'background 0.2s ease',
                          opacity: isDeleting ? 0.5 : 1
                        }}
                      >
                        <td style={{ padding: '1.2rem', color: '#a5b4fc', fontWeight: '700' }}>
                          #{app.id}
                        </td>
                        <td style={{ padding: '1.2rem' }}>
                          <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>
                            {app.name}
                          </div>
                          <a 
                            href={`mailto:${app.email}`} 
                            style={{ 
                              color: '#8892b0', 
                              fontSize: '0.82rem', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.3rem',
                              marginTop: '0.2rem',
                              textDecoration: 'none'
                            }}
                          >
                            <FaEnvelope style={{ color: '#FF3BFF', fontSize: '0.75rem' }} /> {app.email}
                          </a>
                        </td>
                        <td style={{ padding: '1.2rem', maxWidth: '300px' }}>
                          <div style={{ 
                            color: '#cbd5e1', 
                            fontSize: '0.88rem',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.4',
                            maxHeight: '80px',
                            overflowY: 'auto'
                          }}>
                            {app.message || '—'}
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem', color: '#8892b0', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <FaClock style={{ color: '#64748b' }} />
                            {app.applied_at ? new Date(app.applied_at).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            }) : '—'}
                          </div>
                        </td>
                        <td style={{ padding: '1.2rem' }}>
                          {app.resume_file && app.resume_file !== 'No file uploaded' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                              <FaFilePdf style={{ color: '#f43f5e', fontSize: '1.1rem' }} />
                              <span style={{ 
                                fontSize: '0.82rem', 
                                maxWidth: '180px', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                              }} title={app.resume_file}>
                                {app.resume_file}
                              </span>
                            </div>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '0.82rem' }}>No file</span>
                          )}
                        </td>
                        <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                            {app.resume_file && app.resume_file !== 'No file uploaded' ? (
                              <>
                                <a
                                  href={getViewUrl(app.id)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    color: '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    cursor: 'pointer'
                                  }}
                                  title="View Resume in New Tab"
                                >
                                  <FaEye /> View
                                </a>
                                <a
                                  href={getDownloadUrl(app.id)}
                                  download
                                  style={{
                                    background: 'rgba(46, 213, 115, 0.15)',
                                    color: '#2ed573',
                                    border: '1px solid rgba(46, 213, 115, 0.4)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    cursor: 'pointer'
                                  }}
                                  title="Download Resume"
                                >
                                  <FaDownload /> Download
                                </a>
                              </>
                            ) : null}

                            <button
                              onClick={() => handleDelete(app.id, app.name)}
                              disabled={isDeleting}
                              style={{
                                background: 'rgba(255, 71, 87, 0.1)',
                                color: '#ff4757',
                                border: '1px solid rgba(255, 71, 87, 0.3)',
                                padding: '0.4rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                              title="Delete Application"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
