import React from "react";
import type {
  Step,
  WizardPageConfig,
} from "../../../../components/Wizard/Wizard";
import { WizardPage } from "../../../../components/Wizard/WizardPage/WizardPage";
import { useLocation } from "react-router-dom";
export const VehicleStep = ({
  title,
  description,
  buttonProps,
  step,
  location,
  handleNext,
  handleBack,
}: any) => {
  return (
    <WizardPage
      step={step}
      location={location}
      title={title}
      description={description}
      buttonProps={buttonProps}
      handleNext={handleNext}
      handleBack={handleBack}
    >
      <div>{title}</div>

      <div>Vehicle Step</div>
    </WizardPage>
  );
};
