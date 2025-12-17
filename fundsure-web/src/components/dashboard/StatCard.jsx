import React from 'react';

const StatCard = ({ icon, title, value, change, changeType = 'increase' }) => {
  const isIncrease = changeType === 'increase';
  
  return (
    <div style={styles.card}>
      <div style={styles.iconWrapper}>
        <span style={styles.iconText}>{icon}</span>
      </div>
      
      <div style={styles.content}>
        <p style={styles.title}>{title}</p>
        <h3 style={styles.value}>{value}</h3>
        
        {change && (
          <div style={{
            ...styles.change,
            color: isIncrease ? '#10b981' : '#ef4444',
          }}>
            <span>{isIncrease ? '📈' : '📉'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: 'rgba(79, 70, 229, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: '24px',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  },
  value: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
  },
  change: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: '500',
  },
};

export default StatCard;