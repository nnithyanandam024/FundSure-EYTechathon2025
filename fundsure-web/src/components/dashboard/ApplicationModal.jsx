import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ApplicationModal = ({ application, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    applicationId: '',
    customerName: '',
    email: '',
    phoneNumber: '',
    loanAmount: '',
    tenure: '',
    purpose: '',
    creditScore: '',
    status: 'pending',
  });

  useEffect(() => {
    if (application) {
      setFormData(application);
    }
  }, [application]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isReadOnly = mode === 'view';

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {mode === 'view' ? 'Application Details' : mode === 'edit' ? 'Edit Application' : 'New Application'}
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <Input
              label="Application ID"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              disabled={mode !== 'create'}
              required
            />

            <Input
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />

            <Input
              label="Loan Amount (₹)"
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />

            <Input
              label="Tenure (months)"
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              disabled={isReadOnly}
              required
            />

            <Input
              label="Credit Score"
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              disabled={isReadOnly}
            />

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isReadOnly}
                style={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Loan Purpose</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                disabled={isReadOnly}
                style={styles.textarea}
                rows="3"
              />
            </div>
          </div>

          {!isReadOnly && (
            <div style={styles.footer}>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {mode === 'create' ? 'Create Application' : 'Save Changes'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'var(--bg-primary)',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
  },
  form: {
    padding: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  select: {
    padding: '10px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    background: 'var(--bg-primary)',
    cursor: 'pointer',
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    background: 'var(--bg-primary)',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    paddingTop: '16px',
    borderTop: '1px solid var(--border-color)',
  },
};

export default ApplicationModal;