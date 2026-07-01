import React from 'react'
import styles from './footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import CookiePreferencesButton from './CookiePreferencesButton';


export default function Footer() {
    const socials = [
        {name: "Instagram", link: "https://www.instagram.com/paisarupay/"},
        // {name: "Twitter", link: ""},
        // {name: "Linkedin", link: ""},
    ]
    const sitemap = [
        {name: "Home", link: "/"},
        {name: "Contact Us", link: "/contact-us"},
        {name: "Apply For Loan", link: "/apply-for-loan"},
        {name: "Free Consultation", link: "/free-consultation"},
        {name: "Refer & Earn", link: "/refer-n-earn"},
        {name: "Banker Partnership Program", link: "/banker-partnership"},
    ]
    const terms = [
        {name: "Terms of Use", link: "/legal/terms-of-use"},
        {name: "Privacy Policy", link: "/legal/privacy-policy"},
        { name: "+91-77869-92638", link: "tel:+917786992638" },
        { name: "Email", link: "mailto:contact@paisarupay.com" },
    ]
  return (
    <div className='flex flex-col gap-20'>
        <div className={`flex-row justify-between ${styles.footer_links} md:px-12 px-4 pt-10 md:flex hidden`}>
            <div className='flex flex-col gap-4'>
                {socials.map((social) => (
                    <Link key={social.name} href={social.link}>{social.name}</Link>
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                {sitemap.map((site) => (
                    <Link key={site.name} href={site.link}>{site.name}</Link>
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                {terms.map((term) => (
                    <Link key={term.name} href={term.link}>{term.name}</Link>
                ))}
                <CookiePreferencesButton />
            </div>
        </div>
        <div className={`flex flex-row justify-between ${styles.footer_links} md:px-12 px-4 pt-10 md:hidden`}>
            <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-4'>
                    {sitemap.map((site) => (
                        <Link key={site.name} href={site.link}>{site.name}</Link>
                    ))}
                </div>
                <div className='flex flex-col gap-4'>
                    {socials.map((social) => (
                        <Link key={social.name} href={social.link}>{social.name}</Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-4 text-right items-end'>
                {terms.map((term) => (
                    <Link key={term.name} href={term.link}>{term.name}</Link>
                ))}
                <CookiePreferencesButton />
            </div>
        </div>
        <div className={`flex flex-row justify-between ${styles.copyright} sm:px-12 px-4 pt-10`}>
            <div>© 2026 Paisa Rupay</div>
            <div>Find the lender perfect for you.</div>
        </div>
        <Image
            height={100}
            width={100}
            src="/logo/footer_logo.svg"
            alt="Paisa Rupay - Find the lender perfect for you"
            className="h-auto w-full object-cover mx-auto sm:px-6 px-2 pb-2"
        />
    </div>
  )
}
