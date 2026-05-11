import React from "react";
import { WizardProps } from "../../types/Wizardtype";
import { Wizard } from "../../components/Wizard/Wizard";
import { PASteps } from "./steps/PASteps";
import { Location, useLocation } from "react-router-dom";

export const PAWizard = () => {
  const location = useLocation();
  const pawizardProps: WizardProps = {
    steps: PASteps,
    location: location,
  };
  return (
    <div>
      <Wizard steps={PASteps} location={location} />

      {/* works also=> <Wizard {...pawizardProps} /> */}
    </div>
  );
};
