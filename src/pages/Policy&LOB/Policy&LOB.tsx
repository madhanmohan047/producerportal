import React from "react";
import WizardPage from "../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../types/Wizardtype";

const StartClaim = (wizardPageProps: WizardPageProps) => {
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
    >
      <div>Policy Discovery</div>
    </WizardPage>
  );
};

export default StartClaim;
