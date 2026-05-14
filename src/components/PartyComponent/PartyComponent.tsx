import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";
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
import { PARTY_MESSAGES } from "./PartyComponent.messages";
import styles from "./PartyComponent.module.scss";

export type PartyType = "other-driver" | "witness";

export type Party = {
  _id: string;
  type: PartyType;
  name: string;
  description?: string;
};

export type PrimaryClaimant = {
  name: string;
};

type PartyProps = {
  primaryClaimant: PrimaryClaimant;
  parties: Party[];
  onEditPrimary?: () => void;
  onEditParty?: (id: string) => void;
  onDeleteParty?: (id: string) => void;
  onAddParty?: () => void;
  readOnly?: boolean;
};

const TYPE_META: Record<
  PartyType,
  { label: MessageDescriptor; icon: IconDefinition }
> = {
  "other-driver": { label: PARTY_MESSAGES.typeOtherDriver, icon: faCar },
  witness: { label: PARTY_MESSAGES.typeWitness, icon: faUser },
};

export const PartyComponent = ({
  primaryClaimant,
  parties,
  onEditPrimary,
  onEditParty,
  onDeleteParty,
  onAddParty,
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
        {parties.map((party) => {
          const meta = TYPE_META[party.type];
          return (
            <Card
              key={party._id}
              variant="default"
              className={styles.partyRowCard}
            >
              <div className={styles.partyRow}>
                <div className={styles.partyAvatar}>
                  <FontAwesomeIcon icon={meta.icon} />
                </div>
                <div className={styles.partyInfo}>
                  <div className={styles.uppercaseLabel}>
                    {intl.formatMessage(meta.label)}
                  </div>
                  <div className={styles.partyName}>
                    {party.name}
                    {party.description ? ` — ${party.description}` : ""}
                  </div>
                </div>
                <div className={styles.partyActions}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => onEditParty?.(party._id)}
                    disabled={readOnly}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    {intl.formatMessage(PARTY_MESSAGES.editAction)}
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => onDeleteParty?.(party._id)}
                    disabled={readOnly}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                    {intl.formatMessage(PARTY_MESSAGES.deleteAction)}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="large"
        fullWidth
        onClick={onAddParty}
        disabled={readOnly}
      >
        <FontAwesomeIcon icon={faPlus} />
        {intl.formatMessage(PARTY_MESSAGES.addAnotherPerson)}
      </Button>
    </div>
  );
};
