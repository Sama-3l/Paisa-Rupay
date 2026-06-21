'use server';

import { headers } from 'next/headers';
import { validateContactInputs, validateLoanInputs, validateConsultationInputs, validateBankerInputs, isRateLimited } from './security';
import { sendContactUsMail, sendLoanApplicationMail, sendFreeConsultationMail, sendBankerPartnershipMail } from './form_responses';

import { ContactFormState, LoanFormState, ConsultationFormState, LOAN_OPTIONS, BankerFormState } from '@/src/lib/types';

export type FormState = ContactFormState;

/**
 * Server Action to submit the contact form securely.
 * Under Next.js 16 rules, requests context (like headers) are async.
 * Uses rate limiter and strict parser validation server-side.
 */
export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 1. Retrieve Client IP for Rate Limiting
    const headersList = await headers(); // Next.js 16 asynchronous request API
    const xForwardedFor = headersList.get('x-forwarded-for');
    const xRealIp = headersList.get('x-real-ip');
    
    // Resolve client IP (fall back to localhost/unknown if proxy headers are absent)
    let clientIp = '127.0.0.1';
    if (xForwardedFor) {
      clientIp = xForwardedFor.split(',')[0].trim();
    } else if (xRealIp) {
      clientIp = xRealIp.trim();
    }

    // 2. Perform Rate Limiting check
    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    // 3. Extract Form Fields
    const email = formData.get('email') as string | null;
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string | null;

    // 4. Validate & Sanitize Inputs
    const validation = validateContactInputs({
      email: email || undefined,
      name: name || undefined,
      phone: phone || undefined,
      message: message || undefined,
    });

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        globalError: 'Please fix the errors below.',
      };
    }

    const formInfo = { ...validation.sanitizedData!, type: 'contact us' as const };

    // 5. Send email directly — no internal HTTP round-trip
    await sendContactUsMail(formInfo);

    console.log('[Form Submission Success]', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
      data: formInfo,
    });

    // Return only the exact success status and message required by the client UI
    // (avoiding leaking database schemas, raw models, or secret settings)
    return {
      success: true,
      message: 'Thank you! We have received your query and will get back to you within the same day.',
    };

  } catch (error) {
    console.error('[Form Submission Server Error]', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

/**
 * Server Action to submit the loan application form securely.
 */
export async function submitLoanForm(
  prevState: LoanFormState,
  formData: FormData
): Promise<LoanFormState> {
  try {
    // 1. Retrieve Client IP for Rate Limiting
    const headersList = await headers(); // Next.js async request API
    const xForwardedFor = headersList.get('x-forwarded-for');
    const xRealIp = headersList.get('x-real-ip');

    // Resolve client IP (fall back to localhost/unknown if proxy headers are absent)
    let clientIp = '127.0.0.1';
    if (xForwardedFor) {
      clientIp = xForwardedFor.split(',')[0].trim();
    } else if (xRealIp) {
      clientIp = xRealIp.trim();
    }

    // 2. Perform Rate Limiting check
    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    // 3. Extract Form Fields
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const loanType = formData.get('loanType') as string | null;

    // 4. Validate & Sanitize Inputs
    const validation = validateLoanInputs(
      {
        name: name || undefined,
        phone: phone || undefined,
        loanType: loanType || undefined,
      },
      LOAN_OPTIONS
    );

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        globalError: 'Please fix the errors below.',
      };
    }

    const formInfo = { ...validation.sanitizedData!, type: 'apply for loan' as const };

    // 5. Send email directly — no internal HTTP round-trip
    await sendLoanApplicationMail(formInfo);

    console.log('[Loan Application Submission Success]', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
      data: formInfo,
    });

    // Return only the exact success status and message required by the client UI
    return {
      success: true,
      message: 'Thank you! Your application has been received. Our loan advisor will call you within 24 hours.',
    };

  } catch (error) {
    console.error('[Loan Submission Server Error]', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

/**
 * Server Action to submit the free consultation request securely.
 */
export async function submitConsultationForm(
  prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  try {
    // 1. Retrieve Client IP for Rate Limiting
    const headersList = await headers(); // Next.js async request API
    const xForwardedFor = headersList.get('x-forwarded-for');
    const xRealIp = headersList.get('x-real-ip');

    // Resolve client IP (fall back to localhost/unknown if proxy headers are absent)
    let clientIp = '127.0.0.1';
    if (xForwardedFor) {
      clientIp = xForwardedFor.split(',')[0].trim();
    } else if (xRealIp) {
      clientIp = xRealIp.trim();
    }

    // 2. Perform Rate Limiting check
    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    // 3. Extract Form Fields
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string | null;

    // 4. Validate & Sanitize Inputs
    const validation = validateConsultationInputs(
      {
        name: name || undefined,
        phone: phone || undefined,
        message: message || undefined,
      }
    );

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        globalError: 'Please fix the errors below.',
      };
    }

    const formInfo = {
      ...validation.sanitizedData!,
      type: 'free consultation' as const,
      message: validation.sanitizedData!.message ?? '',
    };

    // 5. Send email directly — no internal HTTP round-trip
    await sendFreeConsultationMail(formInfo);

    console.log('[Free Consultation Request Submission Success]', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
      data: formInfo,
    });

    // Return only the exact success status and message required by the client UI
    return {
      success: true,
      message: 'Thank you! Your free consultation request has been received. Our expert advisor will call you within 24 hours.',
    };

  } catch (error) {
    console.error('[Consultation Submission Server Error]', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

/**
 * Server Action to submit the banker registration form securely.
 */
export async function submitBankerForm(
  prevState: BankerFormState,
  formData: FormData
): Promise<BankerFormState> {
  try {
    // 1. Retrieve Client IP for Rate Limiting
    const headersList = await headers(); // Next.js async request API
    const xForwardedFor = headersList.get('x-forwarded-for');
    const xRealIp = headersList.get('x-real-ip');

    // Resolve client IP (fall back to localhost/unknown if proxy headers are absent)
    let clientIp = '127.0.0.1';
    if (xForwardedFor) {
      clientIp = xForwardedFor.split(',')[0].trim();
    } else if (xRealIp) {
      clientIp = xRealIp.trim();
    }

    // 2. Perform Rate Limiting check
    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    // 3. Extract Form Fields
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;

    // 4. Validate & Sanitize Inputs
    const validation = validateBankerInputs({
      name: name || undefined,
      phone: phone || undefined,
    });

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        globalError: 'Please fix the errors below.',
      };
    }

    const formInfo = { ...validation.sanitizedData!, type: 'banker partnership' as const };

    // 5. Send email directly — no internal HTTP round-trip
    await sendBankerPartnershipMail(formInfo);

    console.log('[Banker Registration Submission Success]', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
      data: formInfo,
    });

    // Return only the exact success status and message required by the client UI
    return {
      success: true,
      message: 'Thank you! Your registration has been received. Our executive will reach out to you within 24 hours.',
    };

  } catch (error) {
    console.error('[Banker Submission Server Error]', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

export async function submitReferForm(
  prevState: BankerFormState,
  formData: FormData
): Promise<BankerFormState> {
  return await {
    success: true,
      message: 'Thank you! Your registration has been received. Our executive will reach out to you within 24 hours.',
  };
  // try {
  //   // 1. Retrieve Client IP for Rate Limiting
  //   const headersList = await headers(); // Next.js async request API
  //   const xForwardedFor = headersList.get('x-forwarded-for');
  //   const xRealIp = headersList.get('x-real-ip');

  //   // Resolve client IP (fall back to localhost/unknown if proxy headers are absent)
  //   let clientIp = '127.0.0.1';
  //   if (xForwardedFor) {
  //     clientIp = xForwardedFor.split(',')[0].trim();
  //   } else if (xRealIp) {
  //     clientIp = xRealIp.trim();
  //   }

  //   // 2. Perform Rate Limiting check
  //   if (isRateLimited(clientIp)) {
  //     return {
  //       success: false,
  //       globalError: 'Too many submissions. Please wait 5 minutes and try again.',
  //     };
  //   }

  //   // 3. Extract Form Fields
  //   const name = formData.get('name') as string | null;
  //   const phone = formData.get('phone') as string | null;

  //   // 4. Validate & Sanitize Inputs
  //   const validation = validateBankerInputs({
  //     name: name || undefined,
  //     phone: phone || undefined,
  //   });

  //   if (!validation.isValid) {
  //     return {
  //       success: false,
  //       errors: validation.errors,
  //       globalError: 'Please fix the errors below.',
  //     };
  //   }

  //   const formInfo = { ...validation.sanitizedData!, type: 'banker partnership' as const };

  //   // 5. Send email directly — no internal HTTP round-trip
  //   await sendBankerPartnershipMail(formInfo);

  //   console.log('[Banker Registration Submission Success]', {
  //     ip: clientIp,
  //     timestamp: new Date().toISOString(),
  //     data: formInfo,
  //   });

  //   // Return only the exact success status and message required by the client UI
  //   return {
  //     success: true,
  //     message: 'Thank you! Your registration has been received. Our executive will reach out to you within 24 hours.',
  //   };

  // } catch (error) {
  //   console.error('[Banker Submission Server Error]', error);
  //   return {
  //     success: false,
  //     globalError: 'An unexpected server error occurred. Please try again later.',
  //   };
  // }
}
