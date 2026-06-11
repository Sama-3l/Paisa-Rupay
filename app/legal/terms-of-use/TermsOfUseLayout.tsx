"use client"
import SectionHeading from '@/src/common/section_heading/SectionHeading'
import styles from '../legal.module.css'

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center sm:pb-40 pb-20'>
      <SectionHeading heading="Terms of Use" caption="LEGAL" />
      <div className='bg-(--placeholder)/30 h-[0.5px] w-full mt-40'></div>
      <div className='flex flex-row mt-15'>
        <div className={styles.date_text}>Last Updated<br />June 11th, 2026</div>
        <div className={styles.prose}>
          {children}
        </div>
      </div>
    </div>
  )
}