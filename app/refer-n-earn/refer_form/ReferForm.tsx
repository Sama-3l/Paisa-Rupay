'use client';

import React, { useActionState } from 'react';
import { OrangeRadialInput } from '@/src/common/InputField/OrangeRadialInput';
import { submitBankerForm } from '@/src/domain/actions';
import { BankerFormState } from '@/src/lib/types';
import styles from '@/src/common/form.module.css';
import Spinner from '@/src/common/Spinner/Spinner';
import { sendGAEvent } from '@next/third-parties/google';

const initialState: BankerFormState = {
  success: false,
};

export default function BankerForm() {
  const [state, formAction, isPending] = useActionState(submitBankerForm, initialState);

  return (
    <div className="w-full">
      {state.success ? (        
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
            Registration Submitted!
          </h3>
          <p className={styles.submitted_para}>
            {state.message}
          </p>
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
