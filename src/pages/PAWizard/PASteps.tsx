import React from "react";
import { PersonalInfoStep } from "./steps/PersonalInfoStep/PersonalInfoStep";
import { DriverStep } from "./steps/DriverStep/DriverStep";
import { VehicleStep } from "./steps/VehicleStep/VehicleStep";
import { Step } from "../../components/Wizard/Wizard";

export const PASteps: Step[] = [
  {
    id: "personal_info",
    type: "wizardpage",
    route: "/personallInfo",
    component: PersonalInfoStep,
    wizardpageProps: {
      title: "PersonalInfo",
      description: "Personal Info",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
      },
    },
  },
  {
    id: "driver",
    type: "wizardpage",
    route: "/driver",
    component: DriverStep,
    wizardpageProps: {
      title: "Driver",
      description: "Driver",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
      },
    },
  },
  {
    id: "vehicle",
    type: "wizardpage",
    route: "/vehicle",
    component: VehicleStep,
    wizardpageProps: {
      title: "Vehicle",
      description: "Vehicle",
      buttonProps: {
        next: {
          label: "Submit",
        },
        previous: {
          label: "Back",
        },
      },
    },
  },
];
