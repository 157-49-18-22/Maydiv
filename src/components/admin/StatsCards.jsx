'use client';

import { FiCode, FiBarChart2, FiFolder, FiFile, FiTrendingUp, FiActivity, FiZap, FiDatabase } from 'react-icons/fi';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  card: {
    position: 'relative',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 3s ease infinite',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  iconContainer: {
    position: 'relative',
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  iconGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    opacity: 0.3,
    filter: 'blur(8px)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  icon: {
    fontSize: '1.75rem',
    color: 'white',
    zIndex: 1,
    position: 'relative',
  },
  textContent: {
    flex: 1,
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b',
    margin: '0 0 0.5rem 0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  value: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0',
    lineHeight: 1,
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginTop: '0.5rem',
  },
  trendIcon: {
    fontSize: '0.875rem',
  },
  trendText: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  skeletonCard: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
  },
  skeletonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  skeletonIcon: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%)',
    backgroundSize: '200% 100%',
    borderRadius: '16px',
    animation: 'shimmer 1.5s ease-in-out infinite',
  },
  skeletonText: {
    flex: 1,
  },
  skeletonLabel: {
    width: '80px',
    height: '16px',
    background: 'linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%)',
    backgroundSize: '200% 100%',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    animation: 'shimmer 1.5s ease-in-out infinite',
  },
  skeletonValue: {
    width: '120px',
    height: '32px',
    background: 'linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%)',
    backgroundSize: '200% 100%',
    borderRadius: '4px',
    animation: 'shimmer 1.5s ease-in-out infinite',
  },
  // Color schemes for different cards
  colorSchemes: {
    files: {
      iconBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      iconGlow: '#3b82f6',
      trendColor: '#10b981',
    },
    lines: {
      iconBg: 'linear-gradient(135deg, #10b981, #059669)',
      iconGlow: '#10b981',
      trendColor: '#3b82f6',
    },
    app: {
      iconBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      iconGlow: '#8b5cf6',
      trendColor: '#f59e0b',
    },
    components: {
      iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      iconGlow: '#f59e0b',
      trendColor: '#ec4899',
    },
  },
};

export default function StatsCards({ stats }) {
  const statsData = [
    {
      icon: FiCode,
      label: 'Total Files',
      value: stats?.summary?.totalFiles || 0,
      trend: '+12%',
      trendDirection: 'up',
      colorScheme: 'files',
    },
    {
      icon: FiBarChart2,
      label: 'Total Lines',
      value: (stats?.summary?.totalLines || 0).toLocaleString(),
      trend: '+8%',
      trendDirection: 'up',
      colorScheme: 'lines',
    },
    {
      icon: FiFolder,
      label: 'App Files',
      value: stats?.summary?.appFiles || 0,
      trend: '+15%',
      trendDirection: 'up',
      colorScheme: 'app',
    },
    {
      icon: FiFile,
      label: 'Component Files',
      value: stats?.summary?.componentFiles || 0,
      trend: '+5%',
      trendDirection: 'up',
      colorScheme: 'components',
    },
  ];

  if (!stats) {
    return (
      <div style={styles.container}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={styles.skeletonCard}>
            <div style={styles.skeletonContent}>
              <div style={styles.skeletonIcon} />
              <div style={styles.skeletonText}>
                <div style={styles.skeletonLabel} />
                <div style={styles.skeletonValue} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {statsData.map((stat, index) => (
        <div
          key={index}
          style={styles.card}
          onMouseEnter={(e) => {
            e.target.style.transform = styles.cardHover.transform;
            e.target.style.boxShadow = styles.cardHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = styles.card.boxShadow;
          }}
        >
          {/* Animated Border */}
          <div style={styles.cardBorder} />
          
          <div style={styles.cardContent}>
            {/* Icon Container */}
            <div style={styles.iconContainer}>
              <div 
                style={{
                  ...styles.iconGlow,
                  background: styles.colorSchemes[stat.colorScheme].iconGlow,
                }}
              />
              <div style={{
                ...styles.iconContainer,
                background: styles.colorSchemes[stat.colorScheme].iconBg,
                position: 'relative',
                width: '60px',
                height: '60px',
              }}>
                <stat.icon style={styles.icon} />
              </div>
            </div>

            {/* Text Content */}
            <div style={styles.textContent}>
              <p style={styles.label}>{stat.label}</p>
              <h3 style={styles.value}>{stat.value}</h3>
              <div style={styles.trend}>
                <FiTrendingUp 
                  style={{
                    ...styles.trendIcon,
                    color: styles.colorSchemes[stat.colorScheme].trendColor,
                  }}
                />
                <span style={{
                  ...styles.trendText,
                  color: styles.colorSchemes[stat.colorScheme].trendColor,
                }}>
                  {stat.trend} from last month
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 