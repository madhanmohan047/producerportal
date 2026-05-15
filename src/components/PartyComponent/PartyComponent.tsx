import React from "react";
import { useIntl } from "react-intl";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faTrashCan,
  faPlus,
  faCar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";
import StatusBadge from "../common/StatusBadge/StatusBadge";
import { Base, TypeKeyValue } from "../../api/utils/types";
import { PARTY_MESSAGES } from "./PartyComponent.messages";
import styles from "./PartyComponent.module.scss";

export interface ClaimContact extends Base {
  name?: string;
  phone?: string;
  roles: TypeKeyValue[];
  emailAddress?: string;
  description?: string;
}

export type PrimaryClaimant = {
  name: string;
};

export const ROLE_CODES = {
  otherDriver: "other-driver",
  witness: "witness",
} as const;

const ROLE_ICON: Record<string, IconDefinition> = {
  [ROLE_CODES.otherDriver]: faCar,
  [ROLE_CODES.witness]: faUser,
};

type PartyProps = {
  primaryClaimant: PrimaryClaimant;
  contacts: ClaimContact[];
  onEditPrimary?: () => void;
  onEditContact?: (id: string) => void;
  onDeleteContact?: (id: string) => void;
  onAddContact?: () => void;
  readOnly?: boolean;
};

const displayNameFor = (contact: ClaimContact): string => {
  if (contact.name && contact.name.trim()) return contact.name;
  if (contact.roles.length > 0) return contact.roles[0].name;
  return "—";
};

const rolesLabelFor = (contact: ClaimContact): string =>
  contact.roles.map((r) => r.name).join(" / ");

const iconFor = (contact: ClaimContact): IconDefinition =>
  ROLE_ICON[contact.roles[0]?.code] ?? faUser;

export const PartyComponent = ({
  primaryClaimant,
  contacts,
  onEditPrimary,
  onEditContact,
  onDeleteContact,
  onAddContact,
  readOnly,
}: PartyProps) => {
  const intl = useIntl();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {intl.formatMessage(PARTY_MESSAGES.title)}
        </h1>
        <p className={styles.subtitle}>
          {intl.formatMessage(PARTY_MESSAGES.subtitle)}
        </p>
      </header>

      <div className={styles.infoBanner} role="status">
        <FontAwesomeIcon icon={faCircleInfo} className={styles.infoIcon} />
        <span>{intl.formatMessage(PARTY_MESSAGES.infoBanner)}</span>
      </div>

      <Card variant="default" className={styles.primaryCard}>
        <div className={styles.primaryHeader}>
          <span className={styles.primaryTitle}>
            {intl.formatMessage(PARTY_MESSAGES.primaryClaimantLabel)}
          </span>
          <StatusBadge
            status={intl.formatMessage(PARTY_MESSAGES.insuredBadge)}
            variant="success"
          />
        </div>
        <div className={styles.primaryBody}>
          <div>
            <div className={styles.uppercaseLabel}>
              {intl.formatMessage(PARTY_MESSAGES.namedInsuredLabel)}
            </div>
            <div className={styles.primaryName}>{primaryClaimant.name}</div>
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={onEditPrimary}
            disabled={readOnly}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            {intl.formatMessage(PARTY_MESSAGES.editAction)}
          </Button>
        </div>
      </Card>

      <h2 className={styles.sectionHeading}>
        {intl.formatMessage(PARTY_MESSAGES.whoElseHeading)}
      </h2>

      <div className={styles.partyList}>
        {contacts.map((contact) => (
          <Card
            key={contact._id}
            variant="default"
            className={styles.partyRowCard}
          >
            <div className={styles.partyRow}>
              <div className={styles.partyAvatar}>
                <FontAwesomeIcon icon={iconFor(contact)} />
              </div>
              <div className={styles.partyInfo}>
                <div className={styles.uppercaseLabel}>
                  {rolesLabelFor(contact)}
                </div>
                <div className={styles.partyName}>
                  {displayNameFor(contact)}
                  {contact.description ? ` — ${contact.description}` : ""}
                </div>
              </div>
              <div className={styles.partyActions}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => contact._id && onEditContact?.(contact._id)}
                  disabled={readOnly || !contact._id}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  {intl.formatMessage(PARTY_MESSAGES.editAction)}
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => contact._id && onDeleteContact?.(contact._id)}
                  disabled={readOnly || !contact._id}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  {intl.formatMessage(PARTY_MESSAGES.deleteAction)}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        variant="primary"
        size="large"
        fullWidth
        onClick={onAddContact}
        disabled={readOnly}
      >
        <FontAwesomeIcon icon={faPlus} />
        {intl.formatMessage(PARTY_MESSAGES.addAnotherPerson)}
      </Button>
    </div>
  );
};
