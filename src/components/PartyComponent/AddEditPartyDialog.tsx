import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Button from "../common/Button/Button";
import FormInput from "../common/FormInput/FormInput";

import { TypeKeyValue } from "../../api/utils/types";
import {
  ClaimContact,
  PrimaryClaimant,
  ROLE_CODES,
} from "./PartyComponent";

import { PARTY_MESSAGES } from "./PartyComponent.messages";

import styles from "./AddEditPartyDialog.module.scss";

const ROLE_OPTIONS: TypeKeyValue[] = [
  { code: ROLE_CODES.otherDriver, name: "Other Driver / Third Party" },
  { code: ROLE_CODES.witness, name: "Witness / Passenger" },
];

type ContactDraft = {
  name: string;
  phone: string;
  emailAddress: string;
  description: string;
  role?: TypeKeyValue;
};

type PrimaryDraft = {
  name: string;
};

type CommonProps = {
  open: boolean;
  onCancel: () => void;
};

type ContactTargetProps = CommonProps & {
  target: "party";
  contact?: ClaimContact;
  onSave: (contact: ClaimContact) => void;
};

type PrimaryTargetProps = CommonProps & {
  target: "primary";
  primaryClaimant: PrimaryClaimant;
  onSave: (primaryClaimant: PrimaryClaimant) => void;
};

export type AddEditPartyDialogProps =
  | ContactTargetProps
  | PrimaryTargetProps;

const EMPTY_CONTACT_DRAFT: ContactDraft = {
  name: "",
  phone: "",
  emailAddress: "",
  description: "",
  role: undefined,
};

export const AddEditPartyDialog = (
  props: AddEditPartyDialogProps,
) => {
  const intl = useIntl();

  const { open, onCancel } = props;

  const [contactDraft, setContactDraft] =
    useState<ContactDraft>(EMPTY_CONTACT_DRAFT);

  const [primaryDraft, setPrimaryDraft] =
    useState<PrimaryDraft>({
      name: "",
    });

  useEffect(() => {
    if (!open) return;

    if (props.target === "primary") {
      setPrimaryDraft({
        name: props.primaryClaimant.name,
      });
    } else if (props.contact) {
      setContactDraft({
        name: props.contact.name ?? "",
        phone: props.contact.phone ?? "",
        emailAddress: props.contact.emailAddress ?? "",
        description: props.contact.description ?? "",
        role: props.contact.roles?.[0],
      });
    } else {
      setContactDraft(EMPTY_CONTACT_DRAFT);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, props.target]);

  if (!open) return null;

  const isEditingContact =
    props.target === "party" &&
    Boolean(props.contact?._id);

  const title =
    props.target === "primary"
      ? intl.formatMessage(
          PARTY_MESSAGES.formTitlePrimary,
        )
      : intl.formatMessage(
          isEditingContact
            ? PARTY_MESSAGES.formTitleEdit
            : PARTY_MESSAGES.formTitleAdd,
        );

  const selectRole = (role: TypeKeyValue) => {
    setContactDraft((prev) => ({
      ...prev,
      role,
    }));
  };

  const isRoleSelected = (code: string) =>
    contactDraft.role?.code === code;

  const canSave =
    props.target === "primary"
      ? primaryDraft.name.trim().length > 0
      : contactDraft.name.trim().length > 0 &&
        Boolean(contactDraft.role);

  const handleSave = () => {
    if (props.target === "primary") {
      props.onSave({
        name: primaryDraft.name.trim(),
      });

      return;
    }

    const id =
      props.contact?._id ?? `c${Date.now()}`;

    const saved: ClaimContact = {
      _id: id,
      roles: contactDraft.role
        ? [contactDraft.role]
        : [],
      name:
        contactDraft.name.trim() || undefined,
      phone:
        contactDraft.phone.trim() || undefined,
      emailAddress:
        contactDraft.emailAddress.trim() ||
        undefined,
      description:
        contactDraft.description.trim() ||
        undefined,
    };

    props.onSave(saved);
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onCancel}
    >
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 className={styles.title}>
            {title}
          </h2>
        </header>

        <div className={styles.body}>
          {props.target === "party" && (
            <>
              <fieldset
                className={styles.rolesFieldset}
              >
                <legend
                  className={styles.rolesLegend}
                >
                  {intl.formatMessage(
                    PARTY_MESSAGES.formRolesLabel,
                  )}
                </legend>

                <div
                  className={styles.rolesGroup}
                >
                  {ROLE_OPTIONS.map((role) => (
                    <label
                      key={role.code}
                      className={
                        styles.roleOption
                      }
                    >
                      <input
                        type="radio"
                        name="role"
                        checked={isRoleSelected(
                          role.code,
                        )}
                        onChange={() =>
                          selectRole(role)
                        }
                      />

                      <span>{role.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <FormInput
                label={intl.formatMessage(
                  PARTY_MESSAGES.formNameLabel,
                )}
                value={contactDraft.name}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />

              <FormInput
                label={intl.formatMessage(
                  PARTY_MESSAGES.formPhoneLabel,
                )}
                type="tel"
                value={contactDraft.phone}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />

              <FormInput
                label={intl.formatMessage(
                  PARTY_MESSAGES.formEmailLabel,
                )}
                type="email"
                value={contactDraft.emailAddress}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    emailAddress:
                      e.target.value,
                  }))
                }
              />

              <FormInput
                label={intl.formatMessage(
                  PARTY_MESSAGES.formDescriptionLabel,
                )}
                value={
                  contactDraft.description
                }
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    description:
                      e.target.value,
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
              label={intl.formatMessage(
                PARTY_MESSAGES.namedInsuredLabel,
              )}
              value={primaryDraft.name}
              onChange={(e) =>
                setPrimaryDraft({
                  name: e.target.value,
                })
              }
              required
            />
          )}
        </div>

        <footer className={styles.footer}>
          <Button
            variant="secondary"
            size="medium"
            onClick={onCancel}
          >
            {intl.formatMessage(
              PARTY_MESSAGES.formCancel,
            )}
          </Button>

          <Button
            variant="primary"
            size="medium"
            onClick={handleSave}
            disabled={!canSave}
          >
            {intl.formatMessage(
              PARTY_MESSAGES.formSave,
            )}
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default AddEditPartyDialog;