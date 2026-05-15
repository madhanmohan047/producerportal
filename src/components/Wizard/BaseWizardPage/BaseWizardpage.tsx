import React from "react";
import { WizardPageProps } from "../../../types/Wizardtype";
import styles from "./BaseWizardpage.module.scss";
import Button from "../../common/Button/Button";
import { IconDeviceFloppy, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const WizardPage = (wizardPageProps: WizardPageProps) => {
  const { step, handlePrevious, handleNext } = wizardPageProps;
  const { buttonProps } = step.wizardPageConfig;
  const showSave = buttonProps.save?.show !== false;
  const saveLabel = buttonProps.save?.label ?? "Save";

  return (
    <div className={styles["wizard-page"]}>
      {wizardPageProps.sidebarContent && (
        <aside className={styles["wizard-page-sidebar"]}>
          {wizardPageProps.sidebarContent}
        </aside>
      )}

      <div className={styles["wizard-page-main"]}>
        <div className={styles["wizard-page-content"]}>
          {wizardPageProps.children}
        </div>

        <div className={styles["wizard-page-actions"]}>
          <span className={styles["draft-saved"]}>Draft auto-saved</span>

          <div className={styles["wizard-actions-right"]}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              size="small"
              className={!handlePrevious ? styles["wizard-button--hidden"] : ""}
            >
              <IconArrowLeft size={10} stroke={1.75} /> Back
            </Button>

            {showSave && (
              <Button variant="secondary" size="small" type="button">
                <IconDeviceFloppy size={15} stroke={1.75} />
                {saveLabel}
              </Button>
            )}

            <Button variant="primary" onClick={handleNext} size="small">
              {buttonProps.next.label} <IconArrowRight size={10} stroke={1.75} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardPage;
