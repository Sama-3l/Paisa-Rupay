'use client';

import React, { useActionState, useState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { submitReferForm } from '@/src/domain/actions';
import { ReferFormState } from '@/src/lib/types';
import styles from './refer_form.module.css';
import Spinner from '@/src/common/Spinner/Spinner';
import { sendGAEvent } from '@next/third-parties/google';

const PLACEHOLDER_CODE = 'PR1230';
const REFERRAL_LINK = `paisarupay.com/apply?ref=${PLACEHOLDER_CODE}`;

const initialState: ReferFormState = {
  success: true,
};

export default function ReferForm() {
  const [state, formAction, isPending] = useActionState(submitReferForm, initialState);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${REFERRAL_LINK}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent fallback */
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(PLACEHOLDER_CODE);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      /* silent fallback */
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Use my referral code ${PLACEHOLDER_CODE} to apply for a loan on PaisaRupay! https://${REFERRAL_LINK}`)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent('Apply for a loan with my referral code')}&body=${encodeURIComponent(`Hi,\n\nUse my referral code ${PLACEHOLDER_CODE} to apply for a loan on PaisaRupay!\n\nhttps://${REFERRAL_LINK}`)}`;

  return (
    <div className="w-full">
      {state.success ? (
        <div id="codeState" className="flex flex-col gap-6 w-full">

          {/* Intro line */}
          <p
            className="font-(--font-fustat) text-(--placeholder) tracking-[-2.5%]"
            style={{ fontSize: 'var(--paragraph)' }}
          >
            Here is your referral code,{' '}
            <strong className={styles.code_span} id="userName">
              {state.message ?? 'PR1230'}
            </strong>
            . Share it with anyone who needs a loan.
          </p>

          {/* Code card */}
          <div
            className={`flex flex-col gap-4 p-5 ${styles.orange_radial}`}
          >
            {/* Code row */}
            <div className="flex flex-col gap-1">
              <span
                className="font-(--font-fustat) tracking-[5%] uppercase"
                style={{ fontSize: 'var(--caption)', fontWeight: '500', color: 'var(--primary)' }}
              >
                Your code
              </span>
              <span
                id="codeValue"
                className={styles.code}
              >
                {PLACEHOLDER_CODE}
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}
            />

            {/* Link row */}
            <div className="flex flex-col gap-2">
              <span
                className="font-(--font-fustat) tracking-[5%] uppercase"
                style={{ fontSize: 'var(--caption)', fontWeight: '500', color: 'var(--primary)' }}
              >
                Your referral link
              </span>
              <div className="flex flex-row items-stretch gap-0 border" style={{borderColor: 'color-mix(in srgb, var(--placeholder) 20%, transparent)',}}>
                <div
                  id="codeLink"
                  className="flex-1 text-(--text-color) px-3 py-3  truncate"
                  style={{
                    fontFamily: 'var(--font-fustat)',
                    fontSize: 'var(--caption)',
                    background: 'var(--background)',
                  }}
                >
                  {REFERRAL_LINK}
                </div>
                <button
                  id="copyBtn"
                  onClick={handleCopyLink}
                  className="shrink-0 transition-all active:scale-95"
                  style={{
                    background: copied ? 'var(--secondary-green)' : 'var(--primary)',
                    color: copied ? 'var(--primary-green)' : 'var(--background)',
                    paddingInline: '16px',
                    fontSize: 'var(--caption)',
                    fontWeight: 600,
                  }}
                >
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>

          {/* Share via */}
          <div className="flex flex-col gap-3">
            <span
              className="font-(--font-fustat) tracking-[5%] uppercase"
              style={{ fontSize: 'var(--caption)', fontWeight: '500', color: 'var(--primary)' }}
            >
              Share via
            </span>
            <div className="flex flex-row flex-wrap gap-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline transition-opacity hover:opacity-80 active:scale-95"
                style={{
                  background: 'radial-gradient(circle at center, color-mix(in srgb, var(--primary) 20%, transparent) 0%, color-mix(in srgb, var(--primary) 80%, transparent) 300%)',
                  border: '0.5px solid color-mix(in srgb, var(--placeholder) 25%, transparent)',
                  outline: 'none',
                  padding: '0.75rem 1rem',
                  boxSizing: 'border-box',
                  color: 'inherit',
                  paddingInline: '16px',
                  paddingBlock: '10px',
                  fontSize: 'var(--button)',
                  fontFamily: 'var(--font-fustat)',
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.177a.75.75 0 00.919.919l5.315-1.478A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.71 9.71 0 01-4.953-1.355l-.355-.212-3.681 1.023 1.023-3.681-.212-.355A9.71 9.71 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
                WhatsApp
              </a>

              {/* Copy code */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 transition-all active:scale-95"
                style={{
                  background: codeCopied ? 'radial-gradient(circle at center, color-mix(in srgb, var(--primary-green) 20%, transparent) 0%, color-mix(in srgb, var(--primary-green) 80%, transparent) 300%)' : 'radial-gradient(circle at center, color-mix(in srgb, var(--primary) 20%, transparent) 0%, color-mix(in srgb, var(--primary) 80%, transparent) 300%)',
                  color: codeCopied ? 'var(--primary-green)' : 'var(--text-color)',
                  border: '0.5px solid color-mix(in srgb, var(--placeholder) 25%, transparent)',
                  paddingInline: '16px',
                  paddingBlock: '10px',
                  fontSize: 'var(--button)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {codeCopied ? 'Copied!' : 'Copy code'}
              </button>

              {/* Email */}
              <a
                href={emailUrl}
                className="flex items-center gap-2 no-underline transition-opacity hover:opacity-80 active:scale-95"
                style={{
                  background: 'radial-gradient(circle at center, color-mix(in srgb, var(--primary) 20%, transparent) 0%, color-mix(in srgb, var(--primary) 80%, transparent) 300%)',
                  color: 'var(--text-color)',
                  border: '0.5px solid color-mix(in srgb, var(--placeholder) 25%, transparent)',
                  paddingInline: '16px',
                  paddingBlock: '10px',
                  fontSize: 'var(--button)',
                  fontFamily: 'var(--font-fustat)',
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col w-full gap-6 mx-auto" onFocus={() => sendGAEvent('event', 'form_start', { form_name: 'banker_partnership' })} onSubmit={() => sendGAEvent('event', 'form_submit', { form_name: 'banker_partnership' })}>

          {/* GLOBAL ERROR / RATE LIMIT STATE */}
          {state.globalError && (
            <div
              className="flex flex-col gap-2 p-4 border border-solid border-(--secondary-red)/50 bg-(--primary-red) text-(--tertiary-red)"
              role="alert"
            >
              <div className="font-bold flex items-center gap-2">
                <i className="ti ti-alert-triangle text-lg"></i>
                <span>Action Required</span>
              </div>
              <p className="text-sm font-(--font-fustat)">{state.globalError}</p>
            </div>
          )}

          {/* NAME FIELD */}
          <div>
            <OrangeRadialInput
              title="legal full name"
              name="name"
              type="text"
              placeholder="As on your PAN card"
              required={true}
              disabled={isPending}
            />
            {state.errors?.name && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.name}
              </span>
            )}
          </div>

          {/* PHONE FIELD */}
          <div>
            <OrangeRadialInput
              title="phone number"
              name="phone"
              type="tel"
              placeholder="9876543210"
              required={true}
              maxLength={10}
              disabled={isPending}
            />
            {state.errors?.phone && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.phone}
              </span>
            )}
          </div>

          <div>
            <OrangeRadialInput
              title="email"
              name="email"
              type="text"
              placeholder="example@gmail.com"
              required={false}
              disabled={isPending}
            />
            {state.errors?.name && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.name}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON WITH SPINNER */}
          <button
            type="submit"
            disabled={isPending}
            className="self-start flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ paddingInline: "32px" }}
          >
            {isPending ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "Generate my code"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
