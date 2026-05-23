import { useState } from "react";

import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";

import { PartyComponent } from "../../../../components/PartyComponent/PartyComponent";

import AddEditPartyDialog from "../../../../components/PartyComponent/AddEditPartyDialog";

import { WizardPageProps } from "../../../../types/Wizardtype";

import { useFNOLContext } from "../../FNOLWizardContext";

import { ClaimContact } from "../../../../api/services/claim/types/ClaimContact";

type DialogState =
  | { mode: "closed" }
  | { mode: "primary" }
  | { mode: "contact-add" }
  | { mode: "contact-edit"; contactId: string };

const PartyStep = (wizardPageProps: WizardPageProps) => {
  const { fnolFormData, setFnolFormData } = useFNOLContext();

  const contacts: ClaimContact[] =
    fnolFormData.currentClaim?.partiesInvolved ?? [];

  const primaryClaimant = fnolFormData.currentClaim?.partiesInvolved?.[0];

  const [dialog, setDialog] = useState<DialogState>({
    mode: "closed",
  });

  const updateContacts = (next: ClaimContact[]) => {
    setFnolFormData((prev) => ({
      ...prev,

      currentClaim: {
        ...prev.currentClaim,

        partiesInvolved: next,
      },
    }));
  };

  const handleDelete = (id: string) => {
    updateContacts(contacts.filter((c) => c._id !== id));
  };

  const handleAdd = () => {
    setDialog({ mode: "contact-add" });
  };

  const handleEditContact = (id: string) => {
    setDialog({
      mode: "contact-edit",
      contactId: id,
    });
  };

  const handleEditPrimary = () => {
    setDialog({ mode: "primary" });
  };

  const handleCancel = () => {
    setDialog({ mode: "closed" });
  };

  const handleSaveContact = (saved: ClaimContact) => {
    const exists = contacts.some((c) => c._id === saved._id);

    const next = exists
      ? contacts.map((c) => (c._id === saved._id ? saved : c))
      : [...contacts, saved];

    updateContacts(next);

    setDialog({ mode: "closed" });
  };

  const handleSavePrimary = (saved: ClaimContact) => {
    const remainingContacts = contacts.filter((c) => c._id !== saved._id);

    updateContacts([saved, ...remainingContacts]);

    setDialog({ mode: "closed" });
  };

  const editingContact =
    dialog.mode === "contact-edit"
      ? contacts.find((c) => c._id === dialog.contactId)
      : undefined;
  const handleNextStep = () => {
    console.log("savedparties", fnolFormData.currentClaim?.partiesInvolved);
    wizardPageProps.handleNext?.();
  };
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleNextStep}
      handlePrevious={wizardPageProps.handlePrevious}
      handleSaveDraft={wizardPageProps.handleSaveDraft}
      showPageheader={false}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <PartyComponent
        primaryClaimant={primaryClaimant}
        contacts={contacts}
        onEditPrimary={handleEditPrimary}
        onEditContact={handleEditContact}
        onDeleteContact={handleDelete}
        onAddContact={handleAdd}
      />

      {dialog.mode === "primary" ? (
        <AddEditPartyDialog
          open
          target="primary"
          primaryClaimant={primaryClaimant}
          onCancel={handleCancel}
          onSave={handleSavePrimary}
        />
      ) : (
        <AddEditPartyDialog
          open={dialog.mode !== "closed"}
          target="party"
          contact={editingContact}
          onCancel={handleCancel}
          onSave={handleSaveContact}
        />
      )}
    </WizardPage>
  );
};

export default PartyStep;
