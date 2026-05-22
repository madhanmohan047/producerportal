import React from "react";
import { WizardProps } from "../../types/Wizardtype";
import styles from "./Wizard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import WizardHeader from "./WizardHeader/WizardHeader";
import WizardProgressBar from "./WizardProgressBar/WizardProgressBar";

export const Wizard = (wizardProps: WizardProps) => {
  // works also=>export const Wizard = ({ steps, location }: WizardProps) => {

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
      <div className={styles["wizard-header"]}>
        <WizardHeader headerProps={wizardProps.header} />
      </div>

      <div className={styles["wizard-progress"]}>
        {wizardProps.steps.map((step, index) => (
          <WizardProgressBar
            key={step.id}
            progressbarProps={step.wizardPageConfig}
            index={index}
            currentIndex={safeIndex}
            onClick={() => navigate(wizardProps.url + step.route)}
          />
        ))}
      </div>

      <div className={styles["wizard-body"]}>
        <div className={styles["wizard-content"]}>
          {CurrentComponent ? (
            <CurrentComponent
              step={currentStep}
              location={wizardProps.location}
              handleNext={goNext}
              handlePrevious={goBack}
              SidebarComponent={wizardProps.SidebarComponent}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
