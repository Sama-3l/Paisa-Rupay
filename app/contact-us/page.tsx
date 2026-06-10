import React from 'react';
import type { Metadata } from 'next';
import styles from './contact_us.module.css';
import SectionHeading from '@/src/common/section_heading/SectionHeading';
import ContactForm from './form/ContactForm';

// SEO Best Practices: Metadata
export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Reach out to Paisa Rupay. We are easier to reach than your bank. Drop us a message with any questions, concerns, or queries.',
    openGraph: {
        title: 'Contact Us | Paisa Rupay',
        description: 'Reach out to Paisa Rupay. We are easier to reach than your bank. Drop us a message with any questions, concerns, or queries.',
        url: 'https://paisarupay.com/contact-us',
        type: 'website',
    },
};

export default function ContactUs() {
    return (
        <div className='w-full'>
            <div className='relative'>
                <img
                    src="/contact_us/Contact_Us.png"
                    alt="Paisa Rupay customer service representatives assisting a client"
                    className="sm:h-[50vw] h-auto w-full object-cover object-[center-50%]"
                />


                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-8">
                    <div className={styles.image_text_top}>
                        <span className={`flex flex-row w-full justify-between ${styles.hero_text}`}>
                            <div>Get</div>
                            <div>In</div>
                            <div>Touch</div>
                        </span>
                    </div>
                    {/* SEO Best Practices: Heading Structure */}
                    <h1 className="sr-only">Contact Paisa Rupay</h1>
                    <SectionHeading caption="CONTACT US" heading={<>
                        We are easier to <br className='sm:flex hidden' /> reach than your bank.</>} />
                    <div className={styles.image_text_top}>
                        <span className={`flex flex-row w-full justify-between ${styles.hero_text}`}>
                            <div>Paisa</div>
                            <div>Rupay</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center sm:mt-20 mt-8 mb-40'>
                <div className={styles.description}>
                    Whether you have a question, a concern, or just want to understand your options, reach out and someone will get back to you within the same day.
                </div>

                {/* Interactive Client Component Form */}
                <ContactForm />
            </div>
        </div>
    );
}

