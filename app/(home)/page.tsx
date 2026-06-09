import React from 'react'
import styles from './home.module.css';
import OurLoans from './OurLoans/our_loans';
import Consultation from './Consultation/consultation';
import ImageSection from './ImageSection/image_section';
import TheProblem from './TheProblem/the_problem';
import TheSolution from './TheSolution/the_solution';
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicons/icon.png', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicons/favicon.ico',
  },
  manifest: '/favicons/manifest.webmanifest',
}

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
