import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <button onClick={onToggleSidebar} style={styles.iconButton}>
          ☰
        </button>
        <h2 style={styles.title}>Loan Management System</h2>
      </div>

      <div style={styles.right}>
        <button onClick={toggleTheme} style={styles.iconButton} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button style={styles.iconButton} title="Notifications">
          🔔
          <span style={styles.badge}>3</span>
        </button>

        <div style={styles.userMenu}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={styles.userButton}
          >
            <div style={styles.avatar}>
              👤
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user?.name || 'Admin User'}</span>
              <span style={styles.userRole}>{user?.role || 'Administrator'}</span>
            </div>
            <span style={styles.chevron}>▼</span>
          </button>

          {showUserMenu && (
            <div style={styles.dropdown}>
              <button style={styles.dropdownItem}>
                👤 Profile
              </button>
              <button style={styles.dropdownItem} onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '70px',
    background: 'var(--bg-primary)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  iconButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'background 0.2s',
    fontSize: '20px',
  },
  badge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#ef4444',
    color: 'white',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  userMenu: {
    position: 'relative',
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    color: 'var(--text-primary)',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  userRole: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  chevron: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    minWidth: '180px',
    padding: '8px',
    zIndex: 1000,
  },
  dropdownItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s',
    textAlign: 'left',
  },
};

export default Header;