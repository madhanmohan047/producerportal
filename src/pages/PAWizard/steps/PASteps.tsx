import React from "react";
import { WizardStep } from "../../../types/Wizardtype";
import PersonalInfoStep from "./PersonalInfo/PersonalInfoStep";
import VehicleStep from "./VehicleStep/VehicleStep";
import DriverStep from "./DriverStep/DriverStep";
export const PASteps: WizardStep[] = [
  {
    id: "personalinfo",
    type: "wizard",
    route: "personalInfo",
    component: PersonalInfoStep,
    wizardPageConfig: {
      title: "Personal Information",
      description: "Personal Information",
      stepId: "1",
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
    route: "vehicle",
    component: VehicleStep,
    wizardPageConfig: {
      title: "Vehicle",
      description: "Vehicle",
      stepId: "2",
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
    route: "driver",
    component: DriverStep,
    wizardPageConfig: {
      title: "Driver",
      description: "Driver",
      stepId: "3",
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
