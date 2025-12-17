import React, { useState, useEffect } from 'react';
import ApplicationModal from './ApplicationModal';
import Button from '../ui/Button';
import { applicationService } from '../../services/applicationService';

const ApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter((app) =>
        app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phoneNumber.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const loadApplications = async () => {
    try {
      const data = await applicationService.getApplications();
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
    }
  };

  const handleView = (app) => {
    setSelectedApplication(app);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = (app) => {
    setSelectedApplication(app);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationService.deleteApplication(appId);
        loadApplications();
      } catch (error) {
        console.error('Failed to delete application:', error);
      }
    }
  };

  const handleCreate = () => {
    setSelectedApplication(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleModalSave = async (data) => {
    try {
      if (modalMode === 'create') {
        await applicationService.createApplication(data);
      } else if (modalMode === 'edit') {
        await applicationService.updateApplication(selectedApplication.id, data);
      }
      loadApplications();
      handleModalClose();
    } catch (error) {
      console.error('Failed to save application:', error);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      approved: { background: '#d1fae5', color: '#065f46' },
      pending: { background: '#fef3c7', color: '#92400e' },
      under_review: { background: '#dbeafe', color: '#1e40af' },
      rejected: { background: '#fee2e2', color: '#991b1b' },
    };
    return styles[status] || {};
  };

  const getStatusLabel = (status) => {
    const labels = {
      approved: 'Approved',
      pending: 'Pending',
      under_review: 'Under Review',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Loan Applications</h1>
          <p style={styles.subtitle}>Manage and review all loan applications</p>
        </div>
        <div style={styles.headerActions}>
          <Button variant="secondary">⬇️ Export</Button>
          <Button variant="primary" onClick={handleCreate}>➕ New Application</Button>
        </div>
      </div>

      <div style={styles.filtersCard}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, ID, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={styles.clearButton}>✕</button>
          )}
        </div>

        <div style={styles.filterGroup}>
          <span style={styles.filterIcon}>🔽</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total</span>
          <span style={styles.statValue}>{applications.length}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Showing</span>
          <span style={styles.statValue}>{filteredApplications.length}</span>
        </div>
      </div>

      <div style={styles.tableCard}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Application ID</th>
                <th style={styles.th}>Customer Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Loan Amount</th>
                <th style={styles.th}>Tenure</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr><td colSpan="8" style={styles.noData}>No applications found</td></tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} style={styles.tableRow}>
                    <td style={styles.td}><strong>{app.applicationId}</strong></td>
                    <td style={styles.td}>{app.customerName}</td>
                    <td style={styles.td}>{app.phoneNumber}</td>
                    <td style={styles.td}><strong>₹{app.loanAmount.toLocaleString()}</strong></td>
                    <td style={styles.td}>{app.tenure} months</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, ...getStatusStyle(app.status) }}>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>
                    <td style={styles.td}>{app.submittedDate}</td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button onClick={() => handleView(app)} style={styles.actionButton} title="View">👁️</button>
                        <button onClick={() => handleEdit(app)} style={styles.actionButton} title="Edit">✏️</button>
                        <button onClick={() => handleDelete(app.id)} style={{ ...styles.actionButton, color: '#ef4444' }} title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ApplicationModal
          application={selectedApplication}
          mode={modalMode}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1400px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: 'var(--text-secondary)' },
  headerActions: { display: 'flex', gap: '12px' },
  filtersCard: { background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' },
  searchBox: { flex: '1', minWidth: '300px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' },
  searchIcon: { fontSize: '20px' },
  searchInput: { flex: 1, border: 'none', background: 'transparent', fontSize: '14px', color: 'var(--text-primary)', outline: 'none' },
  clearButton: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px', display: 'flex', alignItems: 'center', fontSize: '16px' },
  filterGroup: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' },
  filterIcon: { fontSize: '16px' },
  select: { border: 'none', background: 'transparent', fontSize: '14px', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', minWidth: '150px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '20px' },
  statItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' },
  statValue: { fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' },
  tableCard: { background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeaderRow: { borderBottom: '2px solid var(--border-color)' },
  th: { textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', whiteSpace: 'nowrap' },
  tableRow: { borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' },
  td: { padding: '16px 12px', fontSize: '14px', color: 'var(--text-primary)', whiteSpace: 'nowrap' },
  statusBadge: { padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  actionButtons: { display: 'flex', gap: '8px' },
  actionButton: { padding: '6px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: '16px' },
  noData: { textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' },
};

export default ApplicationsScreen;