import { WizardPageConfig } from "../../../types/Wizardtype";
import styles from "./WizardProgressBar.module.scss";
import checkmarkicon from "../../../assets/images/checkmarkicon.png";

const WizardProgressBar = ({
  progressbarProps,
  index,
  currentIndex,
  onClick,
}: {
  progressbarProps: WizardPageConfig;
  index: number;
  currentIndex: number;
  onClick?: () => void;
}) => {
  const isCompleted = index < currentIndex;
  const isActive = index === currentIndex;

  return (
    <div className={styles["step-wrapper"]}>
      <div
        className={`${styles["step-container"]} ${onClick ? styles["clickable"] : ""}`}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      >
        {isCompleted ? (
          <div className={`${styles["step-circle"]} ${styles.completed}`}>
            <img src={checkmarkicon} alt="done" className={styles["icon"]} />
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
            className={`${styles["step-title"]} ${isActive ? styles["step-title--active"] : ""}`}
          >
            {progressbarProps.title}
          </div>
        )}
      </div>

      {!progressbarProps.isSubmission && (
        <div
          className={`${styles["step-line"]} ${isCompleted ? styles["step-line--completed"] : ""}`}
        />
      )}
    </div>
  );
};

export default WizardProgressBar;
