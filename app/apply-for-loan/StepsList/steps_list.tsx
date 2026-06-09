// StepsList.tsx
import styles from './steps_list.module.css';

const steps = [
  {
    title: "Your advisor calls you back",
    description:
      "A real person from our team calls within 24 hours. To inform you about the next steps and gather details to review them.",
  },
  {
    title: "You get your document list and fee structure",
    description:
      "Your advisor sends exactly what is needed — and a transparent breakdown of the costs, before anything moves forward.",
  },
  {
    title: "We match you and handle everything else",
    description:
      "Your advisor manages all communication with the lender. You stay in one place while we do the running around.",
  },
];

export default function StepsList() {
  return (
    <div className="flex flex-col mt-20">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-row gap-4">

          {/* Left — number circle + connecting line */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold shrink-0 ${styles.index}`}
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className="w-px grow my-2 opacity-30"
                style={{ backgroundColor: 'var(--primary)' }}  // ✅ opacity-30 handles transparency
              />
            )}
          </div>

          {/* Right — text content */}
          <div className="pb-20 sm:pb-40 pt-1">
            <h3 className={styles.step_heading}>
              {step.title}
            </h3>
            <p className={styles.step_para}>  {/* ✅ fixed typo */}
              {step.description}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}