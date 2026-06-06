import React from 'react'
import SectionHeading from '@/src/common/section_heading/SectionHeading';
import LoanGrid from './LoanGrid/loan_grid';

export default function OurLoans() {
  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center'>
        <SectionHeading caption="OUR LOANS" heading={<>The right lender for <br /> every kind of borrower. </>}/>        
        <LoanGrid />
    </div>
  )
}
