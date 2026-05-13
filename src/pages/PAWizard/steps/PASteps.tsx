import React from "react";
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

export const PASteps: WizardStep[] = [
  {
    id: "account",
    type: "wizard",
    route: "account",
    component: AccountSearchStep,
    wizardPageConfig: {
      title: "Account",
      description: "Account & Customer Search",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "" },
      },
    },
  },
  {
    id: "policyLob",
    type: "wizard",
    route: "policyLob",
    component: PolicyLobStep,
    wizardPageConfig: {
      title: "Policy Info",
      description: "Policy and Line of Business",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
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
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
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
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
    },
  },
  {
    id: "riskInfo",
    type: "wizard",
    route: "riskInfo",
    component: RiskInfoStep,
    wizardPageConfig: {
      title: "Risk",
      description: "Risk Information",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
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
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
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
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
      },
    },
  },
  {
    id: "reviewBind",
    type: "wizard",
    route: "reviewBind",
    component: ReviewBindStep,
    wizardPageConfig: {
      title: "Review",
      description: "Review and Bind Policy",
      buttonProps: {
        next: { label: "Next" },
        previous: { label: "Previous" },
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
      buttonProps: {
        next: { label: "Done" },
        previous: { label: "Previous" },
      },
    },
  },
];
