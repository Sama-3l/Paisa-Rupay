'use client';

import React, { useActionState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { FormState, submitContactForm } from '@/src/domain/actions';
import styles from './contact_form.module.css';
import Spinner from '@/src/common/Spinner/Spinner';
import { sendGAEvent } from '@next/third-parties/google';

const initialState: FormState = {
  success: false,
};

/**
 * Client-side component managing the contact form.
 * Uses React 19 useActionState to manage state (idle, pending, success, error)
 * without sacrificing accessibility and SEO structure of page.tsx.
 */
export default function ContactForm() {
  // Hook into our Server Action to receive form state outputs (success, errors, pending)
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="sm:w-[90%] w-full">
      {state.success ? (
        /* SUCCESS STATE */
        /* Styled to match the solution cards green-gradient aesthetic */
        <div
          className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-solid transition-all duration-500 ease-out mt-5"
          style={{
            borderColor: 'color-mix(in srgb, var(--primary-green) 70%, transparent)',
            background: 'radial-gradient(circle at center, var(--secondary-green) 0%, var(--primary-green) 300%)',
          }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <i className="ti ti-circle-check text-4xl text-white"></i>
          </div>
          <h3 className={styles.submitted_headline}>
            Message Sent Successfully!
          </h3>
          <p className={styles.submitted_para}>
            {state.message}
          </p>
        </div>
      ) : (
        /* ACTIVE / IDLE / LOADING STATE */
        <form action={formAction} className="flex flex-col sm:w-[60%] w-full sm:px-0 px-4 gap-6 mx-auto" onFocus={() => sendGAEvent('event', 'form_start', { form_name: 'contact_us' })} onSubmit={() => sendGAEvent('event', 'form_submit', { form_name: 'contact_us' })}>

          {/* GLOBAL ERROR / RATE LIMIT STATE */}
          {/* Styled in accordance with the project's rejection tag & card aesthetic */}
          {state.globalError && (
            <div
              className="flex flex-col gap-2 p-4 border border-solid border-[#BA7517]/50 bg-[#FAEEDA] text-[#854F0B]"
              role="alert"
            >
              <div className="font-bold flex items-center gap-2">
                <i className="ti ti-alert-triangle text-lg"></i>
                <span>Action Required</span>
              </div>
              <p className="text-sm font-(--font-fustat)">{state.globalError}</p>
            </div>
          )}

          {/* EMAIL FIELD */}
          <div>
            <OrangeRadialInput
              title="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              required={true}
              disabled={isPending}
            />
            {state.errors?.email && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.email}
              </span>
            )}
          </div>

          {/* NAME FIELD */}
          <div>
            <OrangeRadialInput
              title="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required={true}
              disabled={isPending}
              style={{
                fontFamily: "var(--font-fustat)"
              }}
            />
            {state.errors?.name && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.name}
              </span>
            )}
          </div>

          {/* PHONE FIELD (Optional) */}
          <div>
            <OrangeRadialInput
              title="phone number"
              name="phone"
              type="tel"
              placeholder="9876543210"
              required={false}
              maxLength={10}
              disabled={isPending}
            />
            {state.errors?.phone && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.phone}
              </span>
            )}
          </div>

          {/* MESSAGE FIELD (Optional) */}
          <div>
            <OrangeRadialInput
              title="what's on your mind?"
              name="message"
              placeholder="Let us know your queries..."
              required={false}
              multiline
              rows={5}
              disabled={isPending}
            />
            {state.errors?.message && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.message}
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
              "Submit!"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
