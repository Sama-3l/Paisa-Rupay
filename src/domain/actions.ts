'use server';

import { headers } from 'next/headers';
import { validateContactInputs, isRateLimited } from './security';

export interface FormState {
  success: boolean;
  message?: string;
  errors?: {
    email?: string;
    name?: string;
    phone?: string;
    message?: string;
  };
  globalError?: string;
}

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

    // 5. Submit Form Data
    // Log safe, sanitized data on the server.
    // In production, insert this data into your database (e.g. Prisma / Postgres) 
    // or send an email (e.g. Resend / AWS SES) using validation.sanitizedData.
    console.log('[Form Submission Success]', {
      ip: clientIp,
      timestamp: new Date().toISOString(),
      data: validation.sanitizedData,
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
