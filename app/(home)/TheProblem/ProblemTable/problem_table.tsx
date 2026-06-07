// import React from 'react'

// const problems = [
//   {
//     id: 1,
//     title: 'Nobody tells you the full cost',
//     description: 'Processing charges, prepayment penalties, late fees — you only find out about them after you have already signed the papers.',
//     tag: 'HIDDEN FEES',
//     icon: 'hidden_fees.svg',
//   },
//   {
//     id: 2,
//     title: 'Every bank wants the same forms again',
//     description: 'Each lender has its own process and its own paperwork. You spend weeks repeating yourself and still leave without a clear answer.',
//     tag: 'BANK VISITS',
//     icon: 'bank_visits.svg',
//   },
//   {
//     id: 3,
//     title: 'Your loan lives across six different tabs',
//     description: 'Agent calls, bank emails, loan portals — there is no single place to see where things actually stand with your application.',
//     tag: 'MULTIPLE POCs*',
//     icon: 'multiple_pocs.svg',
//   },
//   {
//     id: 4,
//     title: 'One inquiry turns into weeks of calls',
//     description: 'The moment you show interest, your number gets shared. Lenders you never contacted start calling and they do not stop.',
//     tag: 'SPAM CALLS',
//     icon: 'spam_calls.svg',
//   },
//   {
//     id: 5,
//     title: 'You apply without knowing your chances',
//     description: 'There is no way to know if a bank will approve you before you apply. Every rejection quietly leaves a mark on your credit score.',
//     tag: 'BLIND APPLICATIONS',
//     icon: 'blind_applications.svg',
//   },
//   {
//     id: 6,
//     title: 'You never know who sees your documents',
//     description: 'PAN card, income proof, bank statements — once you hand them over, you have no visibility into who they are shared with next.',
//     tag: 'DATA SAFETY',
//     icon: 'data_safety.svg',
//   },
// ]

// function ProblemCard({ problem }: { problem: (typeof problems)[0] }) {
//   return (
//     <div style={styles.card}>
//       {/* flex flex-col — 3 elements */}
//       <div style={styles.cardInner}>
//         {/* Element 1: Header row */}
//         <div style={styles.cardHeader}>
//           <span style={{ ...styles.tag }}>
//             <img
//                 src={`./problem_icons/${problem.icon}`}
//                 alt="Banking"
//                 className="sm:h-3 h-2.5 w-auto object-cover"
//             />
//             <div style={styles.tagText}>
//                 {problem.tag}
//             </div> 
//           </span>
//         </div>

//         {/* Element 2: Title */}
//         <div style={styles.cardTitle}>{problem.title}</div>

//         {/* Element 3: Description */}
//         <div style={styles.cardDescription}>{problem.description}</div>
//       </div>
//     </div>
//   )
// }

// export default function ProblemTable() {
//   return (
//     <>
//       <style>{`
//         /* Single-side border pattern: container owns top+left,
//            each cell owns right+bottom — no border ever touches another. */

//         .problem-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 0;
//           width: 100%;
//           border-top: 0.5px solid rgba(186, 186, 186, 0.5);
//           border-left: 0.5px solid rgba(186, 186, 186, 0.5);
//         }

//         .problem-grid > * {
//           border-right: 0.5px solid rgba(186, 186, 186, 0.5);
//           border-bottom: 0.5px solid rgba(186, 186, 186, 0.5);
//         }

//         /* Tablet: 2 columns × 3 rows */
//         @media (max-width: 1024px) and (min-width: 641px) {
//           .problem-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         /* Mobile: 1 column × 6 rows */
//         @media (max-width: 640px) {
//           .problem-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>

//       <div style={styles.wrapper}>
//         <div className="problem-grid">
//           {problems.map((p) => (
//             <ProblemCard key={p.id} problem={p} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: {
//     width: '100%',
//     marginTop: '80px',
//   },
//   card: {
//     padding: '24px 20px',
//     transition: 'background 0.15s ease',
//   },
//   cardInner: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px',
//   },
//   cardHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardId: {
//     fontSize: '11px',
//     fontWeight: 600,
//     letterSpacing: '0.08em',
//     color: '#9ca3af',
//     textTransform: 'uppercase',
//   },
//   tag: {
//     fontFamily: 'var(--font-fustat)',
//     borderRadius: "0px",
//     borderStyle: "solid",
//     borderWidth: "0.5px",
//     borderColor: 'rgba(var(--radial-rgb, 255, 109, 40), 0.5)',
//     background: 'radial-gradient(circle at center, rgba(var(--radial-rgb, 255, 109, 40), var(--start-opacity, 0)) 0%, rgba(var(--radial-rgb, 255, 109, 40), var(--end-opacity, 0.4)) var(--radial-distance, 200%))',
//     outline: "none",
//     display: "flex",
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: '12px',
//     fontSize: 'var(--caption)',
//     fontWeight: 400,
//     letterSpacing: '10%',
//     color: '#FF6D28',
//     textTransform: 'uppercase',
//     padding: '8px 12px',
//   },
//   tagText: {
//     marginTop: '1.5px', 
//   },
//   cardTitle: {
//     fontFamily: 'var(--font-fustat)',
//     fontSize: 'var(--heading5)',
//     fontWeight: 600,
//     color: 'var(--foreground)',
//     letterSpacing: "-2.5%",
//     lineHeight: "var(--heading5)"
//   },
//   cardDescription: {
//     fontFamily: 'var(--font-fustat)',
//     fontSize: 'var(--paragraph)',
//     color: '#6b7280',
//     fontWeight: 400,
//     lineHeight: 1.55,
//   },
// }

import React from 'react'
import styles from './problem_table.module.css'

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
  {
    id: 4,
    title: 'One inquiry turns into weeks of calls',
    description: 'The moment you show interest, your number gets shared. Lenders you never contacted start calling and they do not stop.',
    tag: 'SPAM CALLS',
    icon: 'spam_calls.svg',
  },
  {
    id: 5,
    title: 'You apply without knowing your chances',
    description: 'There is no way to know if a bank will approve you before you apply. Every rejection quietly leaves a mark on your credit score.',
    tag: 'BLIND APPLICATIONS',
    icon: 'blind_applications.svg',
  },
  {
    id: 6,
    title: 'You never know who sees your documents',
    description: 'PAN card, income proof, bank statements — once you hand them over, you have no visibility into who they are shared with next.',
    tag: 'DATA SAFETY',
    icon: 'data_safety.svg',
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