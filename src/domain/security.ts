import 'server-only';

// ---------------------------------------------------------
// 1. Text Parsing & Sanitization Utilities
// ---------------------------------------------------------

/**
 * Escapes HTML characters to prevent Cross-Site Scripting (XSS) attacks.
 * It also trims trailing and leading whitespaces.
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// ---------------------------------------------------------
// 2. Input Validation Schema & Validator
// ---------------------------------------------------------

import { 
  ContactInputData, 
  ContactValidationErrors as ValidationErrors,
  LoanInputData,
  LoanValidationErrors,
  LoanOption,
  ConsultationInputData,
  ConsultationValidationErrors,
  BankerInputData,
  BankerValidationErrors
} from '@/src/lib/types';

/**
 * Validates form inputs server-side without external dependencies.
 * Ensures data matches size constraints and formats.
 */
export function validateContactInputs(data: Partial<ContactInputData>): {
  isValid: boolean;
  errors: ValidationErrors;
  sanitizedData?: ContactInputData;
} {
  const errors: ValidationErrors = {};
  
  // 1. Validate Email (Required)
  const email = (data.email || '').trim();
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (email.length > 100) {
    errors.email = 'Email address must be under 100 characters.';
  } else {
    // Basic RFC 5322 compliant regex check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  // 2. Validate Name (Required)
  const name = (data.name || '').trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters.';
  }

  // 3. Validate Phone Number (Optional)
  const phone = (data.phone || '').trim();
  if (phone) {
    if (phone.length > 20) {
      errors.phone = 'Phone number must be under 20 characters.';
    } else {
      // Allow international formats, spaces, dashes, parentheses
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }
  }

  // 4. Validate Message (Optional)
  const message = (data.message || '').trim();
  if (message && message.length > 2000) {
    errors.message = 'Message must be under 2000 characters.';
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors,
      sanitizedData: {
        email: sanitizeText(email),
        name: sanitizeText(name),
        phone: phone ? sanitizeText(phone) : undefined,
        message: message ? sanitizeText(message) : undefined,
      },
    };
  }

  return {
    isValid: false,
    errors,
  };
}

/**
 * Validates loan form inputs server-side without external dependencies.
 */
export function validateLoanInputs(
  data: Partial<LoanInputData>,
  loanOptions: LoanOption[]
): {
  isValid: boolean;
  errors: LoanValidationErrors;
  sanitizedData?: LoanInputData;
} {
  const errors: LoanValidationErrors = {};

  // 1. Validate Name (Required)
  const name = (data.name || '').trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters.';
  }

  // 2. Validate Phone Number (Required)
  const phone = (data.phone || '').trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else {
    if (phone.length > 20) {
      errors.phone = 'Phone number must be under 20 characters.';
    } else {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }
  }

  // 3. Validate Loan Type (Required)
  const loanType = (data.loanType || '').trim();
  const validValues = loanOptions.map((opt) => opt.value);
  if (!loanType) {
    errors.loanType = 'Loan type is required.';
  } else if (!validValues.includes(loanType)) {
    errors.loanType = 'Please select a valid loan type.';
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors,
      sanitizedData: {
        name: sanitizeText(name),
        phone: sanitizeText(phone),
        loanType: sanitizeText(loanType),
      },
    };
  }

  return {
    isValid: false,
    errors,
  };
}

/**
 * Validates consultation form inputs server-side without external dependencies.
 */
export function validateConsultationInputs(
  data: Partial<ConsultationInputData>
): {
  isValid: boolean;
  errors: ConsultationValidationErrors;
  sanitizedData?: ConsultationInputData;
} {
  const errors: ConsultationValidationErrors = {};

  // 1. Validate Name (Required)
  const name = (data.name || '').trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters.';
  }

  // 2. Validate Phone Number (Required)
  const phone = (data.phone || '').trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else {
    if (phone.length > 20) {
      errors.phone = 'Phone number must be under 20 characters.';
    } else {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }
  }

  // 3. Validate Comment/Message (Optional)
  const message = (data.message || '').trim();
  if (message && message.length > 2000) {
    errors.message = 'Comment must be under 2000 characters.';
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors,
      sanitizedData: {
        name: sanitizeText(name),
        phone: sanitizeText(phone),
        message: message ? sanitizeText(message) : undefined,
      },
    };
  }

  return {
    isValid: false,
    errors,
  };
}

/**
 * Validates banker form inputs server-side without external dependencies.
 */
export function validateBankerInputs(
  data: Partial<BankerInputData>
): {
  isValid: boolean;
  errors: BankerValidationErrors;
  sanitizedData?: BankerInputData;
} {
  const errors: BankerValidationErrors = {};

  // 1. Validate Name (Required)
  const name = (data.name || '').trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters.';
  }

  // 2. Validate Phone Number (Required)
  const phone = (data.phone || '').trim();
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else {
    if (phone.length > 20) {
      errors.phone = 'Phone number must be under 20 characters.';
    } else {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;

  if (isValid) {
    return {
      isValid: true,
      errors,
      sanitizedData: {
        name: sanitizeText(name),
        phone: sanitizeText(phone),
      },
    };
  }

  return {
    isValid: false,
    errors,
  };
}

// ---------------------------------------------------------
// 3. Sliding-Window Rate Limiter
// ---------------------------------------------------------

// Store IP submission timestamps: IP -> Array of timestamps (in milliseconds)
const ipStore = new Map<string, number[]>();

// Configuration parameters
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes window
const MAX_REQUESTS = 3;          // Max 3 submissions per window

/**
 * Checks if the request from a specific IP is rate-limited.
 * Returns true if the client has exceeded the submission threshold.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipStore.get(ip) || [];

  // Filter timestamps to only retain requests in the current window
  const activeTimestamps = timestamps.filter((time) => now - time < WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS) {
    // Exceeded maximum requests allowed
    return true;
  }

  // Add current request timestamp and save back to store
  activeTimestamps.push(now);
  ipStore.set(ip, activeTimestamps);

  // Periodically clean up memory for long-inactive IPs
  // Doing a quick random check to avoid leaking memory on large Map
  if (Math.random() < 0.1) {
    for (const [key, val] of ipStore.entries()) {
      const remaining = val.filter((time) => now - time < WINDOW_MS);
      if (remaining.length === 0) {
        ipStore.delete(key);
      } else {
        ipStore.set(key, remaining);
      }
    }
  }

  return false;
}
