// src/lib/types.tsx

// Loan options structure
export interface LoanOption {
  value: string;
  label: string;
}

// Global Loan Options Constant
export const LOAN_OPTIONS: LoanOption[] = [
  { value: "personal", label: 'Personal Loan' },
  { value: "house", label: 'House Loan' },
  { value: "car", label: 'Car Loan' },
  { value: "gold", label: 'Gold Loan' },
  { value: "property", label: 'Loan against property' },
  { value: "business", label: 'Business Loan' },
  { value: "other", label: 'Other Loans' },
];

// Contact Form Types
export interface ContactInputData {
  email: string;
  name: string;
  phone?: string;
  message?: string;
}

export interface ContactValidationErrors {
  email?: string;
  name?: string;
  phone?: string;
  message?: string;
}

export interface ContactFormState {
  success: boolean;
  message?: string;
  errors?: ContactValidationErrors;
  globalError?: string;
}

// Loan Form Types
export interface LoanInputData {
  name: string;
  phone: string;
  loanType: string;
}

export interface LoanValidationErrors {
  name?: string;
  phone?: string;
  loanType?: string;
}

export interface LoanFormState {
  success: boolean;
  message?: string;
  errors?: LoanValidationErrors;
  globalError?: string;
}
