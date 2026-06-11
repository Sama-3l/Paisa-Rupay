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
    const [headerHeight, setHeaderHeight] = useState(0);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 10) {
                setVisible(true);
            } else if (currentScrollY < lastScrollY.current) {
                setVisible(true);
            } else {
                setVisible(false);
                setDrawerOpen(false); // close menu when header hides
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Measure header height for dropdown positioning
    useEffect(() => {
        if (!headerRef.current) return;
        const observer = new ResizeObserver(() => {
            setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
        });
        observer.observe(headerRef.current);
        setHeaderHeight(headerRef.current.offsetHeight);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    const menuItems = [
        { label: 'Home', href: "/" },
        { label: 'Contact Us', href: "/contact-us" },
        { label: 'Apply For Loan', href: "/apply-for-loan" },
        { label: 'Free Consultation', href: "/free-consultation" },
        { label: 'Banker Partnership Program', href: "/banker-partnership" },
    ];

    // The dropdown top = header height, but if header is translated off-screen, shift up too
    const dropdownTop = visible ? headerHeight : 0;

    return (
        <>
            {/* Sticky header bar */}
            <div
                ref={headerRef}
                className='w-full sticky top-0 bg-(--background) transition-transform duration-300 z-50'
                style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
            >
                <div className='flex flex-row sm:px-0 px-4 justify-between sm:max-w-[90%] w-full py-6 mx-auto'>

                    {/* Animated menu/close button */}
                    <button
                        onClick={() => setDrawerOpen(o => !o)}
                        className={`md:hidden visible self-center text-white ${styles.menu_trigger_btn}`}
                        style={{ fontSize: '24px', width: '28px', height: '28px', position: 'relative' }}
                        aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        <span
                            style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'opacity 200ms ease, transform 200ms ease',
                                opacity: drawerOpen ? 0 : 1,
                                transform: drawerOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
                            }}
                            className="ti ti-menu-2"
                        />
                        <span
                            style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'opacity 200ms ease, transform 200ms ease',
                                opacity: drawerOpen ? 1 : 0,
                                transform: drawerOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
                            }}
                            className="ti ti-x"
                        />
                    </button>

                    {/* Desktop nav */}
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

                    <Link href="/">
                        <Image
                            src={logoImg}
                            alt="Paisa Rupay logo"
                            priority
                            className="md:h-10 h-8 w-auto object-contain cursor-pointer"
                        />
                    </Link>
                </div>
            </div>

            {/* Fixed dropdown — anchored just below the header */}
            <div
                style={{
                    position: 'fixed',
                    top: dropdownTop,
                    left: 0,
                    right: 0,
                    zIndex: 45,
                    transition: 'top 300ms ease',
                    maxHeight: drawerOpen ? 'calc(100dvh - ' + dropdownTop + 'px)' : '0px',
                    overflow: 'hidden',
                    // Also slide up with the header when it hides
                    transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                }}
                className='bg-(--background)'
            >
                <nav className="flex flex-col px-6 sm:px-12 py-4 gap-1">
                    {menuItems.map((menu) => {
                        const isSelected = pathname === menu.href;
                        return (
                            <Link
                                key={menu.label}
                                href={menu.href}
                                onClick={() => setDrawerOpen(false)}
                                className="flex items-center py-3 border-b border-[#453027]/30 last:border-0 transition-all group"
                            >
                                <span className={`${isSelected ? styles.menu_item_selected : styles.menu_item} text-base group-hover:text-[#FF6D28] transition-colors`}>
                                    {menu.label}
                                </span>
                            </Link>
                        );
                    })}
                    <div className="pt-4 pb-2 text-center">
                        <span className="text-[10px] text-white/40 font-sans">
                            © 2026 Paisa Rupay. All rights reserved.
                        </span>
                    </div>
                </nav>
            </div>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setDrawerOpen(false)}
            />
        </>
    );
}