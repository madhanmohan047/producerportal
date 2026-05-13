import React from "react";
import { WizardPageConfig } from "../../../types/Wizardtype";
import styles from "./WizardProgressBar.module.scss";
import checkmarkicon from "../../../assets/images/checkmarkicon.png";

const WizardProgressBar = ({
  progressbarProps,
  index,
  currentIndex,
}: {
  progressbarProps: WizardPageConfig;
  index: number;
  currentIndex: number;
}) => {
  const isCompleted = index < currentIndex;
  const isActive = index === currentIndex;

  return (
    <div className={styles["step-wrapper"]}>
      <div className={styles["step-container"]}>
        {/* <div
          className={`${styles["step-circle"]} ${
            isCompleted
              ? styles.completed
              : isActive
                ? styles.active
                : styles.pending
          }`}
        >
          {progressbarProps.stepId}
        </div> */}
        {isCompleted ? (
          <div className={`${styles["step-circle"]} ${styles.completed}`}>
            <img src={checkmarkicon} alt="Logo" className={styles["icon"]} />
          </div>
        ) : (
          <div
            className={`${styles["step-circle"]} ${isActive ? styles.active : styles.pending}`}
          >
            {progressbarProps.stepId}
          </div>
        )}

        {!progressbarProps.hideNameInProgress && (
          <div
            className={`${styles["step-title"]} ${
              isActive ? styles["step-title--active"] : ""
            }`}
          >
            {progressbarProps.title}
          </div>
        )}
      </div>

      {!progressbarProps.isSubmission && (
        <div className={styles["step-line"]} />
      )}
    </div>
  );
};

export default WizardProgressBar;
