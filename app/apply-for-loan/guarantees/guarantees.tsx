import React from 'react'
import styles from './guarantees.module.css';
import Image from 'next/image';

function Guarantee({ icon, information, alt }: { icon: string, information: string, alt: string }) {
    return (
        <div className={styles.guarantee}>
            <div className='flex bg-(--secondary-green) sm:h-12 sm:w-12 md:h-10 md:w-10 h-6 w-6 items-center justify-center rounded-md shrink-0'>
                <Image height={100} width={100} src={icon} alt={alt} className="sm:h-6 md:h-4 h-3 w-auto object-cover" />
            </div>
            <div className={styles.text}>
                {information}
            </div>
        </div>
    )
}

export default function Guarantees() {
    return (
        <div className='flex flex-col gap-6 mt-20'>
            <Guarantee icon="/shield_green.svg" alt="Security Shield" information='Your data is never shared without your approval.' />
            <Guarantee icon="/call_green.svg" alt="Phone Receiver" information='No spam calls. Only your assigned advisor will contact you.' />
            <Guarantee icon="/clock.svg" alt="Clock Icon" information='We get back to you within 24 hours, always.' />
        </div>
    )
}
