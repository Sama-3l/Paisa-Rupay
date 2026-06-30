import { Resend } from 'resend';
import {
  ApplyForLoanFormData,
  ContactUsFormData,
  BankerPartnershipFormData,
  FreeConsultationFormData,
  ReferralFormData,
} from '../lib/types';
import { prisma } from '../lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);
const websiteUrl: string = process.env.WEBSITE_CONTACT_US_SHEET_LINK || '';

const FROM = 'Paisa Rupay <contact@paisarupay.com>';
const TO = 'paisarupay0@gmail.com'; // Team inbox

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Sends a confirmation email to the visitor who contacted us.
 * Uses fully static text to avoid being flagged as a spam relay.
 */
async function sendResponse(email: string): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: 'contact@paisarupay.com',
      subject: 'Thank you for contacting us.',
      html: `
        <p>Thank you for reaching out to us.</p>
        <br>
        <p>We'll get back to you and help however we can.</p>
      `,
    });
  } catch (error) {
    console.error('[Resend] Confirmation email failed:', error);
  }
}

/**
 * Posts form data to the Google Apps Script webhook that writes to the sheet.
 * Uses response.text() (not response.json()) to avoid parse errors on plain-text
 * responses like "OK" or error pages.
 */
async function sheetUpdate(
  formData:
    | ApplyForLoanFormData
    | ContactUsFormData
    | BankerPartnershipFormData
    | FreeConsultationFormData
    | ReferralFormData
): Promise<void> {
  try {
    const response = await fetch(websiteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      redirect: 'follow',
    });
    const bodyText = await response.text().catch(() => '(unreadable)');
    console.log('[Sheet] Status:', response.status, '| Body:', bodyText);
  } catch (error) {
    console.error('[Sheet] Webhook failed:', error);
    // Do NOT rethrow — sheet failure must not block the user
  }
}

// ---------------------------------------------------------------------------
// Existing form send functions (now also write to Supabase)
// ---------------------------------------------------------------------------

export async function sendLoanApplicationMail(data: ApplyForLoanFormData) {
  const referralSection =
    data.referralCode
      ? `
        <hr />
        <h3>Referral Details</h3>
        <p><strong>Code:</strong> ${data.referralCode}</p>
        <p><strong>Referrer Name:</strong> ${data.referrerName || '—'}</p>
        <p><strong>Referrer Phone:</strong> ${data.referrerPhone || '—'}</p>
        <p><strong>Referrer Email:</strong> ${data.referrerEmail || '—'}</p>
      `
      : '';

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Loan Application — ${data.name}`,
    html: `
      <h2>New Loan Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Loan Type:</strong> ${data.loanType}</p>
      ${referralSection}
    `,
  });

  // Non-blocking Supabase write — failure does not affect the user
  prisma.loanApplication
    .create({
      data: {
        name: data.name,
        phone: data.phone,
        loanType: data.loanType,
        referralCode: data.referralCode || null,
        referrerName: data.referrerName || null,
        referrerPhone: data.referrerPhone || null,
        referrerEmail: data.referrerEmail || null,
      },
    })
    .catch((dbError: unknown) =>
      console.error('[DB] LoanApplication write failed:', dbError)
    );

  await sheetUpdate(data);

  if (error) throw new Error(error.message);
}

export async function sendContactUsMail(data: ContactUsFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Contact Us Message — ${data.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || '—'}</p>
      <p><strong>Message:</strong> ${data.message || '—'}</p>
    `,
  });

  await sendResponse(data.email);

  // Non-blocking Supabase write
  prisma.contactSubmission
    .create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
      },
    })
    .catch((dbError: unknown) =>
      console.error('[DB] ContactSubmission write failed:', dbError)
    );

  await sheetUpdate(data);

  if (error) throw new Error(error.message);
}

export async function sendBankerPartnershipMail(data: BankerPartnershipFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Banker Partnership Request — ${data.name}`,
    html: `
      <h2>New Banker Partnership Request</h2>
      <p><strong>Contact:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
    `,
  });

  // Non-blocking Supabase write
  prisma.bankerPartnershipRequest
    .create({
      data: {
        name: data.name,
        phone: data.phone,
      },
    })
    .catch((dbError: unknown) =>
      console.error('[DB] BankerPartnershipRequest write failed:', dbError)
    );

  await sheetUpdate(data);

  if (error) throw new Error(error.message);
}

export async function sendFreeConsultationMail(data: FreeConsultationFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Free Consultation Request — ${data.name}`,
    html: `
      <h2>New Free Consultation Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.message.length > 1 ? `<p><strong>Comment:</strong> ${data.message}</p>` : ''}
    `,
  });

  // Non-blocking Supabase write
  prisma.consultationRequest
    .create({
      data: {
        name: data.name,
        phone: data.phone,
        message: data.message || null,
      },
    })
    .catch((dbError: unknown) =>
      console.error('[DB] ConsultationRequest write failed:', dbError)
    );

  await sheetUpdate(data);

  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Referral email functions (new)
// ---------------------------------------------------------------------------

/**
 * Sends the generated referral code to the referrer's email address.
 * Called when a referral code is successfully generated.
 */
export async function sendReferralCodeEmail(data: ReferralFormData): Promise<void> {
  if (!data.email) return; // Email is optional — skip if not provided

  try {
    await resend.emails.send({
      from: FROM,
      to: [data.email],
      replyTo: 'contact@paisarupay.com',
      subject: `Your Paisa Rupay referral code: ${data.code}`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your referral code is ready. Share it with anyone who needs a loan.</p>

        <div style="margin: 24px 0; padding: 20px; background: #FFF4EE; border: 1px solid #FF6D28; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #FF6D28; letter-spacing: 2px; text-transform: uppercase;">Your Referral Code</p>
          <p style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1a1a1a;">${data.code}</p>
        </div>

        <p><strong>How it works:</strong></p>
        <ol>
          <li>Share this code with someone who needs a loan.</li>
          <li>They enter it when applying on Paisa Rupay.</li>
          <li>When their loan is disbursed, you earn a reward and they get a cashback on their fees.</li>
        </ol>

        <p style="color: #888; font-size: 12px; margin-top: 24px;">
          You can always get this code again by re-entering the same name and phone number on paisarupay.com/refer-n-earn.
        </p>
      `,
    });
  } catch (error) {
    console.error('[Resend] Referral code email failed:', error);
    // Do NOT rethrow — email failure must not block code generation
  }
}

/**
 * Notifies the referrer that someone used their referral code on a loan application.
 * Called when a valid referral code is submitted with a loan application.
 */
export async function sendReferralUsedEmail(
  referrerEmail: string,
  referrerName: string,
  referralCode: string,
  applicantName: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM,
      to: [referrerEmail],
      replyTo: 'contact@paisarupay.com',
      subject: `${applicantName} just used your referral code`,
      html: `
        <h2>Hi ${referrerName},</h2>
        <p>
          <strong>${applicantName}</strong> has just applied for a loan using your referral code
          <strong>${referralCode}</strong>.
        </p>
        <p>
          Our team will now work on their application. Once their loan is disbursed,
          your reward will be processed and their fee cashback will be applied automatically.
        </p>
        <p>We'll be in touch once that happens — you don't need to do anything.</p>

        <p style="color: #888; font-size: 12px; margin-top: 24px;">
          If you didn't share your referral code with ${applicantName}, you can ignore this email.
        </p>
      `,
    });
  } catch (error) {
    console.error('[Resend] Referral used email failed:', error);
    // Do NOT rethrow — notification failure must not block the loan application
  }
}