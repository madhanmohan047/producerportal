import { WizardStep } from "../../../types/Wizardtype";
import { AccountCustomerSearch } from "./AccountCustomerSearch/AccountCustomerSearch";
import { PolicyLobSelection } from "./PolicyLobSelection/PolicyLobSelection";
import DriversStep from "./DriversStep/DriversStep";
import VehiclesStep from "./VehiclesStep/VehiclesStep";
import RiskInfoStep from "./RiskInfoStep/RiskInfoStep";
import Coverage from "./Coverage/Coverage";
import Premium from "./Premium/Premium";
import DocUpload from "./DocUpload/DocUpload";
import ReviewBindStep from "./ReviewBindStep/ReviewBindStep";
import ConfirmationStep from "./ConfirmationStep/ConfirmationStep";

const saveDraft = { saveDraft: { label: "Save" } };

export const PASteps: WizardStep[] = [
  {
    id: "account",
    type: "wizard",
    route: "account",
    component: AccountCustomerSearch,
    wizardPageConfig: {
      title: "Account",
      description: "Account & Customer Search",
      stepId: "1",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "" },
        ...saveDraft,
      },
    },
  },
  {
    id: "policyLob",
    type: "wizard",
    route: "policyLob",
    component: PolicyLobSelection,
    wizardPageConfig: {
      title: "Policy & LOB",
      description: "Policy & LOB Selection",
      stepId: "2",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "drivers",
    type: "wizard",
    route: "drivers",
    component: DriversStep,
    wizardPageConfig: {
      title: "Drivers",
      description: "Driver Information",
      stepId: "3",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "vehicles",
    type: "wizard",
    route: "vehicles",
    component: VehiclesStep,
    wizardPageConfig: {
      title: "Vehicles",
      description: "Vehicle Information",
      stepId: "4",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "riskInfo",
    type: "wizard",
    route: "riskInfo",
    component: RiskInfoStep,
    wizardPageConfig: {
      title: "Risk Info",
      description: "Risk Information",
      stepId: "5",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "coverage",
    type: "wizard",
    route: "coverage",
    component: Coverage,
    wizardPageConfig: {
      title: "Coverage",
      description: "Coverage Selection",
      stepId: "6",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "premium",
    type: "wizard",
    route: "premium",
    component: Premium,
    wizardPageConfig: {
      title: "Premium",
      description: "Premium Selection",
      stepId: "7",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "documents",
    type: "wizard",
    route: "documents",
    component: DocUpload,
    wizardPageConfig: {
      title: "Documents",
      description: "Policy Documents",
      stepId: "8",

      buttonProps: {
        next: { label: "Continue" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "reviewBind",
    type: "wizard",
    route: "reviewBind",
    component: ReviewBindStep,
    wizardPageConfig: {
      title: "Review & Bind",
      description: "Review & Bind Policy",
      stepId: "9",

      buttonProps: {
        next: { label: "Bind Policy" },
        previous: { label: "Back" },
        ...saveDraft,
      },
    },
  },
  {
    id: "confirmation",
    type: "wizard",
    route: "confirmation",
    component: ConfirmationStep,
    wizardPageConfig: {
      title: "Confirmation",
      description: "Policy Confirmation",
      stepId: "10",

      isSubmission: true,
      buttonProps: { next: { label: "Done" }, previous: { label: "" } },
    },
  },
];
