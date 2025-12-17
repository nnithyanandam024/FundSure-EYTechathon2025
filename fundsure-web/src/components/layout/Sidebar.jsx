import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isCollapsed }) => {
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/dashboard/applications', icon: '📄', label: 'Applications' },
    { path: '/dashboard/customers', icon: '👥', label: 'Customers' },
    { path: '/dashboard/loans', icon: '💰', label: 'Loans' },
    { path: '/dashboard/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div style={{
      ...styles.sidebar,
      width: isCollapsed ? '80px' : '250px',
    }}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>💰</span>
        {!isCollapsed && <span style={styles.logoText}>FundSure</span>}
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            {!isCollapsed && <span style={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    background: 'var(--bg-primary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '24px',
    borderBottom: '1px solid var(--border-color)',
  },
  logoIcon: {
    fontSize: '32px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
  },
  nav: {
    flex: 1,
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  navItemActive: {
    color: '#4f46e5',
    background: 'rgba(79, 70, 229, 0.1)',
    borderLeftColor: '#4f46e5',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
  },
  navLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default Sidebar;