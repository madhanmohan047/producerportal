import React from "react";
import { WizardSidebarProps } from "../../../types/Wizardtype";
import styles from "./WizardSidebar.module.scss";
const WizardSidebar = ({
  wizardSidebarprops,
}: {
  wizardSidebarprops: WizardSidebarProps;
}) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>{wizardSidebarprops.title}</div>
      {wizardSidebarprops.sidebaritems.map((item) => (
        <div className={styles["sidebaritems"]}>
          <div className={styles["title"]}>{item.transformationKey}</div>
          <div className={styles["value"]}>{item.transformationLabel}</div>
        </div>
      ))}
    </div>
  );
};

export default WizardSidebar;
