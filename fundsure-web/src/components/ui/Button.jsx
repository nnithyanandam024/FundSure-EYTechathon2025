import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      background: '#4f46e5',
      color: 'white',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    },
    danger: {
      background: '#ef4444',
      color: 'white',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
    },
  };

  const sizes = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px',
    },
    md: {
      padding: '10px 20px',
      fontSize: '14px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '16px',
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <button 
      type={type}
      style={buttonStyles} 
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;