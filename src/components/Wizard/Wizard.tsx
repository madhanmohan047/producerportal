import React, { useState } from "react";
import { WizardProps } from "../../types/Wizardtype";
import styles from "./Wizard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const Wizard = (wizardProps: WizardProps) => {
  // works also=>export const Wizard = ({ steps, location }: WizardProps) => {

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(() => {
  //   const saved = localStorage.getItem("wizardStep");
  //   return saved ? Number(saved) : 0;
  // });

  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = wizardProps.steps.findIndex((step) =>
    location.pathname.includes(step.route),
  );
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const currentStep = wizardProps.steps[safeIndex];
  const CurrentComponent = currentStep.component;

  const goNext = () => {
    if (currentIndex < wizardProps.steps.length - 1) {
      const next = wizardProps.steps[currentIndex + 1];
      navigate(wizardProps.url + next.route);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      const prev = wizardProps.steps[currentIndex - 1];
      navigate(wizardProps.url + prev.route);
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
