import { usePAContext } from "../../../pages/PAWizard/PAWizardContext";
import styles from "./WizardSidebar.module.scss";

const PAWizardSidebar = () => {
  const { paFormData } = usePAContext();

  const contact = paFormData.primaryContact;
  const customerName = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
    : "";

  const accountItems = [
    { label: "Customer", value: customerName || "—" },
    { label: "LOB", value: "Personal Auto" },
    { label: "Effective Date", value: paFormData.effectiveDate || "—" },
  ];

  const stepSection = paFormData.sidebarProps;

  return (
    <div className={styles["container"]}>
      {/* ACCOUNT section — always visible */}
      <div className={styles["section"]}>
        <div className={styles["section-header"]}>Account</div>
        {accountItems.map((item) => (
          <div key={item.label} className={styles["sidebaritems"]}>
            <div className={styles["title"]}>{item.label}</div>
            <div className={styles["value"]}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Step-specific section */}
      {stepSection && (stepSection.sidebaritems?.length ?? 0) > 0 && (
        <div className={styles["section"]}>
          <div className={styles["section-header"]}>{stepSection.title}</div>
          {stepSection.sidebaritems?.map((item, i) => (
            <div key={i} className={styles["sidebaritems"]}>
              <div className={styles["title"]}>{item.transformationKey}</div>
              <div className={styles["value"]}>{item.transformationLabel}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PAWizardSidebar;
