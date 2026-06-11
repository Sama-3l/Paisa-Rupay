import SectionHeading from '@/src/common/section_heading/SectionHeading'
import React from 'react'
import styles from './banker_partnership.module.css'
import BankerForm from './banker_form/BankerForm'
import StepsList from '../apply-for-loan/StepsList/steps_list'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Banker Partnership Program",
  description: "Partner with Paisa Rupay. Refer leads for business or personal loans, and earn transparent commissions upon successful disbursement.",
  openGraph: {
    title: "Banker Partnership Program | Paisa Rupay",
    description: "Partner with Paisa Rupay. Refer leads for business or personal loans, and earn transparent commissions upon successful disbursement.",
    url: "https://paisarupay.com/banker-partnership",
    type: "website",
  },
};

export default function BankerPartnership() {
    const bankers = [
        "Bank employees",
        "DSAs",
        "Chartered Accountants",
        "Financial advisors"
    ]
  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center sm:pb-40 pb-20'>
        {/* SEO Best Practices: Heading Structure */}
        <h1 className="sr-only">Banker Partnership Program</h1>
        <SectionHeading heading={<>Your network has value. <br/>Earn from it.</>} caption="BANKER CONSULTATION PROGRAM"/>
        <p className={`w-full ${styles.para} py-4 sm:max-w-[60%] mb-2`}>
            If you work in finance and regularly come across people who need loans, partner with us. You send the leads, we handle everything else, and you earn a commission on every successful disbursement.
        </p>
        <div className='flex sm:flex-row flex-wrap sm:gap-x-4 gap-x-2 sm:gap-y-0 gap-y-2 sm:gap-6'>
            {bankers.map((e) => (
                <div className={styles.tag} key={e}>
                    <div className='h-2 w-2 bg-(--primary) rounded-full' />
                    {e}
                </div>
            ))}
        </div>
        <div className='flex sm:flex-row flex-col sm:gap-20 gap-10 sm:mt-20 mt-10'>
            <div className='flex flex-col w-full gap-4'>
                <div className={styles.caption}>REGISTER YOUR INTEREST</div>
                <BankerForm />
                <p className={`w-full ${styles.para} py-4 mb-2`}>
                    One of our sales executives will reach out to you within 24 hours to walk you through the program.
                </p>
            </div>
            <span className='w-full'>  
                <StepsList margin='mt-0' steps={[
                    {
                        title: "You register and we call you",
                        description:
                        "A sales executive walks you through the program, answers your questions, and gets you set up.",
                    },
                    {
                        title: "You send us leads",
                        description:
                        "Share details of people you know who need a loan. One at a time or in bulk, both are welcome.",
                    },
                    {
                        title: "We handle everything from here",
                        description:
                        "Our team takes it forward with matching, paperwork, lender communication, disbursement. You do not have to follow up on anything.",
                    },
                    {
                        title: "You earn on every successful loan",
                        description:
                        "When a lead converts and the loan is disbursed, you earn your commission. Tracked and paid out transparently.",
                    },
                    ]} 
                />
            </span>
        </div>
        <div className={styles.rejection_card}>
          <Image
            height={100}
            width={100}
            src="/heart.svg"
            alt="Real results commission model representation"
            className="sm:h-6 h-3 w-auto object-cover"
          />
          <div className='flex flex-col justify-between sm:gap-0 gap-10'>
            <div className={styles.rejection_headline}>
              We only pay on real results.
            </div>
            <div className={styles.rejection_description}>
              Commissions are tied to successful disbursements nor inquiries and neither applications. So when you earn, it means someone actually got their loan. That keeps things honest on both sides.
            </div>
          </div>
        </div>
    </div>
  )
}
