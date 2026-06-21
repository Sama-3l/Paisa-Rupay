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

// Consultation Form Types
export interface ConsultationInputData {
  name: string;
  phone: string;
  message?: string;
}

export interface ConsultationValidationErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export interface ConsultationFormState {
  success: boolean;
  message?: string;
  errors?: ConsultationValidationErrors;
  globalError?: string;
}

// Banker Form Types
export interface BankerInputData {
  name: string;
  phone: string;
}

export interface BankerValidationErrors {
  name?: string;
  phone?: string;
}

export interface BankerFormState {
  success: boolean;
  message?: string;
  errors?: BankerValidationErrors;
  globalError?: string;
}

export interface ReferFormState {
  success: boolean;
  message?: string;
  errors?: BankerValidationErrors;
  globalError?: string;
}

export interface ApplyForLoanFormData {
  name: string;
  type: 'apply for loan';
  phone: string;
  loanType: string;
}

export interface ContactUsFormData {
  email: string;
  name: string;
  type: 'contact us';
  phone?: string;
  message?: string;
}

export interface BankerPartnershipFormData {
  name: string;
  type: 'banker partnership';
  phone: string;
}

export interface FreeConsultationFormData {
  name: string;
  type: 'free consultation';
  phone: string;
  message: string;
}