import React, { ReactNode } from 'react'
import styles from './SectionHeading.module.css';

export default function sectionHeading({caption, heading} : {caption : string, heading : React.ReactNode}) {
  return (
    <div className='flex flex-col gap-2'>
        <div className={styles.caption}>{caption}</div>
        <div className={styles.heading}>{heading}</div>
    </div>
  )
}
