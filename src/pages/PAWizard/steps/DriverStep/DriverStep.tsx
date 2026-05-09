import React from "react";
import { useLocation } from "react-router-dom";
import { WizardPage } from "../../../../components/Wizard/WizardPage/WizardPage";

export const DriverStep = ({
  title,
  description,
  buttonProps,
  step,
  handleNext,
  handleBack,
}: any) => {
  const location = useLocation();

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

      <div>Driver Step</div>
    </WizardPage>
  );
};
