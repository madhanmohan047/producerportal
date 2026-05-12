import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Driver from "./Driver/Driver";
import Vehicle from "./Vehicle/Vehicle";
import { WizardStep } from "../../../types/WizardTypes";
import { WizardPage } from "../../../components/Wizard/WizardPage";

export const PASteps: WizardStep[] = [
  {
    id: "personal-info",
    type: "WizardPage",
    route: "/personal-info",
    component: PersonalInfo,
    WizardPageProps: {
      title: "Personal Information",
      description: "Please provide your personal information.",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
    },
  },
  {
    id: "driver",
    type: "WizardPage",
    route: "/driver",
    component: Driver,
    WizardPageProps: {
      title: "Driver Information",
      description: "Please provide your driver information.",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
    },
  },
  {
    id: "vehicle",
    type: "WizardPage",
    route: "/vehicle",
    component: Vehicle,
    WizardPageProps: {
      title: "Vehicle Information",
      description: "Please provide your vehicle information.",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
    },
  },
];
