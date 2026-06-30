import SectionHeading from '@/src/common/section_heading/SectionHeading'
import React from 'react'
import styles from './refer.module.css'
import ReferForm from './refer_form/ReferForm'
import StepsList from '../apply-for-loan/StepsList/steps_list'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Refer & Earn",
  description: "Share your referral code with anyone who needs a loan. When their loan gets approved, you earn a reward — and they get a cashback on their fees.",
  openGraph: {
    title: "Refer & Earn | Paisa Rupay",
    description: "Share your referral code with anyone who needs a loan. When their loan gets approved, you earn a reward — and they get a cashback on their fees.",
    url: "https://paisarupay.com/refer-n-earn",
    type: "website",
  },
};

export default function ReferEarn() {
  return (
    <div className='sm:pt-20 pt-12 sm:w-[90%] w-full sm:px-0 px-4 self-center sm:pb-40 pb-20'>
        {/* SEO Best Practices: Heading Structure */}
        <h1 className="sr-only">Refer & Earn</h1>
        <SectionHeading heading={<>Know someone who needs a loan? <br/>Help them. Earn from it.</>} caption="REFER & EARN"/>
        <p className={`w-full ${styles.para} pt-4 sm:max-w-[60%]`}>
            Share your referral code with anyone who needs a loan. When their loan gets approved, you earn a reward and they get a cashback on their fees. Everyone wins.
        </p>
        <div className='flex flex-col w-full gap-4 sm:hidden sm:mt-0 my-20'>
            <div className={styles.caption}>GET YOUR REFERRAL CODE</div>
            <ReferForm />
            <p className={`w-full ${styles.para} py-4 mb-2`}>
                Your code is tied to your phone number. Anyone who uses it and gets their loan approved earns you a reward.
            </p>
        </div>
        <div className='w-full flex sm:flex-row flex-col gap-6 my-20'>
            <div className='w-full bg-(--primary)/20 p-4 sm:gap-20 gap-15 flex flex-col border-[0.5] border-(--primary)/50'>
                <div className='flex flex-col gap-2'>
                    <div className={`${styles.caption}`}>YOU GET</div>
                    <div className={`${styles.rejection_headline}`}>A reward for every approved loan.</div>
                </div>
                <div className=''>
                    <div className={`${styles.rejection_description}`}>Every time someone uses your code and their loan is disbursed, you earn. No limit on how many people you can refer.</div>
                </div>
            </div>
            <div className='w-full bg-(--tertiary-green) p-4 gap-20 flex flex-col border-[0.5] border-(--primary-green)/50'>
                <div className='flex flex-col gap-2'>
                    <div className={`${styles.caption} text-(--primary-green)!`}>THEY GET</div>
                    <div className={`${styles.rejection_headline}`}>A cashback on their loan fees.</div>
                </div>
                <div className=''>
                    <div className={`${styles.rejection_description}`}>Anyone who applies with your referral code gets a fee cashback once their loan is approved and disbursed.</div>
                </div>
            </div>
        </div>
        <div className='flex sm:flex-row flex-col sm:gap-20 gap-10'>
            <span className='w-full'>  
                <StepsList margin='mt-0' steps={[
                    {
                        title: "Generate your code",
                        description:
                        "Enter your name and phone number and get a unique referral code instantly. It is yours to keep and share as many times as you want.",
                    },
                    {
                        title: "Share it with someone who needs a loan",
                        description:
                        "Send them your link or code. When they apply, your code gets attached to their application automatically.",
                    },
                    {
                        title: "They apply. We handle everything.",
                        description:
                        "Our team matches them to the right lender and manages the entire process. You do not have to follow up on anything.",
                    },
                    {
                        title: "Loan approved and you both earn",
                        description:
                        "Once their loan is disbursed, your reward is processed and their fee cashback is applied. Both happen automatically.",
                    },
                    ]} 
                />
            </span>
            <div className='sm:flex hidden sm:flex-col w-full gap-4'>
                <div className={styles.caption}>GET YOUR REFERRAL CODE</div>
                <ReferForm />
                <p className={`w-full ${styles.para} py-4 mb-2`}>
                    Your code is tied to your phone number. Anyone who uses it and gets their loan approved earns you a reward.
                </p>
            </div>            
        </div>
        <div className={styles.good_to_know}>
            <div className={styles.good_to_know_headline}>Good to know</div>
            <ul className={styles.fine_print_list}>
                <li>Rewards are processed after the referred loan is fully disbursed and not on application or approval alone. This means both you and your referee can trust that the reward is real and confirmed, not a promise that falls through later.</li>
                <li>There is no limit on how many people you can refer. The more that get approved, the more you earn. Share your code freely since every successful loan counts towards your rewards.</li>
                <li>The fee cashback goes directly to the person who used your code, they do not need to do anything extra. It gets applied automatically once their loan is disbursed, no claims, no follow-ups needed. We'll reach out to you regarding the same</li>
                <li>Your referral code is tied to your phone number and is unique to you. Keep it safe and only share it with people you are referring so, do not post it publicly.</li>
            </ul>
        </div>
    </div>
  )
}
