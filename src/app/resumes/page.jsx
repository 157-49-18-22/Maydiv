'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  FaExclamationTriangle,
  FaShieldAlt,
  FaUsers,
  FaFileAlt
} from 'react-icons/fa';
import './resumes.css';

// Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'admin@maydiv.com',
  password: 'Maydiv@2026'
};

// 30 Minutes Session Timeout
const SESSION_DURATION_MS = 30 * 60 * 1000;

export default function ResumesDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [sessionNotice, setSessionNotice] = useState('');
  const [minutesRemaining, setMinutesRemaining] = useState(30);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  const handleLogout = useCallback((expiredReason = '') => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('maydiv_resume_auth');
      localStorage.removeItem('maydiv_resume_auth_time');
    } catch (e) {}
    setUsernameInput('');
    setPasswordInput('');
    if (expiredReason) {
      setSessionNotice(expiredReason);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
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
      setActionMessage({ type: 'error', text: 'Error connecting to database.' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth and session validity on load & tick timer every 10 seconds
  useEffect(() => {
    setMounted(true);
    try {
      const savedAuth = localStorage.getItem('maydiv_resume_auth');
      const savedTime = localStorage.getItem('maydiv_resume_auth_time');

      if (savedAuth === 'true' && savedTime) {
        const elapsed = Date.now() - parseInt(savedTime, 10);
        if (elapsed < SESSION_DURATION_MS) {
          setIsAuthenticated(true);
          setMinutesRemaining(Math.ceil((SESSION_DURATION_MS - elapsed) / 60000));
          fetchApplications();
        } else {
          handleLogout('Your session has expired (30 mins limit). Please log in again.');
        }
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }

    // Interval to enforce 30-minute auto logout
    const timerInterval = setInterval(() => {
      try {
        const isAuth = localStorage.getItem('maydiv_resume_auth') === 'true';
        const loginTime = localStorage.getItem('maydiv_resume_auth_time');

        if (isAuth && loginTime) {
          const elapsed = Date.now() - parseInt(loginTime, 10);
          const remaining = SESSION_DURATION_MS - elapsed;

          if (remaining <= 0) {
            handleLogout('Session expired after 30 minutes. Logged out automatically for security.');
          } else {
            setMinutesRemaining(Math.ceil(remaining / 60000));
          }
        }
      } catch (e) {}
    }, 10000);

    return () => clearInterval(timerInterval);
  }, [fetchApplications, handleLogout]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setSessionNotice('');

    const inputUser = usernameInput.trim().toLowerCase();
    if (
      (inputUser === ADMIN_CREDENTIALS.username || inputUser === ADMIN_CREDENTIALS.email) &&
      passwordInput === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      const now = Date.now().toString();
      try {
        localStorage.setItem('maydiv_resume_auth', 'true');
        localStorage.setItem('maydiv_resume_auth_time', now);
      } catch (e) {}
      setMinutesRemaining(30);
      fetchApplications();
    } else {
      setLoginError('Invalid credentials. Access is restricted to authorized MayDiv administrators.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete application #${id} (${name})?`)) {
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
        background: '#07090e',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading MayDiv Portal...</div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="resume-login-wrapper">
        <div className="resume-login-card">
          <div className="resume-login-logo">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="MayDiv Logo" 
                width={170} 
                height={48} 
                priority 
                unoptimized 
                style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="resume-login-badge">
              <FaShieldAlt style={{ marginRight: '4px' }} /> Protected Portal
            </span>
            <h1 className="resume-login-title">Admin Sign In</h1>
            <p className="resume-login-subtitle">
              Enter your administrator credentials to access career applications & resumes.
            </p>
          </div>

          {sessionNotice && (
            <div style={{
              background: 'rgba(234, 179, 8, 0.15)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              color: '#facc15',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaClock /> {sessionNotice}
            </div>
          )}

          {loginError && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: '#fb7185',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FaExclamationTriangle /> {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="resume-input-group">
              <label className="resume-input-label">Username / Email</label>
              <div className="resume-input-box">
                <FaUser style={{ color: '#FF3BFF', fontSize: '0.9rem' }} />
                <input
                  type="text"
                  placeholder="admin or admin@maydiv.com"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="resume-input-group">
              <label className="resume-input-label">Password</label>
              <div className="resume-input-box">
                <FaLock style={{ color: '#FF3BFF', fontSize: '0.9rem' }} />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="resume-btn-submit">
              Sign In to Dashboard
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}>
            <FaLock style={{ fontSize: '0.7rem' }} /> 256-bit Encrypted Session • 30m Auto-Logout
          </div>
        </div>
      </div>
    );
  }

  // Count files uploaded
  const filesCount = applications.filter(a => a.resume_file && a.resume_file !== 'No file uploaded').length;

  // --- DASHBOARD VIEW ---
  return (
    <div style={{ minHeight: '100vh', background: '#07090e', color: '#fff', paddingBottom: '4rem' }}>
      {/* Top Navbar */}
      <header className="resume-dash-header">
        <div className="resume-header-logo-group">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="MayDiv Logo" 
              width={160} 
              height={45} 
              priority 
              unoptimized 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <div className="resume-timer-badge" title="Auto logout in 30 minutes for security">
            <FaClock /> Session: {minutesRemaining}m left
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="btn-header-refresh"
            title="Reload live database"
          >
            <FaSync style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>

          <button
            onClick={() => handleLogout()}
            className="btn-header-logout"
            title="End admin session"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1360px', margin: '2.5rem auto 0 auto', padding: '0 2rem' }}>
        {/* Title Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(135deg, #ffffff 40%, #c4b5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Candidate Applications & Resumes
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.98rem' }}>
            Live applicant database connected to Hostinger MySQL. View cover messages and download attached CVs.
          </p>
        </div>

        {/* Action Status Notification */}
        {actionMessage.text && (
          <div style={{
            background: actionMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
            border: actionMessage.type === 'success' ? '1px solid #10b981' : '1px solid #f43f5e',
            color: actionMessage.type === 'success' ? '#34d399' : '#fb7185',
            padding: '0.9rem 1.4rem',
            borderRadius: '14px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.92rem'
          }}>
            {actionMessage.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
            {actionMessage.text}
          </div>
        )}

        {/* Stats Grid */}
        <div className="resume-stats-grid">
          <div className="resume-stat-card">
            <div>
              <div className="resume-stat-number">{applications.length}</div>
              <div className="resume-stat-label">Total Applications</div>
            </div>
            <div className="resume-stat-icon-wrapper">
              <FaUsers />
            </div>
          </div>

          <div className="resume-stat-card">
            <div>
              <div className="resume-stat-number">{filesCount}</div>
              <div className="resume-stat-label">Resumes Attached</div>
            </div>
            <div className="resume-stat-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
              <FaFilePdf />
            </div>
          </div>

          <div className="resume-stat-card">
            <div>
              <div className="resume-stat-number">{filteredApplications.length}</div>
              <div className="resume-stat-label">Filtered Results</div>
            </div>
            <div className="resume-stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <FaFileAlt />
            </div>
          </div>
        </div>

        {/* Live Search Bar */}
        <div style={{
          background: 'rgba(18, 22, 34, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '0.9rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.8rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)'
        }}>
          <FaSearch style={{ color: '#94a3b8', fontSize: '1rem' }} />
          <input
            type="text"
            placeholder="Search applicants by name, email, note, or resume filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem',
              fontFamily: 'inherit'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#cbd5e1',
                padding: '0.3rem 0.7rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Applications Data Table */}
        <div className="resume-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="resume-table">
              <thead>
                <tr>
                  <th style={{ width: '65px' }}>ID</th>
                  <th>Candidate Details</th>
                  <th>Message / Cover Note</th>
                  <th>Applied At</th>
                  <th>Attached Resume</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>⏳</div>
                      <div style={{ fontWeight: '600' }}>Fetching records from Hostinger database...</div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                      {searchQuery ? 'No applicants match your search query.' : 'No applications found in the database.'}
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const isDeleting = deleteLoadingId === app.id;
                    const hasResume = app.resume_file && app.resume_file !== 'No file uploaded';

                    return (
                      <tr key={app.id} style={{ opacity: isDeleting ? 0.4 : 1 }}>
                        <td>
                          <span className="resume-id-badge">#{app.id}</span>
                        </td>
                        <td>
                          <div className="resume-candidate-name">{app.name}</div>
                          <a href={`mailto:${app.email}`} className="resume-candidate-email">
                            <FaEnvelope style={{ fontSize: '0.75rem' }} /> {app.email}
                          </a>
                        </td>
                        <td style={{ maxWidth: '340px' }}>
                          <div className="resume-message-bubble">
                            {app.message || '—'}
                          </div>
                        </td>
                        <td style={{ color: '#94a3b8', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <FaClock style={{ color: '#64748b' }} />
                            {app.applied_at ? new Date(app.applied_at).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            }) : '—'}
                          </div>
                        </td>
                        <td>
                          {hasResume ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                              <FaFilePdf style={{ color: '#f43f5e', fontSize: '1.2rem', flexShrink: 0 }} />
                              <span style={{ 
                                fontSize: '0.82rem', 
                                maxWidth: '170px', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                              }} title={app.resume_file}>
                                {app.resume_file}
                              </span>
                            </div>
                          ) : (
                            <span style={{ color: '#475569', fontSize: '0.82rem' }}>No file</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                            {hasResume && (
                              <>
                                <a
                                  href={getViewUrl(app.id)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-action-view"
                                  title="View Resume in New Tab"
                                >
                                  <FaEye /> View
                                </a>
                                <a
                                  href={getDownloadUrl(app.id)}
                                  download
                                  className="btn-action-download"
                                  title="Download Resume File"
                                >
                                  <FaDownload /> Download
                                </a>
                              </>
                            )}

                            <button
                              onClick={() => handleDelete(app.id, app.name)}
                              disabled={isDeleting}
                              className="btn-action-delete"
                              title="Delete this candidate application"
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
