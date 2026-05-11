import React from "react";

import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const VehicleStep = (wizardPageProps: WizardPageProps) => {
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
    >
      <div>Vehicle Step</div>
    </WizardPage>
  );
};

export default VehicleStep;
