import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Button from "../common/Button/Button";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import FormInput from "../common/FormInput/FormInput";
import { Party, PartyType, PrimaryClaimant } from "./PartyComponent";
import { PARTY_MESSAGES } from "./PartyComponent.messages";
import styles from "./AddEditPartyDialog.module.scss";

type PartyDraft = {
  type: PartyType;
  name: string;
  description: string;
};

type PrimaryDraft = {
  name: string;
};

type CommonProps = {
  open: boolean;
  onCancel: () => void;
};

type PartyTargetProps = CommonProps & {
  target: "party";
  /** Provide to edit an existing party; omit to add a new one. */
  party?: Party;
  onSave: (party: Party) => void;
};

type PrimaryTargetProps = CommonProps & {
  target: "primary";
  primaryClaimant: PrimaryClaimant;
  onSave: (primaryClaimant: PrimaryClaimant) => void;
};

export type AddEditPartyDialogProps = PartyTargetProps | PrimaryTargetProps;

const EMPTY_PARTY_DRAFT: PartyDraft = {
  type: "other-driver",
  name: "",
  description: "",
};

export const AddEditPartyDialog = (props: AddEditPartyDialogProps) => {
  const intl = useIntl();
  const { open, onCancel } = props;

  const [partyDraft, setPartyDraft] = useState<PartyDraft>(EMPTY_PARTY_DRAFT);
  const [primaryDraft, setPrimaryDraft] = useState<PrimaryDraft>({ name: "" });

  useEffect(() => {
    if (!open) return;
    if (props.target === "primary") {
      setPrimaryDraft({ name: props.primaryClaimant.name });
    } else if (props.party) {
      setPartyDraft({
        type: props.party.type,
        name: props.party.name,
        description: props.party.description ?? "",
      });
    } else {
      setPartyDraft(EMPTY_PARTY_DRAFT);
    }
    // We intentionally read props through the closure on open/target change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, props.target]);

  if (!open) return null;

  const isEditingParty =
    props.target === "party" && Boolean(props.party?._id);
  const title =
    props.target === "primary"
      ? intl.formatMessage(PARTY_MESSAGES.formTitlePrimary)
      : intl.formatMessage(
          isEditingParty
            ? PARTY_MESSAGES.formTitleEdit
            : PARTY_MESSAGES.formTitleAdd,
        );

  const typeOptions: ComboboxOption[] = [
    {
      code: "other-driver",
      name: intl.formatMessage(PARTY_MESSAGES.typeOtherDriver),
    },
    {
      code: "witness",
      name: intl.formatMessage(PARTY_MESSAGES.typeWitness),
    },
  ];

  const currentName =
    props.target === "primary" ? primaryDraft.name : partyDraft.name;
  const canSave = currentName.trim().length > 0;

  const handleSave = () => {
    if (props.target === "primary") {
      props.onSave({ name: primaryDraft.name.trim() });
    } else {
      const id = props.party?._id ?? `p${Date.now()}`;
      props.onSave({
        _id: id,
        type: partyDraft.type,
        name: partyDraft.name.trim(),
        description: partyDraft.description.trim() || undefined,
      });
    }
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onCancel}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>

        <div className={styles.body}>
          {props.target === "party" && (
            <>
              <Combobox
                label={intl.formatMessage(PARTY_MESSAGES.formTypeLabel)}
                options={typeOptions}
                value={
                  typeOptions.find((opt) => opt.code === partyDraft.type) ??
                  typeOptions[0]
                }
                onChange={(option) =>
                  setPartyDraft((prev) => ({
                    ...prev,
                    type: option.code as PartyType,
                  }))
                }
                fullWidth
              />
              <FormInput
                label={intl.formatMessage(PARTY_MESSAGES.formNameLabel)}
                value={partyDraft.name}
                onChange={(e) =>
                  setPartyDraft((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <FormInput
                label={intl.formatMessage(PARTY_MESSAGES.formDescriptionLabel)}
                value={partyDraft.description}
                onChange={(e) =>
                  setPartyDraft((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder={intl.formatMessage(
                  PARTY_MESSAGES.formDescriptionPlaceholder,
                )}
              />
            </>
          )}

          {props.target === "primary" && (
            <FormInput
              label={intl.formatMessage(PARTY_MESSAGES.namedInsuredLabel)}
              value={primaryDraft.name}
              onChange={(e) => setPrimaryDraft({ name: e.target.value })}
              required
            />
          )}
        </div>

        <footer className={styles.footer}>
          <Button variant="secondary" size="medium" onClick={onCancel}>
            {intl.formatMessage(PARTY_MESSAGES.formCancel)}
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={handleSave}
            disabled={!canSave}
          >
            {intl.formatMessage(PARTY_MESSAGES.formSave)}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default AddEditPartyDialog;
