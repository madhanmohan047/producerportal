import React, { useState } from "react";
import { Location } from "react-router-dom";
import styles from "./Wizard.module.scss";

export type Step = {
  id: string;
  type: string;
  route: string;
  component: React.ComponentType<any>;
  wizardpageProps: WizardPageConfig;
};

export type WizardProps = {
  steps: Step[];
  currentStep?: string;
  location: Location;
};

export type WizardPageConfig = {
  title: string;
  description: string;
  buttonProps: {
    next: {
      label: string;
    };
    previous: {
      label: string;
    };
  };
};

export type WizardPageProps = {
  step: Step;
  location: Location;
  children?: React.ReactNode;
  handleNext?: () => void;
  handleBack?: () => void;
} & WizardPageConfig;

export const Wizard = ({ wizardProps }: { wizardProps: WizardProps }) => {
  const { steps, location } = wizardProps;

  const [currentIndex, setCurrentIndex] = useState(0);

  const step = steps[currentIndex];

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const goNext = () => {
    setCurrentIndex((i) => (i < steps.length - 1 ? i + 1 : i));
  };

  const goBack = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  };

  if (!step) return null;

  const StepComponent = step.component;

  // Inside your Wizard component return:
  return (
    <div className={styles["wizard-layout"]}>
      <div className={styles["wizard-container"]}>
        {/* LEFT SIDEBAR */}
        <div className={styles["wizard-nav"]}>
          {steps.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setCurrentIndex(i)}
              className={`${styles["nav-item"]} ${
                i === currentIndex ? styles.active : ""
              }`}
            >
              {s.wizardpageProps.title}
            </div>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className={styles["wizard-content"]}>
          <StepComponent
            {...step.wizardpageProps}
            handleNext={goNext}
            handleBack={goBack}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>
    </div>
  );
};
