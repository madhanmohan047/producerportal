import React from "react";
import { useNavigate } from "react-router-dom";
import { useIntl, MessageDescriptor } from "react-intl";
import Button from "../../components/common/Button/Button";
import { PERSONAL_AUTO_MESSAGES } from "./PersonalAutoWizard.messages";
import styles from "./PersonalAutoWizard.module.scss";

export interface WizardStep {
  path: string;
  label: MessageDescriptor;
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    path: "/personalAuto/personalInformation",
    label: PERSONAL_AUTO_MESSAGES.stepPersonalInformation,
  },
  {
    path: "/personalAuto/driverInformation",
    label: PERSONAL_AUTO_MESSAGES.stepDriverInformation,
  },
  {
    path: "/personalAuto/vehicleInformation",
    label: PERSONAL_AUTO_MESSAGES.stepVehicleInformation,
  },
];

interface Props {
  currentStep: number;
  children: React.ReactNode;
}

const PersonalAutoWizardLayout: React.FC<Props> = ({
  currentStep,
  children,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const t = (msg: MessageDescriptor) => intl.formatMessage(msg);

  const isFirst = currentStep === 0;
  const isLast = currentStep === WIZARD_STEPS.length - 1;

  const goNext = () => {
    if (!isLast) navigate(WIZARD_STEPS[currentStep + 1].path);
  };
  const goBack = () => {
    if (!isFirst) navigate(WIZARD_STEPS[currentStep - 1].path);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wizard}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>
            {t(PERSONAL_AUTO_MESSAGES.wizardTitle)}
          </h2>
          <ol className={styles.stepList}>
            {WIZARD_STEPS.map((step, i) => {
              const stateClass =
                i === currentStep
                  ? styles.active
                  : i < currentStep
                    ? styles.complete
                    : "";
              return (
                <li
                  key={step.path}
                  className={`${styles.stepItem} ${stateClass}`}
                  onClick={() => navigate(step.path)}
                >
                  <span className={styles.stepIndex}>
                    {i < currentStep ? "✓" : i + 1}
                  </span>
                  <span className={styles.stepLabel}>{t(step.label)}</span>
                </li>
              );
            })}
          </ol>
        </aside>

        <main className={styles.content}>
          <div className={styles.contentBody}>{children}</div>

          <div className={styles.footer}>
            {!isFirst && (
              <Button variant="secondary" onClick={goBack}>
                {t(PERSONAL_AUTO_MESSAGES.back)}
              </Button>
            )}
            <div className={styles.spacer} />
            {!isLast && (
              <Button variant="primary" onClick={goNext}>
                {t(PERSONAL_AUTO_MESSAGES.next)}
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalAutoWizardLayout;
