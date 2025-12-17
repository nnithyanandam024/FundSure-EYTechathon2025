import React, { useEffect, useRef } from 'react';
import StatCard from './StatCard';

const DashboardScreen = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  let barChart = null;
  let pieChart = null;

  // Statistics data
  const stats = [
    {
      icon: '📄',
      title: 'Total Applications',
      value: '1,284',
      change: '+12% from last month',
      changeType: 'increase',
    },
    {
      icon: '✅',
      title: 'Approved Loans',
      value: '856',
      change: '+8% from last month',
      changeType: 'increase',
    },
    {
      icon: '⏰',
      title: 'Pending Review',
      value: '142',
      change: '-5% from last month',
      changeType: 'decrease',
    },
    {
      icon: '❌',
      title: 'Rejected',
      value: '286',
      change: '+3% from last month',
      changeType: 'increase',
    },
    {
      icon: '💰',
      title: 'Total Disbursed',
      value: '₹45.2Cr',
      change: '+18% from last month',
      changeType: 'increase',
    },
    {
      icon: '👥',
      title: 'Active Customers',
      value: '3,892',
      change: '+15% from last month',
      changeType: 'increase',
    },
  ];

  // Recent applications
  const recentApplications = [
    { id: 'APP-1245', customer: 'Rajesh Kumar', amount: '₹5,00,000', status: 'Approved', date: '2024-12-15' },
    { id: 'APP-1244', customer: 'Priya Sharma', amount: '₹3,50,000', status: 'Pending', date: '2024-12-15' },
    { id: 'APP-1243', customer: 'Amit Patel', amount: '₹7,00,000', status: 'Under Review', date: '2024-12-14' },
    { id: 'APP-1242', customer: 'Sneha Reddy', amount: '₹2,80,000', status: 'Approved', date: '2024-12-14' },
    { id: 'APP-1241', customer: 'Vikram Singh', amount: '₹6,20,000', status: 'Rejected', date: '2024-12-13' },
  ];

  useEffect(() => {
    // Create Bar Chart
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      
      // Destroy existing chart
      if (barChart) barChart.destroy();

      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Applications',
              data: [95, 110, 125, 140, 132, 148],
              backgroundColor: '#4f46e5',
            },
            {
              label: 'Approved',
              data: [68, 82, 95, 105, 98, 112],
              backgroundColor: '#10b981',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Create Pie Chart
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext('2d');
      
      // Destroy existing chart
      if (pieChart) pieChart.destroy();

      pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Approved', 'Pending', 'Rejected'],
          datasets: [
            {
              data: [856, 142, 286],
              backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      });
    }

    return () => {
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
    };
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      'Approved': { background: '#d1fae5', color: '#065f46' },
      'Pending': { background: '#fef3c7', color: '#92400e' },
      'Under Review': { background: '#dbeafe', color: '#1e40af' },
      'Rejected': { background: '#fee2e2', color: '#991b1b' },
    };
    return styles[status] || {};
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <p style={styles.subtitle}>Welcome back! Here's what's happening with your loan applications.</p>
        </div>
        <button style={styles.refreshButton}>
          📊 View Reports
        </button>
      </div>

      {/* Statistics Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsGrid}>
        {/* Monthly Applications Chart */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Monthly Applications</h3>
          <div style={styles.chartWrapper}>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Application Status Distribution</h3>
          <div style={styles.chartWrapper}>
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h3 style={styles.chartTitle}>Recent Applications</h3>
          <button style={styles.viewAllButton}>View All</button>
        </div>
        
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Application ID</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Loan Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} style={styles.tableRow}>
                  <td style={styles.td}>{app.id}</td>
                  <td style={styles.td}>{app.customer}</td>
                  <td style={styles.td}><strong>{app.amount}</strong></td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, ...getStatusStyle(app.status) }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={styles.td}>{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  chartCard: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '24px',
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '20px',
  },
  chartWrapper: {
    position: 'relative',
    height: '300px',
  },
  tableCard: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '24px',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  viewAllButton: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#4f46e5',
    border: '1px solid #4f46e5',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    borderBottom: '2px solid var(--border-color)',
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
  },
  tableRow: {
    borderBottom: '1px solid var(--border-color)',
  },
  td: {
    padding: '16px 12px',
    fontSize: '14px',
    color: 'var(--text-primary)',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
};

export default DashboardScreen;