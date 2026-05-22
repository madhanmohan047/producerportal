import { defineMessages } from "react-intl";

export default defineMessages({
  successLabel: {
    id: "confirmation.successLabel",
    defaultMessage: "Policy successfully bound",
  },
  effectiveLine: {
    id: "confirmation.effectiveLine",
    defaultMessage: "Effective {effectiveDate} · Bound Today",
  },
  emailBanner: {
    id: "confirmation.emailBanner",
    defaultMessage: "Policy documents and ID cards sent to {email}.",
  },

  // Summary card labels
  cardInsured: { id: "confirmation.cardInsured", defaultMessage: "Insured" },
  cardAnnualPrem: { id: "confirmation.cardAnnualPrem", defaultMessage: "Annual Prem" },
  cardVehicle: { id: "confirmation.cardVehicle", defaultMessage: "Vehicle" },

  // Post-bind checklist
  postBindTitle: {
    id: "confirmation.postBindTitle",
    defaultMessage: "POST-BIND CHECKLIST",
  },
  checklistMvr: {
    id: "confirmation.checklistMvr",
    defaultMessage: "MVR & CLUE ordered:",
  },
  checklistMvrDetail: {
    id: "confirmation.checklistMvrDetail",
    defaultMessage: "Results will arrive in 1-2 business days.",
  },
  checklistIdCards: {
    id: "confirmation.checklistIdCards",
    defaultMessage: "ID Cards issued:",
  },
  checklistIdCardsDetail: {
    id: "confirmation.checklistIdCardsDetail",
    defaultMessage: "Digital cards are available immediately.",
  },

  // CTAs
  ctaPostBind: {
    id: "confirmation.ctaPostBind",
    defaultMessage: "Post-bind Checklist",
  },
  ctaNewSubmission: {
    id: "confirmation.ctaNewSubmission",
    defaultMessage: "New Submission",
  },

  notSet: { id: "confirmation.notSet", defaultMessage: "—" },
});
