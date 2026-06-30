'use client';

import React, { useActionState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { OrangeRadialDropdown } from '@/src/common/Dropdown/OrangeRadialDropdown';
import { submitLoanForm } from '@/src/domain/actions';
import { LoanFormState, LOAN_OPTIONS } from '@/src/lib/types';
import styles from '@/src/common/form.module.css';
import Spinner from '@/src/common/Spinner/Spinner';
import { sendGAEvent } from '@next/third-parties/google'

const initialState: LoanFormState = {
  success: false,
};

interface ApplyForLoanProps {
  preselected?: string;
  preselectedRef?: string; // Populated from ?ref= URL param when user clicks a referral link
  margin?: string;
}

/**
 * Client-side component managing the Loan Application form.
 * Uses React 19 useActionState to manage state (idle, pending, success, error)
 * without sacrificing accessibility and SEO structure of page.tsx.
 */
export default function ApplyForLoan({ preselected = '', preselectedRef = '', margin = 'mt-10 mb-20' }: ApplyForLoanProps) {
  // Hook into our Server Action to receive form state outputs (success, errors, pending)
  const [state, formAction, isPending] = useActionState(submitLoanForm, initialState);

  return (
    <div className={`w-full ${margin}`}>
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
            Application Submitted!
          </h3>
          <p className={styles.submitted_para}>
            {state.message}
          </p>
        </div>
      ) : (
        /* ACTIVE / IDLE / LOADING STATE */
        <form action={formAction} className="flex flex-col w-full gap-6 mx-auto " onFocus={() => sendGAEvent('event', 'form_start', { form_name: 'apply_form' })} onSubmit={() => sendGAEvent('event', 'form_submit', { form_name: 'apply_form' })}>

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

          {/* LOAN TYPE DROPDOWN */}
          <div>
            <OrangeRadialDropdown
              title="loan type"
              name="loanType"
              options={LOAN_OPTIONS}
              required={true}
              defaultValue={preselected}
              placeholder="Select a loan type"
              disabled={isPending}
            />
            {state.errors?.loanType && (
              <span className="text-[#FF5C5C] text-xs font-(--font-fustat) mt-1 block">
                {state.errors.loanType}
              </span>
            )}
          </div>

          {/* REFERRAL CODE FIELD (optional) */}
          <div>
            <OrangeRadialInput
              title="referral code (optional)"
              name="referralCode"
              type="text"
              placeholder="Enter code if you have one"
              required={false}
              maxLength={8}
              defaultValue={preselectedRef}
              disabled={isPending}
            />
            {/* No error shown for referral code — invalid codes are silently ignored */}
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
