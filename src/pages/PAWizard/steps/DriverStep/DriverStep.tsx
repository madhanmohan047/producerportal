import React from "react";
import WizardPage from "../../../../components/Wizard/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const DriverStep = (wizardPageProps: WizardPageProps) => {
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
    >
      <div>hi I am child Driver</div>
    </WizardPage>
  );
};
export default DriverStep;
