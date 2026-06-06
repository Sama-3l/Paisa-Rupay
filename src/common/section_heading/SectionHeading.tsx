import React from 'react'
import styles from './SectionHeading.module.css';

export default function sectionHeading({caption, heading} : {caption : string, heading : string}) {
  return (
    <div className='flex flex-col max-w-[40%] gap-2'>
        <div className={styles.caption}>{caption}</div>
        <div className={styles.heading}>{heading}</div>
    </div>
  )
}
