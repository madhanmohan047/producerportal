import React from "react";
import { WizardProps } from "../../types/Wizardtype";
import { Wizard } from "../../components/Wizard/Wizard";
import { PASteps } from "./steps/PASteps";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PAWizard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/pawizard") {
      navigate("/pawizard/personalInfo", { replace: true });
    }
  }, [location.pathname, navigate]);

  /* works also=> <Wizard {...pawizardProps} /> */

  return (
    <Wizard
      steps={PASteps}
      location={location}
      url={"/pawizard/"}
      header={"PAWizard"}
    />
  );
};
