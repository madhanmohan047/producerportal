import React from "react";
import { WizardStep } from "../../../types/Wizardtype";
import PersonalInfoStep from "./Personalinfo/PersonalInfoStep";
import VehicleStep from "./VehicleStep/VehicleStep";
import DriverStep from "./DriverStep/DriverStep";
export const PASteps: WizardStep[] = [
  {
    id: "personalinfo",
    type: "wizard",
    route: "/personalInfo",
    component: PersonalInfoStep,
    wizardPageConfig: {
      title: "Personal Information",
      description: "Personal Information",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "",
        },
      },
    },
  },
  {
    id: "vehicle",
    type: "wizard",
    route: "/personalInfo",
    component: VehicleStep,
    wizardPageConfig: {
      title: "Vehicle",
      description: "Vehicle",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Previous",
        },
      },
    },
  },
  {
    id: "driver",
    type: "wizard",
    route: "/personalInfo",
    component: DriverStep,
    wizardPageConfig: {
      title: "Driver",
      description: "Driver",
      buttonProps: {
        next: {
          label: "Submit",
        },
        previous: {
          label: "Previous",
        },
      },
    },
  },
];
