'use server';

import { headers } from 'next/headers';
import {
  validateContactInputs,
  validateLoanInputs,
  validateConsultationInputs,
  validateBankerInputs,
  validateReferInputs,
  isRateLimited,
} from './security';
import {
  sendContactUsMail,
  sendLoanApplicationMail,
  sendFreeConsultationMail,
  sendBankerPartnershipMail,
  sendReferralCodeEmail,
  sendReferralUsedEmail,
} from './form_responses';
import {
  generateReferralCode,
  upsertReferralCode,
  getReferralByCode,
  isCodeRateLimited,
  incrementCodeUsage,
} from './referral';

import {
  ContactFormState,
  LoanFormState,
  ConsultationFormState,
  LOAN_OPTIONS,
  BankerFormState,
  ReferFormState,
} from '@/src/lib/types';

export type FormState = ContactFormState;

// ---------------------------------------------------------------------------
// Shared IP resolution helper
// ---------------------------------------------------------------------------

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const xForwardedFor = headersList.get('x-forwarded-for');
  const xRealIp = headersList.get('x-real-ip');
  if (xForwardedFor) return xForwardedFor.split(',')[0].trim();
  if (xRealIp) return xRealIp.trim();
  return '127.0.0.1';
}

// ---------------------------------------------------------------------------
// 1. Contact Form
// ---------------------------------------------------------------------------

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
    const clientIp = await getClientIp();

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    const email = formData.get('email') as string | null;
    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string | null;

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

    await sendContactUsMail(formInfo);

    console.log('[ContactForm] Success', { ip: clientIp, ts: new Date().toISOString() });

    return {
      success: true,
      message: 'Thank you! We have received your query and will get back to you within the same day.',
    };
  } catch (error) {
    console.error('[ContactForm] Server error', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

// ---------------------------------------------------------------------------
// 2. Loan Application Form
// ---------------------------------------------------------------------------

/**
 * Server Action to submit the loan application form securely.
 * Handles optional referral code: validates, fetches referrer, notifies, tracks.
 */
export async function submitLoanForm(
  prevState: LoanFormState,
  formData: FormData
): Promise<LoanFormState> {
  try {
    const clientIp = await getClientIp();

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const loanType = formData.get('loanType') as string | null;
    const rawReferralCode = formData.get('referralCode') as string | null;

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

    // --- Referral Code Processing ---
    const referralCode = rawReferralCode?.trim().toUpperCase() || null;
    let referrerName: string | undefined;
    let referrerPhone: string | undefined;
    let referrerEmail: string | undefined;

    if (referralCode) {
      // Check if this code is being spammed (Option A: accept loan, drop referral)
      if (isCodeRateLimited(referralCode)) {
        console.warn('[LoanForm] Referral code rate-limited — proceeding without attribution:', referralCode);
      } else {
        const referrer = await getReferralByCode(referralCode);
        if (referrer) {
          referrerName = referrer.name;
          referrerPhone = referrer.phone;
          referrerEmail = referrer.email || undefined;

          // Fire-and-forget: update usage counter + notify referrer
          incrementCodeUsage(referralCode);

          if (referrerEmail) {
            sendReferralUsedEmail(
              referrerEmail,
              referrerName!,
              referralCode,
              validation.sanitizedData!.name
            );
          }
        } else {
          console.info('[LoanForm] Referral code not found — proceeding without attribution:', referralCode);
        }
      }
    }

    const formInfo = {
      ...validation.sanitizedData!,
      type: 'apply for loan' as const,
      referralCode: referrerName ? referralCode! : undefined,
      referrerName,
      referrerPhone,
      referrerEmail,
    };

    await sendLoanApplicationMail(formInfo);

    console.log('[LoanForm] Success', { ip: clientIp, ts: new Date().toISOString(), referralCode });

    return {
      success: true,
      message: 'Thank you! Your application has been received. Our loan advisor will call you within 24 hours.',
    };
  } catch (error) {
    console.error('[LoanForm] Server error', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

// ---------------------------------------------------------------------------
// 3. Free Consultation Form
// ---------------------------------------------------------------------------

/**
 * Server Action to submit the free consultation request securely.
 */
export async function submitConsultationForm(
  prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  try {
    const clientIp = await getClientIp();

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string | null;

    const validation = validateConsultationInputs({
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

    const formInfo = {
      ...validation.sanitizedData!,
      type: 'free consultation' as const,
      message: validation.sanitizedData!.message ?? '',
    };

    await sendFreeConsultationMail(formInfo);

    console.log('[ConsultationForm] Success', { ip: clientIp, ts: new Date().toISOString() });

    return {
      success: true,
      message: 'Thank you! Your free consultation request has been received. Our expert advisor will call you within 24 hours.',
    };
  } catch (error) {
    console.error('[ConsultationForm] Server error', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

// ---------------------------------------------------------------------------
// 4. Banker Partnership Form
// ---------------------------------------------------------------------------

/**
 * Server Action to submit the banker registration form securely.
 */
export async function submitBankerForm(
  prevState: BankerFormState,
  formData: FormData
): Promise<BankerFormState> {
  try {
    const clientIp = await getClientIp();

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;

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

    await sendBankerPartnershipMail(formInfo);

    console.log('[BankerForm] Success', { ip: clientIp, ts: new Date().toISOString() });

    return {
      success: true,
      message: 'Thank you! Your registration has been received. Our executive will reach out to you within 24 hours.',
    };
  } catch (error) {
    console.error('[BankerForm] Server error', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}

// ---------------------------------------------------------------------------
// 5. Refer & Earn Form
// ---------------------------------------------------------------------------

/**
 * Server Action to generate a referral code for the Refer & Earn feature.
 * Validates inputs, generates a deterministic HMAC-based 8-char code,
 * stores it in Supabase, optionally sends it to the referrer's email.
 */
export async function submitReferForm(
  prevState: ReferFormState,
  formData: FormData
): Promise<ReferFormState> {
  try {
    const clientIp = await getClientIp();

    if (isRateLimited(clientIp)) {
      return {
        success: false,
        globalError: 'Too many submissions. Please wait 5 minutes and try again.',
      };
    }

    const name = formData.get('name') as string | null;
    const phone = formData.get('phone') as string | null;
    const email = formData.get('email') as string | null;

    const validation = validateReferInputs({
      name: name || undefined,
      phone: phone || undefined,
      email: email || undefined,
    });

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        globalError: 'Please fix the errors below.',
      };
    }

    const { name: sanitizedName, phone: sanitizedPhone, email: sanitizedEmail } =
      validation.sanitizedData!;

    // Generate deterministic 8-char code (same inputs → same code always)
    const code = generateReferralCode(sanitizedName, sanitizedPhone, sanitizedEmail);

    // Upsert in Supabase (idempotent — safe to call multiple times for same code)
    await upsertReferralCode(code, sanitizedName, sanitizedPhone, sanitizedEmail);

    // Send code to referrer's email (non-blocking — fire and forget)
    if (sanitizedEmail) {
      sendReferralCodeEmail({
        name: sanitizedName,
        phone: sanitizedPhone,
        email: sanitizedEmail,
        code,
        type: 'refer and earn',
      });
    }

    console.log('[ReferForm] Code generated', { ip: clientIp, ts: new Date().toISOString(), code });

    return {
      success: true,
      code,
      message: sanitizedName,
    };
  } catch (error) {
    console.error('[ReferForm] Server error', error);
    return {
      success: false,
      globalError: 'An unexpected server error occurred. Please try again later.',
    };
  }
}
