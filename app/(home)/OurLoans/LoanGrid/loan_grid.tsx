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
    <div className="w-full flex justify-between pt-16">
        {loans.map((loan) => (
            <div key={loan.label} className="flex flex-col items-center gap-2">
            <img
                src={loan.image}
                alt={loan.label}
                className="h-18 w-auto object-contain"
            />
            <span className="font-(family-name:--font-fustat) text-(--paragraph) tracking-[-2.5%] leading-5 text-center text-sm">
                {loan.label}
            </span>
            </div>
        ))}
    </div>
  )
}