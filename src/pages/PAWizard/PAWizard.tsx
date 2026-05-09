import React from "react";
import { Wizard } from "../../components/Wizard/Wizard";
import { PASteps } from "./PASteps";
import { WizardProps } from "../../components/Wizard/Wizard";
import { useLocation } from "react-router-dom";
import styles from "./PAWizard.module.scss";

export const PAWizard = () => {
  const location = useLocation();

  const wizardProps: WizardProps = {
    steps: PASteps,
    location: location,
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Wizard wizardProps={wizardProps} />
      </div>
    </div>
  );
};
