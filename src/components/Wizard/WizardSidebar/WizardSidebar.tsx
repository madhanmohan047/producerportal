import React from "react";
import { useFNOLContext } from "../../../pages/FNOLWizard/FNOLWizardContext";
import styles from "./WizardSidebar.module.scss";
const WizardSidebar = () => {
  const { fnolFormData } = useFNOLContext();
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        {fnolFormData?.sidebarProps?.title}
      </div>
      {fnolFormData.sidebarProps?.sidebaritems?.map((item) => (
        <div className={styles["sidebaritems"]}>
          <div className={styles["title"]}>{item.transformationKey}</div>
          <div className={styles["value"]}>{item.transformationLabel}</div>
        </div>
      ))}
    </div>
  );
};

export default WizardSidebar;
