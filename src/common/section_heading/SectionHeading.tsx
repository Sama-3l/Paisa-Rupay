import React from 'react'
import styles from './SectionHeading.module.css'

export default function SectionHeading({
  caption,
  heading,
  align = 'left',
  inverted = false,
}: {
  caption: string
  heading: React.ReactNode
  align?: 'left' | 'center' | 'right'
  inverted?: boolean
}) {
  return (
    <div className='flex flex-col gap-2' style={{ textAlign: align }}>
      <div
        className={styles.caption}
        style={inverted ? { color: 'var(--background)' } : undefined}
      >
        {caption}
      </div>
      <div className={styles.heading}>{heading}</div>
    </div>
  )
}