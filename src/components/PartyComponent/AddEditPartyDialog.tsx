import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Button from "../common/Button/Button";
import FormInput from "../common/FormInput/FormInput";

import { TypeKeyValue } from "../../api/utils/types";

import { PARTY_MESSAGES } from "./PartyComponent.messages";

import styles from "./AddEditPartyDialog.module.scss";

import { ClaimContact } from "../../api/services/claim/types/ClaimContact";
import { getTypeList } from "../../api/services/typelist/typelistApi";

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
  primaryClaimant?: ClaimContact;
  onSave: (primaryClaimant: ClaimContact) => void;
};

export type AddEditPartyDialogProps = ContactTargetProps | PrimaryTargetProps;

const EMPTY_ROLE: TypeKeyValue = {
  code: "",
  name: "",
};

const EMPTY_CONTACT: ClaimContact = {
  firstName: "",
  lastName: "",
  cellPhone: "",
  emailAddress: "",
  type: EMPTY_ROLE,
  roles: [],
};

export const AddEditPartyDialog = (props: AddEditPartyDialogProps) => {
  const intl = useIntl();

  const { open, onCancel } = props;

  const [roleOptions, setRoleOptions] = useState<TypeKeyValue[]>([]);

  const [contactDraft, setContactDraft] = useState<ClaimContact>(EMPTY_CONTACT);

  const [primaryDraft, setPrimaryDraft] = useState<ClaimContact>({
    ...EMPTY_CONTACT,
  });

  useEffect(() => {
    const loadRoles = () => {
      getTypeList("ClaimContactRole")
        .then((response: any) => {
          console.log("roles response:", response);

          const roles: TypeKeyValue[] = Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
              ? response.data
              : Array.isArray(response?.data?.data)
                ? response.data.data
                : [];

          setRoleOptions(roles);

          if (roles.length > 0) {
            setContactDraft((prev) => ({
              ...prev,
              type: prev.type?.code ? prev.type : roles[0],
            }));

            setPrimaryDraft((prev) => ({
              ...prev,
              type: prev.type?.code ? prev.type : roles[0],
            }));
          }
        })
        .catch((error) => {
          console.error("Failed to load contact roles", error);
          setRoleOptions([]); // IMPORTANT fallback
        });
    };

    loadRoles();
  }, []);

  useEffect(() => {
    if (!open) return;

    if (props.target === "primary") {
      setPrimaryDraft({
        ...EMPTY_CONTACT,
        ...props.primaryClaimant,
        type: props.primaryClaimant?.type ?? roleOptions[0] ?? EMPTY_ROLE,
        roles: props.primaryClaimant?.roles ?? [],
        firstName: props.primaryClaimant?.firstName ?? "",
      });

      return;
    }

    if (props.contact) {
      setContactDraft({
        ...EMPTY_CONTACT,
        ...props.contact,
        type:
          props.contact.type ??
          props.contact.roles?.[0] ??
          roleOptions[0] ??
          EMPTY_ROLE,
        roles: props.contact.roles ?? [],
      });
    } else {
      setContactDraft({
        ...EMPTY_CONTACT,
        type: roleOptions[0] ?? EMPTY_ROLE,
      });
    }
  }, [open, props, roleOptions]);

  if (!open) return null;

  const isEditingContact =
    props.target === "party" && Boolean(props.contact?._id);

  const title =
    props.target === "primary"
      ? intl.formatMessage(PARTY_MESSAGES.formTitlePrimary)
      : intl.formatMessage(
          isEditingContact
            ? PARTY_MESSAGES.formTitleEdit
            : PARTY_MESSAGES.formTitleAdd,
        );

  const selectRole = (role: TypeKeyValue) => {
    setContactDraft((prev) => ({
      ...prev,
      type: role,
      roles: [role],
    }));
  };

  const isRoleSelected = (code: string) => contactDraft.type?.code === code;

  const canSave =
    props.target === "primary"
      ? Boolean(primaryDraft.firstName?.trim())
      : Boolean(contactDraft.firstName?.trim()) &&
        Boolean(contactDraft.type?.code);

  const handleSave = () => {
    if (props.target === "primary") {
      props.onSave({
        ...primaryDraft,
        firstName: primaryDraft.firstName?.trim() || "",
      });

      return;
    }

    const saved: ClaimContact = {
      ...contactDraft,
      _id: contactDraft._id ?? crypto.randomUUID(),

      firstName: contactDraft.firstName?.trim() || undefined,

      lastName: contactDraft.lastName?.trim() || undefined,

      cellPhone: contactDraft.cellPhone?.trim() || undefined,

      emailAddress: contactDraft.emailAddress?.trim() || undefined,

      type: contactDraft.type,

      roles: contactDraft.type?.code ? [contactDraft.type] : [],
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
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>

        <div className={styles.body}>
          {props.target === "party" && (
            <>
              <fieldset className={styles.rolesFieldset}>
                <legend className={styles.rolesLegend}>
                  {intl.formatMessage(PARTY_MESSAGES.formRolesLabel)}
                </legend>

                <div className={styles.rolesGroup}>
                  {roleOptions.map((role) => (
                    <label key={role.code} className={styles.roleOption}>
                      <input
                        type="radio"
                        name="role"
                        checked={isRoleSelected(role.code)}
                        onChange={() => selectRole(role)}
                      />

                      <span>{role.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <FormInput
                label={intl.formatMessage(PARTY_MESSAGES.formNameLabel)}
                value={contactDraft.firstName ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
              />

              <FormInput
                label="Last Name"
                value={contactDraft.lastName ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />

              <FormInput
                label={intl.formatMessage(PARTY_MESSAGES.formPhoneLabel)}
                type="tel"
                value={contactDraft.cellPhone ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    cellPhone: e.target.value,
                  }))
                }
              />

              <FormInput
                label={intl.formatMessage(PARTY_MESSAGES.formEmailLabel)}
                type="email"
                value={contactDraft.emailAddress ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    emailAddress: e.target.value,
                  }))
                }
              />
            </>
          )}

          {props.target === "primary" && (
            <FormInput
              label={intl.formatMessage(PARTY_MESSAGES.namedInsuredLabel)}
              value={primaryDraft.firstName ?? ""}
              onChange={(e) =>
                setPrimaryDraft((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
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
