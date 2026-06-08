import React from 'react'
import styles from './process_card.module.css'

export default function ProcessCard({cardBackground, headline, description, number} : {cardBackground : string, headline : React.ReactNode, description : string, number : string}) {
  return (
    <div className='relative w-full h-[200px] md:h-[500px] bg-(--card) overflow-hidden border border-white/5'>
        <img
            src={`./the_solution/${cardBackground}`}
            alt="Banking"
            className="h-full w-auto object-cover md:object-fill ml-auto opacity-30 md:opacity-100 select-none pointer-events-none"
        />  

        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10">
            <span className='flex justify-between items-center gap-4'>
                <span className={styles.headline}>{headline}</span>
                <span className={styles.number}>00{number}</span>
            </span>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    </div>
  )
}
