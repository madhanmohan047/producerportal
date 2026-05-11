import React from "react";
import { Contact } from "../../../../components/ContactComponent/ContactComponent";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const PersonalInfoStep = (wizardPageProps: WizardPageProps) => {
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
    >
      <div>Personal Info</div>
    </WizardPage>
  );
};

export default PersonalInfoStep;
