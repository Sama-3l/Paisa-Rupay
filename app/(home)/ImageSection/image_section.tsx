import React from 'react'
import styles from './image_section.module.css';

export default function ImageSection() {
  return (
    <div className='relative mt-20'>
        <img
            src="./section_images/banking.jpg"
            alt="Banking"
            className="h-auto w-full object-cover"
        />
      
        <div className="absolute inset-0 bg-[#141414] opacity-50" />
      

        <div className="absolute inset-0 flex flex-col justify-between p-3">
            <div className={styles.image_text_top}>
                You shouldn't have to <br /> visit 4 banks to get one loan.
            </div>
            <div className={styles.image_text_bottom}>
                We are here to fix exactly that.
            </div>
        </div>
    </div>
  )
}