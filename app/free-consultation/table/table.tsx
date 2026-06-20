import React from 'react'
import styles from './table.module.css'
import Image from 'next/image'
import { PROBLEMS, Problem } from '@/src/lib/data'

// First 3 problems shown on the free consultation page
const consultationProblems = PROBLEMS.slice(0, 3);

function ProblemCard({ problem }: { problem: Problem }) {
    return (
        <div className={styles.problem_card}>
            {/* flex flex-col — 3 elements */}
            <div className={styles.problem_card_inner}>

                {/* Element 1: Header row */}
                <div className={styles.problem_card_header}>
                    <span className={styles.problem_tag}>
                        <Image
                            height={100}
                            width={100}
                            src={`/problem_icons/${problem.icon}`}
                            alt={problem.tag}
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
                {consultationProblems.map((p) => (
                    <ProblemCard key={p.id} problem={p} />
                ))}
            </div>
        </div>
    )
}