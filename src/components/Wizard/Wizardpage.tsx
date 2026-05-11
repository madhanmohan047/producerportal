import React from "react";
import { WizardPageProps } from "../../types/Wizardtype";
import { Button } from "../common";

const WizardPage = (wizardPageProps: WizardPageProps) => {
  return (
    <>
      {wizardPageProps.children}

      <div>
        <button onClick={wizardPageProps.handleNext}>
          {wizardPageProps.step.wizardPageConfig.buttonProps.next.label}
        </button>
      </div>

      <div>
        {wizardPageProps.step.wizardPageConfig.buttonProps.previous.label
          .length > 0 && (
          <button onClick={wizardPageProps.handlePrevious}>
            {wizardPageProps.step.wizardPageConfig.buttonProps.previous.label}
          </button>
        )}
      </div>
    </>
  );
};
export default WizardPage;
