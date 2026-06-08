import React from 'react'
import styles from './home.module.css';
import OurLoans from './OurLoans/our_loans';
import Consultation from './Consultation/consultation';
import ImageSection from './ImageSection/image_section';
import TheProblem from './TheProblem/the_problem';
import TheSolution from './TheSolution/the_solution';


// export default function Home() {
//   return (
//     <div className="w-[600px] flex items-center justify-center">
//       <OrangeRadialInput
//         radialColor={"#FF6D28"}
//         radialDistance={"250%"}
//         startOpacity={0 / 100}
//         endOpacity={40 / 100}
//         placeholder={"raghvendramishra2002@gmail.com"}
//       />
//     </div>
//   );
// }

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
