import { usePAContext } from "../../../pages/PAWizard/PAWizardContext";
import styles from "./WizardSidebar.module.scss";

const formatDisplayDate = (dateValue?: string) => {
  const date = dateValue ? new Date(`${dateValue}T00:00:00`) : new Date();

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const PAWizardSidebar = () => {
  const { paFormData } = usePAContext();

  const contact = paFormData.primaryContact;
  const customerName = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
    : "";

  const accountItems = [
    { label: "Customer", value: customerName || "-" },
    { label: "LOB", value: "Personal Auto" },
    {
      label: "Effective Date",
      value: formatDisplayDate(paFormData.effectiveDate),
    },
  ];

  const stepSection = paFormData.sidebarProps;
  const premiumEstimate = paFormData.premiumEstimate;

  return (
    <div className={styles["container"]}>
      <div className={styles["section"]}>
        <div className={styles["section-header"]}>Account</div>
        {accountItems.map((item) => (
          <div key={item.label} className={styles["sidebaritems"]}>
            <div className={styles["title"]}>{item.label}</div>
            <div className={styles["value"]}>{item.value}</div>
          </div>
        ))}
      </div>

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

      {premiumEstimate && (
        <div className={styles["premium-card"]}>
          <div className={styles["premium-label"]}>Est. Monthly Premium</div>
          <div className={styles["premium-value"]}>
            ${premiumEstimate.estimatedMonthlyPremium}
            <span>/mo</span>
          </div>
          <div className={styles["premium-caption"]}>
            ${premiumEstimate.estimatedAnnualPremium}/yr
            {premiumEstimate.discountMonthly > 0 &&
              ` - saving $${premiumEstimate.discountMonthly}/mo in discounts`}
          </div>
        </div>
      )}
    </div>
  );
};

export default PAWizardSidebar;
