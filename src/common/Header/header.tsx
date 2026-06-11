'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/public/logo/paisa_rupay_logo_v2.svg';
import { usePathname } from 'next/navigation';


export default function Header() {
    const [visible, setVisible] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                // Always show at the very top
                setVisible(true);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up — show
                setVisible(true);
            } else {
                // Scrolling down — hide
                setVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    const menuItems = [
        { label: 'Home', selected: false, href: "/" },
        { label: 'Contact Us', selected: false, href: "/contact-us" },
        { label: 'Apply For Loan', selected: false, href: "/apply-for-loan" },
        { label: 'Free Consultation', selected: false, href: "/free-consultation" },
        { label: 'Banker Partnership Program', selected: false, href: "/banker-partnership" },
    ]

    return (
        <>
            <div
                className='w-full sticky top-0 bg-(--background) transition-transform duration-300 z-50 items-center'
                style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
            >
                <div className='flex flex-row sm:px-0 px-4 justify-between sm:max-w-[90%] w-full py-6 mx-auto'>
                    <Link href="/">
                        <Image
                            src={logoImg}
                            alt="Paisa Rupay logo"
                            priority
                            className="md:h-10 h-8 w-auto object-contain cursor-pointer"
                        />
                    </Link>

                    <div className='flex-row gap-8 align-middle md:flex hidden'>
                        {menuItems.map((menu) => {
                            const isSelected = pathname === menu.href;
                            return (
                                <Link
                                    key={menu.label}
                                    href={menu.href}
                                    className={`${isSelected ? styles.menu_item_selected : styles.menu_item}`}
                                >
                                    {menu.label}
                                </Link>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className={`ti ti-menu-2 text-white md:hidden visible self-center ${styles.menu_trigger_btn}`}
                        style={{ fontSize: '24px' }}
                        aria-label="Open navigation menu"
                    />
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[60] transition-opacity duration-500 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setDrawerOpen(false)}
            />

            {/* Full Screen Drawer */}
            <div
                className={`fixed inset-x-0 top-0 h-full w-full bg-[#161316]/98 z-[70] transition-transform duration-250 ease-out transform flex flex-col ${drawerOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex flex-row justify-between w-full py-6 px-6 sm:px-12">
                    <Link href="/" onClick={() => setDrawerOpen(false)}>
                        <Image
                            src={logoImg}
                            alt="Paisa Rupay logo"
                            priority
                            className="h-8 w-auto object-contain cursor-pointer"
                        />
                    </Link>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className={`ti ti-x text-white ${styles.menu_trigger_btn}`}
                        style={{ fontSize: '24px' }}
                        aria-label="Close navigation menu"
                    />
                </div>

                {/* Drawer Content - Nav Links */}
                <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-12 flex flex-col justify-between min-h-0">
                    <nav className="flex flex-col gap-3 sm:gap-6 my-auto py-4">
                        {menuItems.map((menu) => {
                            const isSelected = pathname === menu.href;
                            return (
                                <Link
                                    key={menu.label}
                                    href={menu.href}
                                    onClick={() => setDrawerOpen(false)}
                                    className="flex items-center gap-4 py-2 border-b border-[#453027]/30 last:border-0 transition-all group"
                                >
                                    <span className={`${isSelected ? styles.menu_item_selected : styles.menu_item} text-base sm:text-lg group-hover:text-[#FF6D28] transition-colors`}>
                                        {menu.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Drawer Footer */}
                    <div className="pt-6 pb-4 border-t border-[#453027]/40 flex flex-col gap-2 text-center shrink-0">
                        <div className="text-[10px] sm:text-xs text-white/50 font-sans">
                            © 2026 Paisa Rupay. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}