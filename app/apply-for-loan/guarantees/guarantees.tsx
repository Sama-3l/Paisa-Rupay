import React from 'react'
import styles from './guarantees.module.css';

function Guarantee({icon, information} : {icon : string, information: string}){
    return (
        <div className={styles.guarantee}>
            <div className='flex bg-(--secondary-green) sm:h-12 sm:w-12 h-6 w-6 items-center justify-center rounded-md'>
                <img src={icon} alt="Shield" className="sm:h-6 h-3 w-auto object-cover" />
            </div>
            <div className={styles.text}>
                {information}
            </div>
        </div>
    )
}

export default function Guarantees() {
  return (
    <div className='flex flex-col gap-6'>
        <Guarantee icon="/shield_green.svg" information='Your data is never shared without your approval.'/>
        <Guarantee icon="/call_green.svg" information='No spam calls. Only your assigned advisor will contact you.'/>
        <Guarantee icon="/clock.svg" information='We get back to you within 24 hours, always.'/>
    </div>
  )
}
