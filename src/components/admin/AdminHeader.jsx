'use client';

import { FiUsers, FiRefreshCw, FiLogOut, FiShield, FiTrendingUp, FiDatabase } from 'react-icons/fi';

const styles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '200px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
  },
  floatingElement1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '100px',
    height: '100px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    filter: 'blur(20px)',
    animation: 'float 8s ease-in-out infinite',
  },
  floatingElement2: {
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: '80px',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    filter: 'blur(15px)',
    animation: 'float 10s ease-in-out infinite reverse',
  },
  floatingElement3: {
    position: 'absolute',
    bottom: '15%',
    left: '20%',
    width: '120px',
    height: '120px',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '50%',
    filter: 'blur(25px)',
    animation: 'float 12s ease-in-out infinite',
  },
  mainContent: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  headerFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '2rem 0',
  },
  titleSection: {
    flex: 1,
    marginBottom: '1.5rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  logoBox: {
    width: '64px',
    height: '64px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  titleText: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.025em',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  statusText: {
    color: '#d1fae5',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  description: {
    color: '#dbeafe',
    fontSize: '1.125rem',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0.5rem 0',
  },
  featuresContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '1.5rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  featureIcon: {
    color: '#bfdbfe',
  },
  featureText: {
    color: '#dbeafe',
    fontSize: '0.875rem',
  },
  actionsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  userCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '1rem 1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  userContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  welcomeText: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '600',
    margin: 0,
  },
  username: {
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    margin: 0,
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  refreshButton: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  logoutButton: {
    position: 'relative',
    background: 'linear-gradient(135deg, #ef4444, #ec4899)',
    border: 'none',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  animatedBorder: {
    position: 'relative',
    height: '4px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    marginTop: '1rem',
  },
  borderAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea)',
    backgroundSize: '300% 300%',
    animation: 'gradientShift 3s ease infinite',
    borderRadius: '2px',
  },
  iconStyle: {
    fontSize: '1.25rem',
  },
  smallIconStyle: {
    fontSize: '1rem',
  },
};

export default function AdminHeader({ user, onRefresh, onLogout }) {
  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={styles.floatingElement1} />
      <div style={styles.floatingElement2} />
      <div style={styles.floatingElement3} />

      {/* Overlay */}
      <div style={styles.overlay} />

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.headerFlex}>
          
          {/* Left Section - Title and Description */}
          <div style={styles.titleSection}>
            {/* Logo and Title */}
            <div style={styles.logoContainer}>
              <div style={styles.logoBox}>
                <FiDatabase style={{ ...styles.iconStyle, color: 'white' }} />
              </div>
              <div>
                <h1 style={styles.titleText}>Maydiv Admin</h1>
                <div style={styles.statusContainer}>
                  <div style={styles.statusDot} />
                  <span style={styles.statusText}>Dashboard Active</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p style={styles.description}>
              Advanced Code Management & Analytics Platform
            </p>
            
            {/* Features */}
            <div style={styles.featuresContainer}>
              <div style={styles.featureItem}>
                <FiShield style={styles.featureIcon} />
                <span style={styles.featureText}>Secure Access</span>
              </div>
              <div style={styles.featureItem}>
                <FiTrendingUp style={{ ...styles.featureIcon, color: '#86efac' }} />
                <span style={{ ...styles.featureText, color: '#d1fae5' }}>Real-time Updates</span>
              </div>
              <div style={styles.featureItem}>
                <FiDatabase style={{ ...styles.featureIcon, color: '#c4b5fd' }} />
                <span style={{ ...styles.featureText, color: '#e9d5ff' }}>Code Analytics</span>
              </div>
            </div>
          </div>

          {/* Right Section - User Info and Actions */}
          <div style={styles.actionsSection}>
            
            {/* User Info Card */}
            {user && (
              <div style={styles.userCard}>
                <div style={styles.userContent}>
                  <div style={styles.userAvatar}>
                    <FiUsers style={{ color: 'white', fontSize: '1.25rem' }} />
                  </div>
                  <div style={styles.userInfo}>
                    <p style={styles.welcomeText}>Welcome back,</p>
                    <p style={styles.username}>{user.username}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={styles.buttonsContainer}>
              <button
                onClick={onRefresh}
                style={styles.refreshButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <FiRefreshCw style={styles.smallIconStyle} />
                Refresh
              </button>

              <button
                onClick={onLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'linear-gradient(135deg, #dc2626, #db2777)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(135deg, #ef4444, #ec4899)';
                }}
              >
                <FiLogOut style={styles.smallIconStyle} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Animated Bottom Border */}
        <div style={styles.animatedBorder}>
          <div style={styles.borderAnimation} />
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
} 