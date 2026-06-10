import React from 'react'
import OurLoans from './OurLoans/our_loans';
import Consultation from './Consultation/consultation';
import ImageSection from './ImageSection/image_section';
import TheProblem from './TheProblem/the_problem';
import TheSolution from './TheSolution/the_solution';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Paisa Rupay - Business & Personal Loans Made Simple",
  description: "Find the ideal lender for your business or personal needs without the runaround. Transparent fees, dedicated advisor support, and fast processing.",
  openGraph: {
    title: "Paisa Rupay - Business & Personal Loans Made Simple",
    description: "Find the ideal lender for your business or personal needs without the runaround. Transparent fees, dedicated advisor support, and fast processing.",
    url: "https://paisarupay.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
        <OurLoans />
        <Consultation />
        <ImageSection />
        <TheProblem />
        <TheSolution />
    </>
  )
}
