import React from 'react'
import styles from './header.module.css';
import { Spacer } from '../spacer';

export default function Header() {
    const menuItems = [
        { image: '/loan_grid_images/cash_coins_white_band_fixed_transparent.svg', label: 'Home' , selected: false},
        { image: '/loan_grid_images/house_icon_transparent.png', label: 'Contact Us' , selected: false},
        { image: '/loan_grid_images/car_loan_icon_transparent.png', label: 'Free Consultation' , selected: false},
        { image: '/loan_grid_images/gold_loan_icon_transparent.svg', label: 'Apply For Loan' , selected: false},
        { image: '/loan_grid_images/property_loan_icon_transparent.svg', label: 'Banker Partnership Program' , selected: false},
    ]

    return (
        <div className='flex flex-row max-w-[90%] self-center justify-between w-full pt-8 sticky bg-(--background)'>
            <div className='flex flex-row gap-8 align-middle'>
                {menuItems.map((menu) => (
                    <div className={`${menu.selected ? styles.menu_item_selected : styles.menu_item }`}>
                        {menu.label}
                    </div>
                ))}
            </div>
            <img
                src="./logo/paisa_rupay_logo_v2.svg"
                alt="Paisa Rupay logo"
                className="h-10 w-auto object-contain cursor-pointer"
            />
        </div>
    )
}
