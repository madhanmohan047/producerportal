import React, { useState } from "react";
import {
  WizardProps,
  WizardSidebarItemProps,
  WizardSidebarProps,
} from "../../types/Wizardtype";
import { Wizard } from "../../components/Wizard/Wizard";
import { FNOLWizardsteps } from "./steps/FNOLWizardsteps";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { title } from "process";

export const FNOLWizard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarItems: WizardSidebarItemProps[] = [
    {
      transformationKey: "Policy Holder",
      transformationLabel: "Sarah mitchel",
    },
    {
      transformationKey: "Policy #",
      transformationLabel: "HO-2024-88421",
    },
    {
      transformationKey: "Line of Business",
      transformationLabel: "Personal Property",
    },
    {
      transformationKey: "Loss Date",
      transformationLabel: "04/15/2025",
    },
  ];
  const [wizardSidebarProps, setWizardSidebarProps] =
    useState<WizardSidebarProps>();

  useEffect(() => {
    if (location.pathname === "/fnolwizard") {
      navigate("/fnolwizard/personalInfo", { replace: true });
    }

    setWizardSidebarProps((prev) => {
      return {
        ...prev,
        title: "Claimant",
        sidebaritems: sidebarItems,
      };
    });
  }, [location.pathname, navigate]);

  /* works also=> <Wizard {...pawizardProps} /> */

  return (
    <Wizard
      steps={FNOLWizardsteps}
      location={location}
      url={"/fnolwizard/"}
      header={"Guidewire ClaimCenter Portal"}
      wizardSidebarprops={wizardSidebarProps}
    />
  );
};
