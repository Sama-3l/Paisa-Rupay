import React from 'react'
import styles from './home.module.css';
import OurLoans from './OurLoans/our_loans';
import Consultation from './Consultation/consultation';
import ImageSection from './ImageSection/image_section';
import TheProblem from './TheProblem/the_problem';
import TheSolution from './TheSolution/the_solution';
import { Metadata } from 'next';

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
