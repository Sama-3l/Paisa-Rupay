import React from 'react'
import SectionHeading from '@/src/common/section_heading/SectionHeading';
import LoanGrid from './LoanGrid/loan_grid';

export default function OurLoans() {
  return (
    <div className='pt-20 w-[90%] self-center'>
        <SectionHeading caption="OUR LOANS" heading="The right lender for every kind of borrower." />        
        <LoanGrid />
    </div>
  )
}
