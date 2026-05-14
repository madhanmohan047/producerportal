import { defineMessages } from "react-intl";

export const CLAIM_SUBMITTED_MESSAGES =
  defineMessages({
    title: {
      id: "claimSubmitted.title",
      defaultMessage:
        "Claim Submitted Successfully",
    },

    subtitle: {
      id: "claimSubmitted.subtitle",
      defaultMessage:
        "Your loss notice has been recorded and is being routed to an adjuster.",
    },

    emailSentPrefix: {
      id: "claimSubmitted.emailSentPrefix",
      defaultMessage:
        "A confirmation email has been sent to",
    },

    nextStepsTitle: {
      id: "claimSubmitted.nextStepsTitle",
      defaultMessage: "What Happens Next?",
    },

    assignmentTitle: {
      id: "claimSubmitted.assignmentTitle",
      defaultMessage: "Assignment:",
    },

    assignmentDescription: {
      id: "claimSubmitted.assignmentDescription",
      defaultMessage:
        "An adjuster will be assigned within 1 business day.",
    },

    inspectionTitle: {
      id: "claimSubmitted.inspectionTitle",
      defaultMessage: "Inspection:",
    },

    inspectionDescription: {
      id: "claimSubmitted.inspectionDescription",
      defaultMessage:
        "We will contact you to schedule a physical or virtual inspection.",
    },

    fileAnotherClaim: {
      id: "claimSubmitted.fileAnotherClaim",
      defaultMessage: "File Another Claim",
    },

    viewDashboard: {
      id: "claimSubmitted.viewDashboard",
      defaultMessage:
        "View My Claims Dashboard",
    },
  });