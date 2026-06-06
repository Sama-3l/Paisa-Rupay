import SectionHeading from '@/src/common/section_heading/SectionHeading'
import React from 'react'

export default function TheProblem() {
  return (
    <div className='sm:max-w-[90%] w-full sm:px-0 px-4 self-center py-20'>
        <SectionHeading caption='THE PROBLEM' heading={<>Loans in India are <br></br> completely broken</>}/>
    </div>
  )
}
