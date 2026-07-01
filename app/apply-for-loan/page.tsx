import React from 'react';
import type { Metadata } from 'next';
import SectionHeading from '@/src/common/section_heading/SectionHeading';
import styles from './loan_application.module.css';
import ApplyForLoan from './form/ApplyForLoan';
import StepsList from './StepsList/steps_list';
import Guarantees from './guarantees/guarantees';

// SEO Best Practices: Metadata
export const metadata: Metadata = {
  title: 'Apply for a Loan',
  description: 'Apply for a loan with Paisa Rupay. Fill in our simple 3-minute form and get connected with the right business or personal lender within 24 hours.',
  openGraph: {
    title: 'Apply for a Loan | Paisa Rupay',
    description: 'Apply for a loan with Paisa Rupay. Fill in our simple 3-minute form and get connected with the right business or personal lender within 24 hours.',
    url: 'https://paisarupay.com/apply-for-loan',
    type: 'website',
  },
};

export interface PageProps {
  searchParams: Promise<{ loan?: string; ref?: string }>;
}

export default async function LoanApplication({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const preselected = resolvedParams.loan ?? '';
  const preselectedRef = resolvedParams.ref ?? '';

  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center sm:pb-40 pb-20'>
      {/* SEO Best Practices: Heading Structure */}
      <h1 className="sr-only">Apply for a Loan</h1>
      <SectionHeading caption="YOUR APPLICATION" heading={<>Let us find you <br />the right lender.</>} />
      <p className={`w-full ${styles.para} py-4`}>
        Fill this in and your advisor will call you with further details within 24 hours.
      </p>
      <ApplyForLoan preselected={preselected} preselectedRef={preselectedRef} />
      <SectionHeading caption="WHAT HAPPENS NEXT" heading={<>Here is what the <br />next 24 hours look like.</>} />
      <div className='flex md:flex-row flex-col justify-between'>
        <StepsList />
        <Guarantees />
      </div>
    </div>
  );
}
