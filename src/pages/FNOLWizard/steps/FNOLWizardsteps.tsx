import React from "react";
import { WizardStep } from "../../../types/Wizardtype";
import DriverStep from "../../PAWizard/steps/DriverStep/DriverStep";
import PersonalInfoStep from "../../PAWizard/steps/Personalinfo/PersonalInfoStep";
import VehicleStep from "../../PAWizard/steps/VehicleStep/VehicleStep";
import DocumentStep from "./DocumentsStep/DocumentStep";

export const FNOLWizardsteps: WizardStep[] = [
  {
    id: "policylob",
    type: "wizard",
    route: "policylob",
    component: PersonalInfoStep,
    wizardPageConfig: {
      title: "Policy & LOB",
      description: "Policy & LOB",
      stepId: "1",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "lossdetails",
    type: "wizard",
    route: "lossdetails",
    component: VehicleStep,
    wizardPageConfig: {
      title: "Loss Details",
      description: "Loss Details",
      stepId: "2",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "parties",
    type: "wizard",
    route: "parties",
    component: DriverStep,
    wizardPageConfig: {
      title: "Parties",
      description: "Parties",
      stepId: "3",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "damage",
    type: "wizard",
    route: "damage",
    component: DriverStep,
    wizardPageConfig: {
      title: "Damage",
      description: "Damage",
      stepId: "4",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "documents",
    type: "wizard",
    route: "documents",
    component: DocumentStep,
    wizardPageConfig: {
      title: "Documents",
      description: "Documents",
      stepId: "5",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "review",
    type: "wizard",
    route: "review",
    component: DriverStep,
    wizardPageConfig: {
      title: "Review",
      description: "Review",
      stepId: "6",
      buttonProps: {
        next: {
          label: "Next",
        },
        previous: {
          label: "Back",
        },
        saveDraft: {
          label: "Save Draft",
        },
      },
    },
  },
  {
    id: "confirmation",
    type: "wizard",
    route: "submit",
    component: VehicleStep,
    wizardPageConfig: {
      title: "Submit",
      description: "Submit",
      stepId: "7",
      isSubmission: true,
      hideNameInProgress: true,
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
