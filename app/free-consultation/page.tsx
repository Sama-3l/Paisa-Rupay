import SectionHeading from '@/src/common/section_heading/SectionHeading';
import { Metadata } from 'next';
import React from 'react';
import styles from './free_consultation.module.css';
import FreeConsultationForm from './form/FreeConsultationForm';
import ProblemTable from './table/table';

// SEO Best Practices: Metadata
export const metadata: Metadata = {
  title: 'Free Consultation | Paisa Rupay',
  description: 'Request a free 15-minute consultation with a Paisa Rupay advisor. Understand where you stand and find your best loan options with zero fees and zero commitment.',
};

export default function FreeConsultation() {
  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center flex flex-col gap-4 items-center sm:mb-60 mb-40'>
      {/* SEO Best Practices: Heading Structure */}
      <h1 className="sr-only">Free Consultation</h1>
      <SectionHeading caption="GET FREE CONSULTATION" heading={<>Not sure where to start?<br />Let us figure it out together.</>} align='center' />
      <p className={`w-full ${styles.para} py-4 sm:max-w-[60%] mx-auto mb-20`}>
        No commitment, no paperwork, no fees. Just a 15-minute call with an advisor who will tell you exactly where you stand and what your options look like.
      </p>
      <FreeConsultationForm />
    </div>
  );
}
