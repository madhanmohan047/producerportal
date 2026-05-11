import React from "react";
import { Navigate } from "react-router-dom";
import { WIZARD_STEPS } from "./PersonalAutoWizardLayout";

const PersonalAutoWizard: React.FC = () => {
  return <Navigate to={WIZARD_STEPS[0].path} replace />;
};

export default PersonalAutoWizard;
