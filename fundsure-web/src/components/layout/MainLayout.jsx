import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={styles.layout}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      <div style={{
        ...styles.main,
        marginLeft: isSidebarCollapsed ? '80px' : '250px',
      }}>
        <Header onToggleSidebar={toggleSidebar} />
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    minHeight: '100vh',
    background: 'var(--bg-secondary)',
  },
  main: {
    transition: 'margin-left 0.3s ease',
  },
  content: {
    padding: '24px',
    minHeight: 'calc(100vh - 70px)',
  },
};

export default MainLayout;