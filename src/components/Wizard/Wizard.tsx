import React from "react";
import { WizardProps } from "../../types/Wizardtype";
import styles from "./Wizard.module.scss";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export const Wizard = (wizardProps: WizardProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = wizardProps.steps.findIndex((step) =>
    location.pathname.endsWith("/" + step.route),
  );

  if (currentIndex === -1) {
    return (
      <Navigate
        to={wizardProps.url + wizardProps.steps[0].route}
        replace
      />
    );
  }

  const currentStep = wizardProps.steps[currentIndex];
  const CurrentComponent = currentStep.component;

  const goNext = () => {
    if (currentIndex < wizardProps.steps.length - 1) {
      navigate(wizardProps.url + wizardProps.steps[currentIndex + 1].route);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(wizardProps.url + wizardProps.steps[currentIndex - 1].route);
    }
  };

  return (
    <div className={styles["wizard-layout"]}>
      <header className={styles["wizard-header"]}>
        <div className={styles["wizard-header-title"]}>
          Guidewire PolicyCenter — New Business
        </div>
        <div className={styles["wizard-header-badges"]}>
          <span className={styles["badge"]}>Personal Auto</span>
          <span className={styles["badge"]}>Agent: J. Okafor</span>
          <span className={styles["badge"]}>Draft Saved</span>
        </div>
      </header>

      <nav className={styles["wizard-step-nav"]}>
        {wizardProps.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={[
                styles["step-item"],
                index === currentIndex ? styles["step-active"] : "",
                index < currentIndex ? styles["step-completed"] : "",
              ].join(" ")}
            >
              <div className={styles["step-number"]}>{index + 1}</div>
              <div className={styles["step-label"]}>
                {step.wizardPageConfig.title}
              </div>
            </div>
            {index < wizardProps.steps.length - 1 && (
              <div
                className={[
                  styles["step-connector"],
                  index < currentIndex ? styles["step-connector-completed"] : "",
                ].join(" ")}
              />
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className={styles["wizard-body"]}>
        <CurrentComponent
          step={currentStep}
          location={location}
          handleNext={goNext}
          handlePrevious={goBack}
        />
      </div>
    </div>
  );
};
