// Validation Functions

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[+]?[91]?[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned) && (cleaned.length === 10 || cleaned.length === 12);
};

// Password validation
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: minLength && hasUppercase && hasLowercase && hasNumber,
    errors: {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
    },
  };
};

// Loan amount validation
export const validateLoanAmount = (amount, min = 50000, max = 10000000) => {
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return { isValid: false, error: 'Amount must be a number' };
  if (numAmount < min) return { isValid: false, error: `Minimum loan amount is ₹${min.toLocaleString()}` };
  if (numAmount > max) return { isValid: false, error: `Maximum loan amount is ₹${max.toLocaleString()}` };
  return { isValid: true };
};

// Tenure validation
export const validateTenure = (tenure, min = 12, max = 84) => {
  const numTenure = Number(tenure);
  if (isNaN(numTenure)) return { isValid: false, error: 'Tenure must be a number' };
  if (numTenure < min) return { isValid: false, error: `Minimum tenure is ${min} months` };
  if (numTenure > max) return { isValid: false, error: `Maximum tenure is ${max} months` };
  return { isValid: true };
};

// Credit score validation
export const validateCreditScore = (score) => {
  const numScore = Number(score);
  if (isNaN(numScore)) return { isValid: false, error: 'Credit score must be a number' };
  if (numScore < 300) return { isValid: false, error: 'Minimum credit score is 300' };
  if (numScore > 900) return { isValid: false, error: 'Maximum credit score is 900' };
  return { isValid: true };
};

// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

// PAN card validation
export const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

// Aadhaar validation
export const validateAadhaar = (aadhaar) => {
  const cleaned = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
};

// IFSC code validation
export const validateIFSC = (ifsc) => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};

// Form validation - validate multiple fields
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    // Required validation
    if (fieldRules.required) {
      const result = validateRequired(value, fieldRules.label || field);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
        return;
      }
    }

    // Skip other validations if field is empty and not required
    if (!value) return;

    // Email validation
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = 'Invalid email address';
      isValid = false;
    }

    // Phone validation
    if (fieldRules.phone && !validatePhoneNumber(value)) {
      errors[field] = 'Invalid phone number';
      isValid = false;
    }

    // Min length validation
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Minimum length is ${fieldRules.minLength} characters`;
      isValid = false;
    }

    // Max length validation
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Maximum length is ${fieldRules.maxLength} characters`;
      isValid = false;
    }

    // Custom validation
    if (fieldRules.custom) {
      const result = fieldRules.custom(value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

export default {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateLoanAmount,
  validateTenure,
  validateCreditScore,
  validateRequired,
  validatePAN,
  validateAadhaar,
  validateIFSC,
  validateForm,
};