import React, { useState } from "react";
import { WizardProps } from "../../types/Wizardtype";

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
    <div style={{ display: "flex" }}>
      <div>
        {wizardProps.steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              padding: "8px 12px",
              cursor: "default",
              fontWeight: index === currentIndex ? "bold" : "normal",
              backgroundColor:
                index === currentIndex ? "#d9d9d9" : "transparent",
              borderLeft:
                index === currentIndex
                  ? "4px solid #000"
                  : "4px solid transparent",
            }}
          >
            {step.wizardPageConfig.title}
          </div>
        ))}
      </div>

      <div style={{ margin: "20px" }}>
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
