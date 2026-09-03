import Link from 'next/link'
import React from 'react'
import Image, { StaticImageData } from 'next/image'

import cashCoinsIcon from '@/public/loan_grid_images/cash_coins_white_band_fixed_transparent.png'
import houseIcon from '@/public/loan_grid_images/house_icon_transparent.png'
import carIcon from '@/public/loan_grid_images/car_loan_icon_transparent.png'
import goldIcon from '@/public/loan_grid_images/gold_loan_icon_transparent.png'
import propertyIcon from '@/public/loan_grid_images/property_loan_icon_transparent.png'
import businessIcon from '@/public/loan_grid_images/business_loan_icon_transparent.png'
import otherIcon from '@/public/loan_grid_images/other_loans_icon_transparent.png'

interface LoanItem {
  image: StaticImageData
  label: string
  href: string
  height: string
}

const loans: LoanItem[] = [
  { image: cashCoinsIcon, label: 'Personal Loan', href: '/apply-for-loan?loan=personal', height: 'h-18' },
  { image: houseIcon, label: 'House Loan', href: '/apply-for-loan?loan=house', height: 'h-18' },
  { image: carIcon, label: 'Car Loan', href: '/apply-for-loan?loan=car', height: 'h-18' },
  { image: goldIcon, label: 'Gold Loan', href: '/apply-for-loan?loan=gold', height: 'h-22' },
  { image: propertyIcon, label: 'Loan against property', href: '/apply-for-loan?loan=property', height: 'h-22' },
  { image: businessIcon, label: 'Business Loan', href: '/apply-for-loan?loan=business', height: 'h-22' },
  { image: otherIcon, label: 'Other Loans', href: '/apply-for-loan?loan=other', height: 'h-22' },
]

interface LoanOptionProps {
  loan: LoanItem
  className?: string
  imageClassName?: string
  textClassName?: string
}

function LoanOption({ loan, className = '', imageClassName, textClassName = 'leading-5' }: LoanOptionProps) {
  const resolvedImageClass = imageClassName || `${loan.height} w-auto`

  return (
    <Link
      href={loan.href}
      className={`group flex flex-col items-center justify-end gap-3 cursor-pointer select-none ${className}`}
    >
      <div className="flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-120 will-change-transform">
        <Image
          src={loan.image}
          alt={loan.label}
          priority
          draggable={false}
          className={`${resolvedImageClass} object-contain`}
        />
      </div>
      <span
        className={`text-center ${textClassName}`}
        style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}
      >
        {loan.label}
      </span>
    </Link>
  )
}

export default function LoanGrid() {
  return (
    <div className="w-full md:pt-16 pt-8">
      {/* Desktop: single row */}
      <div className="hidden xl:flex justify-between items-end">
        {loans.map((loan) => (
          <LoanOption key={loan.label} loan={loan} />
        ))}
      </div>

      {/* Tablet/Mobile: 4 top, 3 bottom */}
      <div className="xl:hidden flex flex-col gap-8">
        <div className="flex justify-between items-end">
          {loans.slice(0, 4).map((loan) => (
            <LoanOption
              key={loan.label}
              loan={loan}
              imageClassName={`sm:${loan.height} h-10 w-auto`}
              textClassName="leading-(--button)"
            />
          ))}
        </div>
        <div className="flex justify-around items-end">
          {loans.slice(4).map((loan) => (
            <LoanOption
              key={loan.label}
              loan={loan}
              className="w-[25%]"
              imageClassName={`sm:${loan.height} h-10 w-auto`}
              textClassName="leading-(--button)"
            />
          ))}
        </div>
      </div>
    </div>
  )
}