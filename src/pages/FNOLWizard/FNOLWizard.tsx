import React, { useState } from "react";
import {
  WizardProps,
  WizardSidebarItemProps,
  WizardSidebarProps,
} from "../../types/Wizardtype";
import { Wizard } from "../../components/Wizard/Wizard";
import { FNOLWizardsteps } from "./steps/FNOLWizardsteps";
import { useEffect } from "react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { title } from "process";
import { FNOLWizardprovider } from "./FNOLWizardContext";
import { formData } from "./FNOLWizardContext";
import { SideBarProps } from "./steps/FnolConstant";

export const FNOLWizard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/fnol-wizard") {
      navigate("/fnol-wizard/personalInfo", { replace: true });
    }

    // setWizardSidebarProps((prev) => {
    //   return {
    //     ...prev,
    //     title: "Claimant",
    //     sidebaritems: sidebarItems,
    //   };
    // });
  }, [location.pathname, navigate]);

  /* works also=> <Wizard {...pawizardProps} /> */

  return (
    <FNOLWizardprovider
      fnolFormData={{
        location: location,
        currentStep: FNOLWizardsteps[0],
      }}
    >
      <Wizard
        steps={FNOLWizardsteps}
        location={location}
        url={"/fnol-wizard/"}
        header={"Guidewire ClaimCenter Portal"}
      />
    </FNOLWizardprovider>
  );
};
