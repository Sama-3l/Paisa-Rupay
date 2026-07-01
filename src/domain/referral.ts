import 'server-only';
import { createHmac } from 'crypto';
import { prisma } from '@/src/lib/prisma';

// ---------------------------------------------------------------------------
// 1. Code Generation
// ---------------------------------------------------------------------------

/**
 * Generates a deterministic 8-character alphanumeric referral code
 * from the referrer's details using HMAC-SHA256.
 *
 * Properties:
 * - Same inputs → always same code (deterministic)
 * - Requires the server secret — cannot be forged externally
 * - 8 uppercase alphanumeric chars (A-Z, 0-9) → 36^8 ≈ 2.8 trillion combos
 *
 * Algorithm:
 *   canonical = lowercase(name) + ":" + phone + ":" + lowercase(email || "")
 *   hmac      = HMAC-SHA256(REFERRAL_HMAC_SECRET, canonical)
 *   code      = Base36Encode(hmac).toUpperCase().slice(0, 8)
 */
export function generateReferralCode(
  name: string,
  phone: string,
  email?: string
): string {
  const secret = process.env.REFERRAL_HMAC_SECRET;
  if (!secret) {
    throw new Error('REFERRAL_HMAC_SECRET environment variable is not set.');
  }

  // Canonical input: normalise to avoid different inputs for the same person
  const canonical = [
    name.toLowerCase().trim(),
    phone.trim(),
    (email || '').toLowerCase().trim(),
  ].join(':');

  const hmac = createHmac('sha256', secret)
    .update(canonical)
    .digest('hex');

  // Convert hex digest to Base36 (digits 0-9 and letters A-Z) and take 8 chars
  const base36 = BigInt('0x' + hmac).toString(36).toUpperCase();

  // Pad to at least 8 chars (BigInt.toString may be shorter for very small values)
  return base36.padStart(8, '0').slice(0, 8);
}

// ---------------------------------------------------------------------------
// 2. Database Operations
// ---------------------------------------------------------------------------

/**
 * Upserts a referral code record in the database.
 * If the same code already exists (same person re-requesting), returns the
 * existing record without error or duplication.
 */
export async function upsertReferralCode(
  code: string,
  name: string,
  phone: string,
  email?: string
) {
  return prisma.referralCode.upsert({
    where: { code },
    update: {}, // Do not overwrite existing record — idempotent
    create: {
      code,
      name,
      phone,
      email: email || null,
    },
  });
}

/**
 * Looks up a referral code in the database and returns the referrer's details.
 * Returns null if the code does not exist or is invalid.
 */
export async function getReferralByCode(code: string) {
  try {
    return await prisma.referralCode.findUnique({
      where: { code },
      select: {
        name: true,
        phone: true,
        email: true,
        usageCount: true,
      },
    });
  } catch {
    return null;
  }
}

/**
 * Atomically increments the usage counter for a referral code.
 * This is fire-and-forget — failure does not impact the loan application.
 */
export async function incrementCodeUsage(code: string): Promise<void> {
  try {
    await prisma.referralCode.update({
      where: { code },
      data: { usageCount: { increment: 1 } },
    });
  } catch (error) {
    console.error('[ReferralCode] Failed to increment usageCount:', error);
  }
}

// ---------------------------------------------------------------------------
// 3. Per-Code Rate Limiter (in-memory sliding window)
// ---------------------------------------------------------------------------

/**
 * Tracks loan application timestamps per referral code.
 * Key: referral code string
 * Value: array of Unix timestamps (ms) of applications using this code
 */
const codeStore = new Map<string, number[]>();

const CODE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24-hour window
const MAX_USES_PER_WINDOW = 5;               // Max 5 applications per code per 24h

/**
 * Checks if a referral code is being spammed.
 *
 * Returns true if the code has been used too many times in the sliding window.
 * When true, the loan application continues normally — the referral is silently
 * dropped (Option A: accept loan, discard referral attribution).
 */
export function isCodeRateLimited(code: string): boolean {
  const now = Date.now();
  const timestamps = codeStore.get(code) || [];

  const active = timestamps.filter((t) => now - t < CODE_WINDOW_MS);

  if (active.length >= MAX_USES_PER_WINDOW) {
    console.warn(`[ReferralCode] Rate limit hit for code: ${code}`);
    return true;
  }

  active.push(now);
  codeStore.set(code, active);

  // Periodic cleanup to prevent unbounded memory growth
  if (Math.random() < 0.05) {
    for (const [key, val] of codeStore.entries()) {
      const remaining = val.filter((t) => now - t < CODE_WINDOW_MS);
      if (remaining.length === 0) {
        codeStore.delete(key);
      } else {
        codeStore.set(key, remaining);
      }
    }
  }

  return false;
}
