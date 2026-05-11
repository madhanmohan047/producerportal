import React, { useState } from "react";
import { WizardProps } from "../../types/Wizardtype";
import styles from "./Wizard.module.scss";

export const Wizard = (wizardProps: WizardProps) => {
  // works also=>export const Wizard = ({ steps, location }: WizardProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = wizardProps.steps[currentIndex];
  const CurrentComponent = currentStep.component;

  const goNext = () => {
    if (currentIndex < wizardProps.steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles["wizard-container"]}>
      <div className={styles["wizard-sidebar"]}>
        {wizardProps.steps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles["wizard-step"]} ${
              index === currentIndex ? styles["active-step"] : ""
            }`}
          >
            {step.wizardPageConfig.title}
          </div>
        ))}
      </div>

      <div className={styles["wizard-content"]}>
        {CurrentComponent ? (
          <CurrentComponent
            step={currentStep}
            location={wizardProps.location}
            handleNext={goNext}
            handlePrevious={goBack}
          />
        ) : null}
      </div>
    </div>
  );
};
