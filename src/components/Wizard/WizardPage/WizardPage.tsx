import React from "react";
import styles from "./WizardPage.module.scss";

export const WizardPage = ({
  title,
  description,
  buttonProps,
  handleNext,
  handleBack,
  children,
  isFirstStep, // Passed down from Wizard
}: any) => {
  return (
    <div className={styles["wizard-page-container"]}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

      <div className={styles["step-content"]}>{children}</div>

      <div className={styles.actions}>
        {!isFirstStep && (
          <button className={styles["btn-secondary"]} onClick={handleBack}>
            {buttonProps?.previous?.label || "Back"}
          </button>
        )}

        <button className={styles["btn-primary"]} onClick={handleNext}>
          {buttonProps?.next?.label || "Continue"}
        </button>
      </div>
    </div>
  );
};
