'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from './header.module.css';

export default function Header() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

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

    const menuItems = [
        { image: '/loan_grid_images/cash_coins_white_band_fixed_transparent.svg', label: 'Home', selected: false },
        { image: '/loan_grid_images/house_icon_transparent.png', label: 'Contact Us', selected: false },
        { image: '/loan_grid_images/car_loan_icon_transparent.png', label: 'Free Consultation', selected: false },
        { image: '/loan_grid_images/gold_loan_icon_transparent.svg', label: 'Apply For Loan', selected: false },
        { image: '/loan_grid_images/property_loan_icon_transparent.svg', label: 'Banker Partnership Program', selected: false },
    ]

    return (
        <div
            className='w-full sticky top-0 bg-(--background) transition-transform duration-300 z-50 items-center'
            style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
        >
            <div className='flex flex-row sm:px-0 px-4 justify-between sm:max-w-[90%] w-full py-8 mx-auto'>
                <i className="ti ti-menu-2 text-white md:hidden visible self-center" style={{ fontSize: '24px' }}></i>
                <div className='flex-row gap-8 align-middle md:flex hidden'>
                    {menuItems.map((menu) => (
                        <div key={menu.label} className={`${menu.selected ? styles.menu_item_selected : styles.menu_item}`}>
                            {menu.label}
                        </div>
                    ))}
                </div>
                <img
                    src="./logo/paisa_rupay_logo_v2.svg"
                    alt="Paisa Rupay logo"
                    className="md:h-10 h-8 w-auto object-contain cursor-pointer"
                />
            </div>
        </div>
    )
}