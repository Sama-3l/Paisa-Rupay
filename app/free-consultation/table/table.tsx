import React from 'react'
import styles from './table.module.css'

const problems = [
    {
        id: 1,
        title: 'Nobody tells you the full cost',
        description: 'Processing charges, prepayment penalties, late fees — you only find out about them after you have already signed the papers.',
        tag: 'HIDDEN FEES',
        icon: 'hidden_fees.svg',
    },
    {
        id: 2,
        title: 'Every bank wants the same forms again',
        description: 'Each lender has its own process and its own paperwork. You spend weeks repeating yourself and still leave without a clear answer.',
        tag: 'BANK VISITS',
        icon: 'bank_visits.svg',
    },
    {
        id: 3,
        title: 'Your loan lives across six different tabs',
        description: 'Agent calls, bank emails, loan portals — there is no single place to see where things actually stand with your application.',
        tag: 'MULTIPLE POCs*',
        icon: 'multiple_pocs.svg',
    },
]

function ProblemCard({ problem }: { problem: (typeof problems)[0] }) {
    return (
        <div className={styles.problem_card}>
            {/* flex flex-col — 3 elements */}
            <div className={styles.problem_card_inner}>

                {/* Element 1: Header row */}
                <div className={styles.problem_card_header}>
                    <span className={styles.problem_tag}>
                        <img
                            src={`./problem_icons/${problem.icon}`}
                            alt="Banking"
                            className="sm:h-3 h-2.5 w-auto object-cover"
                        />
                        <div className={styles.problem_tag_text}>
                            {problem.tag}
                        </div>
                    </span>
                </div>

                {/* Element 2: Title */}
                <div className={styles.problem_card_title}>{problem.title}</div>

                {/* Element 3: Description */}
                <div className={styles.problem_card_description}>{problem.description}</div>

            </div>
        </div>
    )
}

export default function ProblemTable() {
    return (
        <div className={styles.problem_wrapper}>
            <div className={styles.problem_grid}>
                {problems.map((p) => (
                    <ProblemCard key={p.id} problem={p} />
                ))}
            </div>
        </div>
    )
}