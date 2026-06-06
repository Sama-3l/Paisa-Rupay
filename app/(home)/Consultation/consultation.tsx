import SectionHeading from '@/src/common/section_heading/SectionHeading'
import React from 'react'
import styles from './consultation.module.css';

export default function Consultation() {
  return (
    <div className='pt-40 w-[90%] self-center'>
        <SectionHeading caption="HAVE QUESTIONS?" heading="Stop chasing banks. Let the right one find you."/>
        <p className={`max-w-[40%] ${styles.para} py-4`}>
          One form. Multiple lenders. Zero spam. We match you to the bank most likely to approve your loan, before any fees or rejections.
        </p>
        <button>Get Free Consultation</button>
    </div>
  )
}
