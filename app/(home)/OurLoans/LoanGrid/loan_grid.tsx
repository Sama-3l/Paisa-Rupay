import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import cashCoinsIcon from '@/public/loan_grid_images/cash_coins_white_band_fixed_transparent.png'
import houseIcon from '@/public/loan_grid_images/house_icon_transparent.png'
import carIcon from '@/public/loan_grid_images/car_loan_icon_transparent.png'
import goldIcon from '@/public/loan_grid_images/gold_loan_icon_transparent.png'
import propertyIcon from '@/public/loan_grid_images/property_loan_icon_transparent.png'
import businessIcon from '@/public/loan_grid_images/business_loan_icon_transparent.png'
import otherIcon from '@/public/loan_grid_images/other_loans_icon_transparent.png'

const loans = [
  { image: cashCoinsIcon, label: 'Personal Loan', href: '/apply-for-loan?loan=personal' },
  { image: houseIcon, label: 'House Loan', href: '/apply-for-loan?loan=house' },
  { image: carIcon, label: 'Car Loan', href: '/apply-for-loan?loan=car' },
  { image: goldIcon, label: 'Gold Loan', href: '/apply-for-loan?loan=gold' },
  { image: propertyIcon, label: 'Loan against property', href: '/apply-for-loan?loan=property' },
  { image: businessIcon, label: 'Business Loan', href: '/apply-for-loan?loan=business' },
  { image: otherIcon, label: 'Other Loans', href: '/apply-for-loan?loan=other' },
]

export default function LoanGrid() {
  return (
    <div className="w-full md:pt-16 pt-8">
      {/* Desktop: single row */}
      <div className="hidden xl:flex justify-between">
        {loans.map((loan) => (
          <Link key={loan.label} className="flex flex-col items-center gap-2 cursor-pointer" href={loan.href}>
            <Image src={loan.image} alt={loan.label} className="h-18 w-auto object-contain" />
            <span className="text-center leading-5" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
              {loan.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Tablet/Mobile: 4 top, 3 bottom */}
      <div className="xl:hidden flex flex-col gap-8">
        <div className="flex justify-between">
          {loans.slice(0, 4).map((loan) => (
            <Link key={loan.label} className="flex flex-col items-center gap-2 cursor-pointer" href={loan.href}>
              <Image src={loan.image} alt={loan.label} className="sm:h-18 h-10 w-auto object-contain" />
              <span className="text-center leading-(--button)" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
                {loan.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-around">
          {loans.slice(4).map((loan) => (
            <Link key={loan.label} className="flex flex-col items-center gap-2 w-[25%] cursor-pointer" href={loan.href}>
              <Image src={loan.image} alt={loan.label} className="sm:h-18 h-10 w-auto object-contain" />
              <span className="text-center leading-(--button)" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
                {loan.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}