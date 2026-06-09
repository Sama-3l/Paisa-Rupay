'use client';

import React, { useActionState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { submitConsultationForm } from '@/src/domain/actions';
import { ConsultationFormState } from '@/src/lib/types';
import styles from './free_consultation.module.css';

const initialState: ConsultationFormState = {
  success: false,
};

/**
 * Client-side component managing the Free Consultation request form.
 * Uses React 19 useActionState to manage state (idle, pending, success, error)
 * without sacrificing accessibility and SEO structure of page.tsx.
 */
export default function FreeConsultationForm() {
  // Hook into our Server Action to receive form state outputs (success, errors, pending)
  const [state, formAction, isPending] = useActionState(submitConsultationForm, initialState);

  return (
    <div className="w-full">
      {state.success ? (
        /* SUCCESS STATE */
        <div className={styles.success_container}>
          <div className={styles.success_icon_wrapper}>
            <i className={`ti ti-circle-check ${styles.success_icon}`}></i>
          </div>
          <h3 className={styles.submitted_headline}>
            Request Submitted!
          </h3>
          <p className={styles.submitted_para}>
            {state.message}
          </p>
        </div>
      ) : (
        /* ACTIVE / IDLE / LOADING STATE */
        <form action={formAction} className={`${styles.form_container} w-full sm:px-0 px-4 mx-auto`}>

          {/* GLOBAL ERROR / RATE LIMIT STATE */}
          {state.globalError && (
            <div className={styles.error_alert} role="alert">
              <div className={styles.error_alert_header}>
                <i className={`ti ti-alert-triangle ${styles.error_alert_icon}`}></i>
                <span>Action Required</span>
              </div>
              <p className={styles.error_alert_text}>{state.globalError}</p>
            </div>
          )}

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
              <span className={styles.field_error}>
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
              <span className={styles.field_error}>
                {state.errors.phone}
              </span>
            )}
          </div>

          {/* COMMENT FIELD (Optional) */}
          <div>
            <OrangeRadialInput
              title="how can we help?"
              name="message"
              placeholder="Let us know what you want to discuss..."
              required={false}
              multiline={true}
              rows={4}
              disabled={isPending}
            />
            {state.errors?.message && (
              <span className={styles.field_error}>
                {state.errors.message}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isPending}
            className={styles.submit_button}
          >
            {isPending ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
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
