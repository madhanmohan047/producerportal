import { useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import {
  PartyComponent,
  ClaimContact,
  PrimaryClaimant,
  ROLE_CODES,
} from "../../../../components/PartyComponent/PartyComponent";
import AddEditPartyDialog from "../../../../components/PartyComponent/AddEditPartyDialog";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { TypeKeyValue } from "../../../../api/utils/types";

const INITIAL_PRIMARY: PrimaryClaimant = {
  name: "Sarah Mitchell",
};

const otherDriverRole: TypeKeyValue = {
  code: ROLE_CODES.otherDriver,
  name: "Third Party",
};
const witnessRole: TypeKeyValue = {
  code: ROLE_CODES.witness,
  name: "Witness",
};

const INITIAL_CONTACTS: ClaimContact[] = [
  {
    _id: "c1",
    name: "John Doe",
    roles: [otherDriverRole],
    description: "Blue Honda Civic (ABC-123)",
  },
  {
    _id: "c2",
    name: "Jane Smith",
    roles: [witnessRole],
    description: "Bystander",
  },
];

type DialogState =
  | { mode: "closed" }
  | { mode: "primary" }
  | { mode: "contact-add" }
  | { mode: "contact-edit"; contactId: string };

const PartyStep = (wizardPageProps: WizardPageProps) => {
  const [primaryClaimant, setPrimaryClaimant] =
    useState<PrimaryClaimant>(INITIAL_PRIMARY);
  const [contacts, setContacts] = useState<ClaimContact[]>(INITIAL_CONTACTS);
  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });

  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const handleAdd = () => setDialog({ mode: "contact-add" });

  const handleEditContact = (id: string) =>
    setDialog({ mode: "contact-edit", contactId: id });

  const handleEditPrimary = () => setDialog({ mode: "primary" });

  const handleCancel = () => setDialog({ mode: "closed" });

  const handleSaveContact = (saved: ClaimContact) => {
    setContacts((prev) => {
      const exists = prev.some((c) => c._id === saved._id);
      return exists
        ? prev.map((c) => (c._id === saved._id ? saved : c))
        : [...prev, saved];
    });
    setDialog({ mode: "closed" });
  };

  const handleSavePrimary = (saved: PrimaryClaimant) => {
    setPrimaryClaimant(saved);
    setDialog({ mode: "closed" });
  };

  const editingContact =
    dialog.mode === "contact-edit"
      ? contacts.find((c) => c._id === dialog.contactId)
      : undefined;

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      handleSaveDraft={wizardPageProps.handleSaveDraft}
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
