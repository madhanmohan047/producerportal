import { defineMessages } from "react-intl";

export const PARTY_MESSAGES = defineMessages({
  title: {
    id: "party.title",
    defaultMessage: "Involved Parties",
  },
  subtitle: {
    id: "party.subtitle",
    defaultMessage:
      "Add all parties involved in this loss — drivers, claimants, and witnesses.",
  },
  infoBanner: {
    id: "party.infoBanner",
    defaultMessage: "The insured has been added as the primary claimant.",
  },
  primaryClaimantLabel: {
    id: "party.primaryClaimantLabel",
    defaultMessage: "Primary Claimant",
  },
  insuredBadge: {
    id: "party.insuredBadge",
    defaultMessage: "Insured",
  },
  namedInsuredLabel: {
    id: "party.namedInsuredLabel",
    defaultMessage: "Named Insured",
  },
  editAction: {
    id: "party.editAction",
    defaultMessage: "Edit",
  },
  deleteAction: {
    id: "party.deleteAction",
    defaultMessage: "Delete",
  },
  whoElseHeading: {
    id: "party.whoElseHeading",
    defaultMessage: "Who else was involved in this incident?",
  },
  typeOtherDriver: {
    id: "party.type.otherDriver",
    defaultMessage: "Other Driver / Third Party",
  },
  typeWitness: {
    id: "party.type.witness",
    defaultMessage: "Witness / Passenger",
  },
  addAnotherPerson: {
    id: "party.addAnotherPerson",
    defaultMessage: "Add Another Person",
  },
  formTitleAdd: {
    id: "party.form.titleAdd",
    defaultMessage: "Add Person",
  },
  formTitleEdit: {
    id: "party.form.titleEdit",
    defaultMessage: "Edit Person",
  },
  formTitlePrimary: {
    id: "party.form.titlePrimary",
    defaultMessage: "Edit Primary Claimant",
  },
  formTypeLabel: {
    id: "party.form.typeLabel",
    defaultMessage: "Type",
  },
  formNameLabel: {
    id: "party.form.nameLabel",
    defaultMessage: "Name",
  },
  formDescriptionLabel: {
    id: "party.form.descriptionLabel",
    defaultMessage: "Description",
  },
  formDescriptionPlaceholder: {
    id: "party.form.descriptionPlaceholder",
    defaultMessage: "e.g. Blue Honda Civic (ABC-123)",
  },
  formCancel: {
    id: "party.form.cancel",
    defaultMessage: "Cancel",
  },
  formSave: {
    id: "party.form.save",
    defaultMessage: "Save",
  },
});
