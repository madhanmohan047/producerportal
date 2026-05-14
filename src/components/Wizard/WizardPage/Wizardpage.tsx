import React, { useState } from "react";
import { WizardPageProps } from "../../../types/Wizardtype";
import IconButton from "../../IconButton/IconButton";
import WizardSidebar from "../WizardSidebar/WizardSidebar";
import styles from "./Wizardpage.module.scss";
import saveIcon from "../../../assets/images/saveIcon.png";
import { Button } from "../../common";
import backButton from "../../../assets/images/backButton.png";

const WizardPage = (wizardPageProps: WizardPageProps) => {
  return (
    <div className={styles["wizard-page"]}>
      <div className={styles["wizard-page-container"]}>
        <div className={styles["wizard-page-sidebar"]}>
          {wizardPageProps.wizardSidebarprops && <WizardSidebar />}
        </div>
        <div className={styles["wizard-page-content"]}>
          {wizardPageProps.children}
        </div>
      </div>

      <div className={styles["wizard-page-actions"]}>
        {wizardPageProps?.step?.wizardPageConfig?.buttonProps?.previous.label
          .length > 0 && (
          <IconButton
            label={
              wizardPageProps?.step?.wizardPageConfig?.buttonProps?.previous
                ?.label ?? ""
            }
            icon={<img src={backButton} alt="save" />}
            type="button"
            variant="transparent"
            className={styles["icon-button"]}
            onClick={wizardPageProps.handlePrevious}
          />
        )}
        {/* {wizardPageProps?.step?.wizardPageConfig?.buttonProps?.previous.label} */}
        {(wizardPageProps?.step?.wizardPageConfig?.buttonProps?.saveDraft?.label
          ?.length ?? 0) > 0 && (
          <IconButton
            label={
              wizardPageProps?.step?.wizardPageConfig?.buttonProps?.saveDraft
                ?.label ?? ""
            }
            icon={<img src={saveIcon} alt="save" />}
            type="button"
            className={styles["icon-button"]}
            onClick={wizardPageProps.handleSaveDraft}
          />
        )}
        <Button
          className={styles["wizard-button"]}
          onClick={wizardPageProps.handleNext}
          variant="primary"
        >
          {wizardPageProps?.step?.wizardPageConfig?.buttonProps?.next.label}
        </Button>
      </div>
    </div>
  );
};

export default WizardPage;
