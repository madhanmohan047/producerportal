import React from "react";
import { WizardProps } from "../../types/WizardTypes";
import styles from "../Wizard/Wizard.module.scss";

const Wizard: React.FC<WizardProps> = ({ steps, location }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentStep = steps[currentIndex];

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  //   return (
  //     <div className="wizardWrapper">
  //       <div className="wizardNavigation">
  //         {steps.map((step) => (
  //           <div key={step.id}>
  //             <h2>{step.WizardPageProps.title}</h2>
  //           </div>
  //         ))}
  //       </div>
  //       {currentStep ? (
  //         <div className="wizardContent">
  //           <currentStep.component
  //             {...currentStep.WizardPageProps}
  //             step={currentStep}
  //             location={location}
  //             handleNext={handleNext}
  //             handlePrevious={handlePrevious}
  //           />
  //         </div>
  //       ) : null}
  //     </div>
  //   );
  // };

  //   return (
  //     <div className="wizardWrapper">
  //       <div className="wizardSteps">
  //         {steps.map((step, index) => (
  //           <div
  //             key={step.id}
  //             className={`stepItem ${
  //               index === currentIndex
  //                 ? "active"
  //                 : index < currentIndex
  //                   ? "completed"
  //                   : ""
  //             }`}
  //           >
  //             <div className="stepCircle">{index + 1}</div>
  //             <div className="stepTitle">{step.WizardPageProps.title}</div>
  //           </div>
  //         ))}
  //       </div>

  //       {currentStep ? (
  //         <div className="wizardContent">
  //           <currentStep.component
  //             {...currentStep.WizardPageProps}
  //             step={currentStep}
  //             location={location}
  //             handleNext={handleNext}
  //             handlePrevious={handlePrevious}
  //           />

  //           <div className="wizardActions">
  //             <button
  //               className="previousBtn"
  //               onClick={handlePrevious}
  //               disabled={currentIndex === 0}
  //             >
  //               Previous
  //             </button>

  //             <button
  //               className="nextBtn"
  //               onClick={handleNext}
  //               disabled={currentIndex === steps.length - 1}
  //             >
  //               Next
  //             </button>
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   );
  // };

  return (
    <div className={styles.wizardWrapper}>
      {/* LEFT NAVIGATION */}
      <div className={styles.wizardNavigation}>
        {steps.map((step, index) => {
          let stepClass = "pending";

          if (index < currentIndex) {
            stepClass = "completed";
          } else if (index === currentIndex) {
            stepClass = "active";
          }

          return (
            <div key={step.id} className={`wizardStep ${stepClass}`}>
              <h2>{step.WizardPageProps.title}</h2>
            </div>
          );
        })}
      </div>

      {/* RIGHT CONTENT */}
      {currentStep ? (
        <div className={styles.wizardContent}>
          <div className={styles.wizardCard}>
            <currentStep.component
              {...currentStep.WizardPageProps}
              step={currentStep}
              location={location}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Wizard;
