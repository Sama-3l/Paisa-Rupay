'use client';

import React, { useActionState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { FormState, submitContactForm } from '@/src/domain/actions';

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
    <div className="w-full">
      {state.success ? (
        /* SUCCESS STATE */
        /* Styled to match the solution cards green-gradient aesthetic */
        <div 
          className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-solid transition-all duration-500 ease-out"
          style={{
            borderColor: 'color-mix(in srgb, var(--primary-green) 70%, transparent)',
            background: 'radial-gradient(circle at center, var(--secondary-green) 0%, var(--primary-green) 300%)',
          }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <i className="ti ti-circle-check text-4xl text-white"></i>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3 font-(--font-fustat)">
            Message Sent Successfully!
          </h3>
          <p className="max-w-md text-white/90 text-sm leading-relaxed font-(--font-fustat)">
            {state.message}
          </p>
        </div>
      ) : (
        /* ACTIVE / IDLE / LOADING STATE */
        <form action={formAction} className="flex flex-col sm:w-[60%] w-full sm:px-0 px-4 gap-6 mx-auto">
          
          {/* GLOBAL ERROR / RATE LIMIT STATE */}
          {/* Styled in accordance with the project's rejection tag & card aesthetic */}
          {state.globalError && (
            <div 
              className="flex flex-col gap-2 p-4 border border-solid border-[#BA7517]/50 bg-[#FAEEDA] text-[#854F0B]"
              role="alert"
            >
              <div className="font-bold flex items-center gap-2 font-(--font-fustat)">
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
                <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
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
