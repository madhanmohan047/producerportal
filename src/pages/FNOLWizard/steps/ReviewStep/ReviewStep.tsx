import React, { useState, useEffect } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import styles from "./ReviewStep.module.scss";
const ReviewStep = (wizardPageProps: WizardPageProps) => {
  const [isCertify, setIsCertify] = useState(false);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const handleSubmit = () => {
    if (isAuthorize && isCertify) {
      setIsShowError(false);
      //todo post api
      wizardPageProps.handleNext?.();
    } else {
      setIsShowError(true);
    }
  };
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
      handlePrevious={wizardPageProps.handlePrevious}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div className={styles.container}>
        <div className={styles["step-header"]}>
          <h2>Review & Submit</h2>
          <p>
            Confirm that the information provided is correct before official
            submission.
          </p>
          <div className={styles["summary-table"]}>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Policy Number</span>
              <span className={styles["summary-val"]}></span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Line of Business</span>
              <span className={styles["summary-val"]}></span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Date of Loss</span>
              <span className={styles["summary-val"]}></span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Injuries Reported</span>
              <span className={styles["summary-val"]}></span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Police Report</span>
              <span className={styles["summary-val"]}></span>
            </div>
            <div className={styles["summary-row"]}>
              <span className={styles["summary-label"]}>Damage Areas</span>
              <span className={styles["summary-val"]}></span>
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
                I certify that the information provided is accurate and
                complete.
              </span>
            </div>
            <div className={styles.checkboxrow}>
              <input
                type="checkbox"
                checked={isAuthorize}
                onChange={(e) => setIsAuthorize(e.target.checked)}
              />
              <span className={styles.chekboxspan}>
                I authorize the insurer to collect data necessary to process
                this claim.
              </span>
            </div>
            <div className={styles.alert}>
              <i className="fa-solid fa-triangle-exclamation"></i>{" "}
              <span>
                Submitting a fraudulent claim is a legal offense. All
                information is subject to verification.
              </span>
            </div>
            {isShowError && (
              <div className={styles.error}>
                <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                <span>
                  You must agree to the terms before sumitting the claim
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </WizardPage>
  );
};
export default ReviewStep;
