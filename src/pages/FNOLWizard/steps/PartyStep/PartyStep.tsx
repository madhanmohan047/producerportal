import { useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import {
  PartyComponent,
  Party,
  PrimaryClaimant,
} from "../../../../components/PartyComponent/PartyComponent";
import AddEditPartyDialog from "../../../../components/PartyComponent/AddEditPartyDialog";
import { WizardPageProps } from "../../../../types/Wizardtype";

const INITIAL_PRIMARY: PrimaryClaimant = {
  name: "Sarah Mitchell",
};

const INITIAL_PARTIES: Party[] = [
  {
    _id: "p1",
    type: "other-driver",
    name: "John Doe",
    description: "Blue Honda Civic (ABC-123)",
  },
  {
    _id: "p2",
    type: "witness",
    name: "Jane Smith",
    description: "Bystander",
  },
];

type DialogState =
  | { mode: "closed" }
  | { mode: "primary" }
  | { mode: "party-add" }
  | { mode: "party-edit"; partyId: string };

const PartyStep = (wizardPageProps: WizardPageProps) => {
  const [primaryClaimant, setPrimaryClaimant] =
    useState<PrimaryClaimant>(INITIAL_PRIMARY);
  const [parties, setParties] = useState<Party[]>(INITIAL_PARTIES);
  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });

  const handleDelete = (id: string) => {
    setParties((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAdd = () => setDialog({ mode: "party-add" });

  const handleEditParty = (id: string) =>
    setDialog({ mode: "party-edit", partyId: id });

  const handleEditPrimary = () => setDialog({ mode: "primary" });

  const handleCancel = () => setDialog({ mode: "closed" });

  const handleSaveParty = (saved: Party) => {
    setParties((prev) => {
      const exists = prev.some((p) => p._id === saved._id);
      return exists
        ? prev.map((p) => (p._id === saved._id ? saved : p))
        : [...prev, saved];
    });
    setDialog({ mode: "closed" });
  };

  const handleSavePrimary = (saved: PrimaryClaimant) => {
    setPrimaryClaimant(saved);
    setDialog({ mode: "closed" });
  };

  const editingParty =
    dialog.mode === "party-edit"
      ? parties.find((p) => p._id === dialog.partyId)
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
        parties={parties}
        onEditPrimary={handleEditPrimary}
        onEditParty={handleEditParty}
        onDeleteParty={handleDelete}
        onAddParty={handleAdd}
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
          party={editingParty}
          onCancel={handleCancel}
          onSave={handleSaveParty}
        />
      )}
    </WizardPage>
  );
};

export default PartyStep;
