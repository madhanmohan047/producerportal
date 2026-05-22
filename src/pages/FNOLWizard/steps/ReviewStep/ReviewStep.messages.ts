// ReviewStep.messages.ts
import { defineMessages } from "react-intl";

export default defineMessages({
  title: {
    id: "reviewStep.title",
    defaultMessage: "Review & Submit",
  },
  subtitle: {
    id: "reviewStep.subtitle",
    defaultMessage:
      "Confirm that the information provided is correct before official submission.",
  },
  policyNumber: {
    id: "reviewStep.policyNumber",
    defaultMessage: "Policy Number",
  },
  lineOfBusiness: {
    id: "reviewStep.lineOfBusiness",
    defaultMessage: "Line of Business",
  },
  dateOfLoss: {
    id: "reviewStep.dateOfLoss",
    defaultMessage: "Date of Loss",
  },
  injuriesReported: {
    id: "reviewStep.injuriesReported",
    defaultMessage: "Injuries Reported",
  },
  policeReport: {
    id: "reviewStep.policeReport",
    defaultMessage: "Police Report",
  },
  damageAreas: {
    id: "reviewStep.damageAreas",
    defaultMessage: "Damage Areas",
  },
  yes: {
    id: "reviewStep.yes",
    defaultMessage: "Yes",
  },
  no: {
    id: "reviewStep.no",
    defaultMessage: "No",
  },
  certifyText: {
    id: "reviewStep.certifyText",
    defaultMessage:
      "I certify that the information provided is accurate and complete.",
  },
  authorizeText: {
    id: "reviewStep.authorizeText",
    defaultMessage:
      "I authorize the insurer to collect data necessary to process this claim.",
  },
  fraudWarning: {
    id: "reviewStep.fraudWarning",
    defaultMessage:
      "Submitting a fraudulent claim is a legal offense. All information is subject to verification.",
  },
  validationError: {
    id: "reviewStep.validationError",
    defaultMessage: "You must agree to the terms before submitting the claim",
  },
});
