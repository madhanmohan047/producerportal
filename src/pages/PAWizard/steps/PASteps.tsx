import { WizardStep } from "../../../types/Wizardtype";
import AccountSearchStep from "./AccountStep/AccountSearchStep";
import PolicyLobStep from "./PolicyLobStep/PolicyLobStep";
import DriversStep from "./DriversStep/DriversStep";
import VehiclesStep from "./VehiclesStep/VehiclesStep";
import RiskInfoStep from "./RiskInfoStep/RiskInfoStep";
import QuoteStep from "./QuoteStep/QuoteStep";
import DocumentsStep from "./DocumentsStep/DocumentsStep";
import ReviewBindStep from "./ReviewBindStep/ReviewBindStep";
import ConfirmationStep from "./ConfirmationStep/ConfirmationStep";

const saveDraft = { saveDraft: { label: "Save" } };

export const PASteps: WizardStep[] = [
  {
    id: "account",
    type: "wizard",
    route: "account",
    component: AccountSearchStep,
    wizardPageConfig: {
      title: "Account",
      description: "Account & Customer Search",
      stepId: "1",

      buttonProps: { next: { label: "Continue" }, previous: { label: "" }, ...saveDraft },
    },
  },
  {
    id: "policyLob",
    type: "wizard",
    route: "policyLob",
    component: PolicyLobStep,
    wizardPageConfig: {
      title: "Policy & LOB",
      description: "Policy & LOB Selection",
      stepId: "2",

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
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

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
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

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
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

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
    },
  },
  {
    id: "quote",
    type: "wizard",
    route: "quote",
    component: QuoteStep,
    wizardPageConfig: {
      title: "Quote",
      description: "Quote Selection",
      stepId: "6",

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
    },
  },
  {
    id: "documents",
    type: "wizard",
    route: "documents",
    component: DocumentsStep,
    wizardPageConfig: {
      title: "Documents",
      description: "Policy Documents",
      stepId: "7",

      buttonProps: { next: { label: "Continue" }, previous: { label: "Back" }, ...saveDraft },
    },
  },
  {
    id: "reviewBind",
    type: "wizard",
    route: "reviewBind",
    component: ReviewBindStep,
    wizardPageConfig: {
      title: "Review",
      description: "Review & Bind Policy",
      stepId: "8",

      buttonProps: { next: { label: "Bind Policy" }, previous: { label: "Back" }, ...saveDraft },
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
      stepId: "9",

      isSubmission: true,
      buttonProps: { next: { label: "Done" }, previous: { label: "" } },
    },
  },
];
