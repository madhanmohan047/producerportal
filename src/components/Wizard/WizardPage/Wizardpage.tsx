import React from "react";
import { WizardPageProps } from "../../../types/Wizardtype";
import styles from "./Wizardpage.module.scss";

const WizardPage = (wizardPageProps: WizardPageProps) => {
  return (
    <div className={styles["wizard-page"]}>
      <div className={styles["wizard-page-content"]}>
        {wizardPageProps.children}
      </div>

      <div className={styles["wizard-page-actions"]}>
        <button
          className={styles["wizard-button"]}
          onClick={wizardPageProps.handlePrevious}
          style={{
            visibility:
              wizardPageProps.step.wizardPageConfig.buttonProps.previous.label
                .length > 0
                ? "visible"
                : "hidden",
          }}
        >
          {wizardPageProps.step.wizardPageConfig.buttonProps.previous.label}
        </button>

        <button
          className={styles["wizard-button"]}
          onClick={wizardPageProps.handleNext}
        >
          {wizardPageProps.step.wizardPageConfig.buttonProps.next.label}
        </button>
      </div>
    </div>
  );
};

export default WizardPage;
