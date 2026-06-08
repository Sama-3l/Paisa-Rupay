import React from 'react'
import styles from './the_solution.module.css'
import SectionHeading from '@/src/common/section_heading/SectionHeading'
import ProcessCard from './ProcessCard/process_card'
import { ProcessList } from './ProcessCard/cards_process'

export default function TheSolution() {
  const processes = [
    { number: "1", cardBackground: 'card_1.svg', headline: <>You pick your loan and reach out.</>, description: 'Choose the loan type you need and submit your details. It takes under three minutes and you will hear from us the same day. No documents needed at this stage — just the basics.' },
    { number: "2", cardBackground: 'card_2.svg', headline: <>Your dedicated advisor calls you back.</>, description: 'A real person from our team reaches out to understand your situation. No bots, no scripts — just an honest conversation about what you need. Your advisor will also share a little about themselves so you know exactly who you are dealing with from day one.' },
    { number: "3", cardBackground: 'card_3.svg', headline: <>You get a document list and the complete fee structure.</>, description: 'Your advisor sends you exactly what documents are needed and a transparent breakdown of every fee involved — before anything moves forward. Processing fees, prepayment terms, late payment charges — all of it laid out clearly so there are no surprises later.' },
    { number: "4", cardBackground: 'card_4.svg', headline: <>We prepare your file and match<br></br>you to the right lender.</>, description: 'Your advisor manages all communication with the lender on your behalf. You never have to talk to the bank directly unless you want to. Every update, every follow-up, every back and forth — they handle it and keep you informed throughout.' },
    { number: "5", cardBackground: 'card_5.svg', headline: <>The lender reviews your application.</>, description: 'Once everything is in order, your advisor confirms the approval and stays available until the money is disbursed and settled. We only get paid when the loan lands in your account — so our job is not done until yours is.' }
  ]

  return (
    <div className={styles.wrapper}>
      <SectionHeading caption='WE ARE HERE' heading={<>One platform that<br />handles everything for you</>} align="center" inverted={true} />
      <div className={styles.subheading}>
        From finding the right lender to disbursement, we manage every step. One<br />person, one dashboard, no runaround.
      </div>
      <img
        src="./the_solution/the_solution.svg"
        alt="Banking"
        className="h-auto md:w-[50%] w-[90%] object-cover mx-auto md:my-20 my-10"
      />
      <ProcessList processes={processes} />
      <div className={`${styles.heading} ml-4`}>
        We always chase a clear outcome<br />rather than an endless run
      </div>
    </div>
  )
}
