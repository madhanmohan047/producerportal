import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Wizard from "../../components/Wizard/Wizard";
import { PASteps } from "./steps/PASteps";
import { WizardStep } from "../../types/WizardTypes";

export const PAWizard: React.FC = () => {
  const paSteps: WizardStep[] = PASteps;
  const location = useLocation();

  return (
    <div>
      <Wizard steps={paSteps} location={location} />
    </div>
  );
};
