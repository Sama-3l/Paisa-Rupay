import React from 'react';
import type { Metadata } from 'next';
import SectionHeading from '@/src/common/section_heading/SectionHeading';
import styles from './loan_application.module.css';
import ApplyForLoan from './form/ApplyForLoan';
import StepsList from './StepsList/steps_list';
import Guarantees from './guarantees/guarantees';

// SEO Best Practices: Metadata
export const metadata: Metadata = {
  title: 'Apply For Loan | Paisa Rupay',
  description: 'Apply for a loan with Paisa Rupay. Fill in the form and get connected with the right lender within 24 hours.',
};

export interface PageProps {
  searchParams: Promise<{ loan?: string }>;
}

export default async function LoanApplication({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const preselected = resolvedParams.loan ?? "";

  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center sm:pb-40 pb-20'>
      {/* SEO Best Practices: Heading Structure */}
      <h1 className="sr-only">Apply for a Loan</h1>
      <SectionHeading caption="YOUR APPLICATION" heading={<>Let us find you <br />the right lender.</>} />
      <p className={`w-full ${styles.para} py-4`}>
        Fill this in and your advisor will call you with further details within 24 hours.
      </p>
      <ApplyForLoan preselected={preselected} />
      <SectionHeading caption="WHAT HAPPENS NEXT" heading={<>Here is what the <br />next 24 hours look like.</>} />
      <StepsList />
      <Guarantees />
    </div>
  );
}
