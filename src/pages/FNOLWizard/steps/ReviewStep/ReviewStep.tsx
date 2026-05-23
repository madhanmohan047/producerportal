import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import styles from "./ReviewStep.module.scss";
import { useFNOLContext } from "../../FNOLWizardContext";
import messages from "./ReviewStep.messages";
import {
  getClaimById,
  updateClaim,
} from "../../../../api/services/claim/claimApi";
import { Claim } from "../../../../api/services/claim/types/Claim";

const ReviewStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();

  const [isCertify, setIsCertify] = useState(false);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const { fnolFormData } = useFNOLContext();

  const handleSubmit = () => {
    if (isAuthorize && isCertify) {
      setIsShowError(false);

      wizardPageProps.handleNext?.();
    } else {
      setIsShowError(true);
    }
  };

  const updateClaimData = (claim: Claim) => {};
  useEffect(() => {
    getClaimById(fnolFormData?.currentClaim?.claimNumber || "").then(
      (response) => {
        const claim = response.data?.data;
        updateClaimData(claim);
        console.log("claim from api", claim);
        console.log("claim from formdata", fnolFormData.currentClaim);
      },
    );
  }, []);
  useEffect(() => {
    if (isShowError && isCertify && isAuthorize) {
      setIsShowError(false);
    }
  }, [isAuthorize, isCertify]);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleSubmit}
      showPageheader={false}
      handlePrevious={wizardPageProps.handlePrevious}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div className={styles.container}>
        <div className={styles["step-header"]}>
          <h2>{intl.formatMessage(messages.title)}</h2>

          <p>{intl.formatMessage(messages.subtitle)}</p>

          <div className={styles["summary-table"]}>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.policyNumber)}
              </span>

              <span className={styles["summary-val"]}>
                {fnolFormData.policyNumber}
              </span>
            </div>

            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.lineOfBusiness)}
              </span>

              <span className={styles["summary-val"]}>
                {fnolFormData.lineOfBusiness}
              </span>
            </div>

            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.dateOfLoss)}
              </span>

              <span className={styles["summary-val"]}>
                {fnolFormData.dateOfLoss}
              </span>
            </div>

            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.injuriesReported)}
              </span>

              <span className={styles["summary-val"]}>
                {fnolFormData.injured
                  ? intl.formatMessage(messages.yes)
                  : intl.formatMessage(messages.no)}
              </span>
            </div>

            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.policeReport)}
              </span>

              <span className={styles["summary-val"]}>
                {fnolFormData.policeReport
                  ? intl.formatMessage(messages.yes)
                  : intl.formatMessage(messages.no)}
              </span>
            </div>

            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>
                {intl.formatMessage(messages.damageAreas)}
              </span>

              <div className={styles["summary-val"]}>
                <span className={styles["summary-val"]}>
                  {fnolFormData.damage?.damageAreas
                    ?.map((damagedArea) => damagedArea)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.confirmcontainer}>
            <div className={styles.checkboxrow}>
              <input
                type="checkbox"
                checked={isCertify}
                onChange={(e) => setIsCertify(e.target.checked)}
              />

              <span className={styles.chekboxspan}>
                {intl.formatMessage(messages.certifyText)}
              </span>
            </div>

            <div className={styles.checkboxrow}>
              <input
                type="checkbox"
                checked={isAuthorize}
                onChange={(e) => setIsAuthorize(e.target.checked)}
              />

              <span className={styles.chekboxspan}>
                {intl.formatMessage(messages.authorizeText)}
              </span>
            </div>

            <div className={styles.alert}>
              <i className="fa-solid fa-triangle-exclamation"></i>

              <span>{intl.formatMessage(messages.fraudWarning)}</span>
            </div>

            {isShowError && (
              <div className={styles.error}>
                <i className="fa-solid fa-triangle-exclamation"></i>

                <span>{intl.formatMessage(messages.validationError)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </WizardPage>
  );
};

export default ReviewStep;
