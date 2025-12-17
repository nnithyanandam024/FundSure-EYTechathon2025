import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  disabled = false,
  required = false,
}) => {
  return (
    <div style={styles.container}>
      {label && (
        <label style={styles.label} htmlFor={name}>
          {label}
          {required && <span style={styles.required}> *</span>}
        </label>
      )}
      
      <div style={styles.inputWrapper}>
        {icon && <span style={styles.icon}>{icon}</span>}
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={{
            ...styles.input,
            paddingLeft: icon ? '40px' : '12px',
          }}
        />
      </div>

      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-primary)',
  },
  required: {
    color: '#ef4444',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-secondary)',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    background: 'var(--bg-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  error: {
    fontSize: '13px',
    color: '#ef4444',
  },
};

export default Input;