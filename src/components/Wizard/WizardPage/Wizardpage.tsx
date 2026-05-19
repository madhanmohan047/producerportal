import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { WizardPageProps } from "../../../types/Wizardtype";
import WizardSidebar from "../WizardSidebar/WizardSidebar";
import styles from "./Wizardpage.module.scss";
import wizardMessages from "../Wizard.messages";

const WizardPage = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const showPageheader = wizardPageProps.showPageheader ?? true;
  const Sidebar = wizardPageProps.SidebarComponent ?? WizardSidebar;
  const { step, handleNext, handlePrevious, handleSaveDraft } = wizardPageProps;
  const { description, title, buttonProps, isSubmission } =
    step.wizardPageConfig;

  const hasPrev = (buttonProps.previous?.label?.length ?? 0) > 0;
  const hasSave = (buttonProps.saveDraft?.label?.length ?? 0) > 0;
  const isFirstStep = !hasPrev;

  return (
    <div className={styles["wizard-page"]}>
      <div className={styles["wizard-page-container"]}>
        <div className={styles["wizard-page-sidebar"]}>
          <Sidebar />
        </div>

        <div className={styles["wizard-page-content"]}>
          {showPageheader && (
            <div className={styles["step-header"]}>
              <h2>{description}</h2>
              <p>{title}</p>
            </div>
          )}
          <div className={styles["step-body"]}>{wizardPageProps.children}</div>
        </div>
      </div>

      {!isSubmission && (
        <div className={styles["wizard-page-actions"]}>
          <span className={styles["draft-status"]}>
            {isFirstStep
              ? intl.formatMessage(wizardMessages.startNewSubmission)
              : intl.formatMessage(wizardMessages.draftAutoSaved)}
          </span>

          <div className={styles["action-buttons"]}>
            {hasPrev && (
              <button className={styles["btn-back"]} onClick={handlePrevious}>
                <FontAwesomeIcon icon={faArrowLeft} />
                {buttonProps.previous.label}
              </button>
            )}

            {hasSave && (
              <button className={styles["btn-save"]} onClick={handleSaveDraft}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                {buttonProps.saveDraft!.label}
              </button>
            )}

            <button
              className={styles["btn-continue"]}
              onClick={handleNext}
              disabled={!handleNext}
            >
              {buttonProps.next.label}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardPage;
