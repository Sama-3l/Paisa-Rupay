import React from 'react'

const loans = [
    { image: '/loan_grid_images/cash_coins_white_band_fixed_transparent.svg', label: 'Personal Loan' },
    { image: '/loan_grid_images/house_icon_transparent.png', label: 'House Loan' },
    { image: '/loan_grid_images/car_loan_icon_transparent.png', label: 'Car Loan' },
    { image: '/loan_grid_images/gold_loan_icon_transparent.svg', label: 'Gold Loan' },
    { image: '/loan_grid_images/property_loan_icon_transparent.svg', label: 'Loan against property' },
  { image: '/loan_grid_images/business_loan_icon_transparent.svg', label: 'Business Loan' },
  { image: '/loan_grid_images/other_loans_icon_transparent.svg', label: 'Other Loans' },
]

export default function LoanGrid() {
  return (
    <div className="w-full md:pt-16 pt-8">
      {/* Desktop: single row */}
      <div className="hidden xl:flex justify-between">
        {loans.map((loan) => (
          <div key={loan.label} className="flex flex-col items-center gap-2">
            <img src={loan.image} alt={loan.label} className="h-18 w-auto object-contain" />
            <span className="text-center leading-5" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
              {loan.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tablet/Mobile: 4 top, 3 bottom */}
      <div className="xl:hidden flex flex-col gap-8">
        <div className="flex justify-between">
          {loans.slice(0, 4).map((loan) => (
            <div key={loan.label} className="flex flex-col items-center gap-2">
              <img src={loan.image} alt={loan.label} className="sm:h-18 h-10 w-auto object-contain" />
              <span className="text-center leading-(--button)" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
                {loan.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-around">
          {loans.slice(4).map((loan) => (
            <div key={loan.label} className="flex flex-col items-center gap-2 w-[25%]">
              <img src={loan.image} alt={loan.label} className="sm:h-18 h-10 w-auto object-contain" />
              <span className="text-center leading-(--button)" style={{ fontFamily: 'var(--font-fustat)', fontSize: 'var(--button)' }}>
                {loan.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}