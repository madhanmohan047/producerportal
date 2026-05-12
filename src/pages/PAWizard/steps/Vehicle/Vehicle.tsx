import React from "react";
import { WizardPage } from "../../../../components/Wizard/WizardPage";
import { WizardPageProps, WizardStep } from "../../../../types/WizardTypes";

const Vehicle: React.FC<{
  step: WizardStep;
  location: any;
  handleNext: () => void;
  handlePrevious: () => void;
}> = ({ step, location, handleNext, handlePrevious }) => {
  return (
    <WizardPage
      step={step}
      location={location}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
    >
      <h1>Vehicle Information</h1>
      <p>Please provide your vehicle information.</p>
    </WizardPage>
  );
};

export default Vehicle;
