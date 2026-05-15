import React from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../common/Button/Button";

import { CLAIM_SUBMITTED_MESSAGES } from "./ClaimSubmittedComponent.messages";

import styles from "./ClaimSubmittedComponent.module.scss";

type ClaimSubmittedProps = {
  claimNumber: string;
  submittedDate: string;
  emailAddress: string;
  onFileAnotherClaim?: () => void;
  onViewDashboard?: () => void;
};

const ClaimSubmitted = ({
  claimNumber,
  submittedDate,
  emailAddress,
  onFileAnotherClaim,
  onViewDashboard,
}: ClaimSubmittedProps) => {
  const intl = useIntl();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.successIconWrapper}>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles.successIcon}
          />
        </div>

        <h1 className={styles.title}>
          {intl.formatMessage(
            CLAIM_SUBMITTED_MESSAGES.title,
          )}
        </h1>

        <p className={styles.subtitle}>
          {intl.formatMessage(
            CLAIM_SUBMITTED_MESSAGES.subtitle,
          )}
        </p>

        <div className={styles.claimNumber}>
          {claimNumber}
        </div>

        <div className={styles.submittedDate}>
          {submittedDate}
        </div>

        <div
          className={styles.emailBanner}
          role="status"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className={styles.emailIcon}
          />

          <span>
            {intl.formatMessage(
              CLAIM_SUBMITTED_MESSAGES.emailSentPrefix,
            )}{" "}
            <strong>{emailAddress}</strong>.
          </span>
        </div>

        <div className={styles.nextSteps}>
          <h2 className={styles.nextStepsTitle}>
            {intl.formatMessage(
              CLAIM_SUBMITTED_MESSAGES.nextStepsTitle,
            )}
          </h2>

          <div className={styles.stepRow}>
            <div className={styles.stepBadge}>
              1
            </div>

            <div className={styles.stepContent}>
              <span className={styles.stepHeading}>
                {intl.formatMessage(
                  CLAIM_SUBMITTED_MESSAGES.assignmentTitle,
                )}
              </span>

              <span className={styles.stepText}>
                {" "}
                {intl.formatMessage(
                  CLAIM_SUBMITTED_MESSAGES.assignmentDescription,
                )}
              </span>
            </div>
          </div>

          <div className={styles.stepRow}>
            <div className={styles.stepBadge}>
              2
            </div>

            <div className={styles.stepContent}>
              <span className={styles.stepHeading}>
                {intl.formatMessage(
                  CLAIM_SUBMITTED_MESSAGES.inspectionTitle,
                )}
              </span>

              <span className={styles.stepText}>
                {" "}
                {intl.formatMessage(
                  CLAIM_SUBMITTED_MESSAGES.inspectionDescription,
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={onFileAnotherClaim}
          >
            {intl.formatMessage(
              CLAIM_SUBMITTED_MESSAGES.fileAnotherClaim,
            )}
          </Button>

          <Button
            variant="secondary"
            size="large"
            onClick={onViewDashboard}
          >
            {intl.formatMessage(
              CLAIM_SUBMITTED_MESSAGES.viewDashboard,
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimSubmitted;