import React from 'react'
import styles from './the_solution.module.css'
import SectionHeading from '@/src/common/section_heading/SectionHeading'
import { ProcessList } from './ProcessCard/cards_process'

function ApprovedCard() {
  return (
    <div className={styles.card}>
      <div className='flex flex-col md:gap-3.5 gap-4.5'>
        <span className={styles.accepted_tag}>
          <img
            src="/lock_open.svg"
            alt="Unlocked padlock icon indicating loan approval"
            className="sm:h-3.5 h-2.5 w-auto object-cover"
          />
          <div className={styles.accepted_tag_text}>
            APPROVED
          </div>
        </span>
        <div className={styles.solution_card_title}>Money in your account.</div>
      </div>          
      <div className={styles.description}>
        The loan is disbursed directly to you. Your advisor confirms everything is settled before we close the case. We only get paid when you do.
      </div>
    </div>
  )
}

export function IssuesFound() {
  return (
    <div className={styles.card} style={{ background: 'var(--secondary-yellow)' }}>
      <div className='flex flex-col md:gap-3.5 gap-4.5'>
        <span className={styles.issues_tag}>
          <img
            src="/issue_found.svg"
            alt="Alert icon indicating issues found and rectified"
            className="sm:h-3.5 h-2.5 w-auto object-cover"
          />
          <div className={styles.problem_tag_text}>
            ISSUES FOUND
          </div>
        </span>
        <div className={styles.solution_card_title}>We identify it and fix it.</div>
      </div>          
      <div className={styles.description}>
        Your advisor pinpoints exactly what the lender flagged, works with you to resolve it, and resubmits. We do not abandon a case — we keep going until there is a clear answer.
      </div>
    </div>
  )
}

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
      <SectionHeading caption='WE ARE HERE' heading={<>One platform that<br/>handles everything for you</>} align="center" inverted={true} />
      <div className={styles.subheading}>
        From finding the right lender to disbursement, we manage every step. One<br className='sm:flex hidden'/> person, one dashboard, no runaround.
      </div>
      <img
        src="/the_solution/the_solution.svg"
        alt="Process flow mapping the Paisa Rupay journey"
        className="h-auto md:w-[50%] w-[90%] object-cover mx-auto md:my-20 my-10"
      />
      <ProcessList processes={processes} />
      <div className={`sm:max-w-[90%] w-full sm:px-0 px-4 sm:mt-20 mx-auto flex flex-col sm:gap-10 gap-6`}>
        <div className={styles.heading}>We always chase a clear outcome <br className='sm:flex hidden' />rather than an endless run</div>
        <div className='flex md:flex-row flex-col lg:gap-10 md:gap-8 sm:gap-6 gap-4 items-center'>
          <ApprovedCard />
          <div className='w-full flex flex-row gap-2 items-center md:hidden'>
            <div className='h-[0.5px] bg-(--background) w-full' style={{opacity: 0.5}}></div>
            <div className={styles.or}>OR</div>
            <div className='h-[0.5px] bg-(--background) w-full' style={{opacity: 0.5}}></div>
          </div>
          <div className={`${styles.or} hidden md:flex`}>OR</div>
          <IssuesFound />
        </div>
        <div className={styles.rejection_card}>
          <img
            src="/heart.svg"
            alt="Heart icon representing clear outcome policy"
            className="sm:h-6 h-auto sm:w-auto w-4 object-cover"
          />
          <div className='flex flex-col justify-between sm:gap-0 gap-10'>
            <div className={styles.rejection_headline}>
              Sometimes the answer is not right now — and we will tell you that.
            </div>
            <div className={styles.rejection_description}>
              In possible cases where a loan genuinely cannot move forward, we will not keep you waiting or give you false hope. We will tell you exactly where things stand, why it happened, and what your real options are from here. You will always leave with a clear picture and a path forward — even if that path is not with us today.
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
