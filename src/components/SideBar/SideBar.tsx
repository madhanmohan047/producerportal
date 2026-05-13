import { useLocation } from "react-router-dom";
import styles from "./SideBar.module.scss";
import { STEP_ORDER } from "../../constants";

const SideBar = () => {
  const location = useLocation();
  const currentRoute = location.pathname.split("/").filter(Boolean).pop() ?? "";
  const stepIndex = STEP_ORDER.indexOf(currentRoute);

  const showPolicyDetails = stepIndex >= STEP_ORDER.indexOf("policyLob");
  const showBillingSummary = stepIndex >= STEP_ORDER.indexOf("quote");

  return (
    <div className={styles.sidebar}>
      <section className={styles.section}>
        <h3 className={styles.title}>Account</h3>
        <div className={styles.field}>
          <span className={styles.label}>Account Holder</span>
          <span className={styles.valuePlaceholder}>—</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Account Number</span>
          <span className={styles.valuePlaceholder}>—</span>
        </div>
      </section>

      {showPolicyDetails && (
        <section className={styles.section}>
          <h3 className={styles.title}>Policy Details</h3>
          <div className={styles.field}>
            <span className={styles.label}>Line of Business</span>
            <span className={styles.valuePlaceholder}>—</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Effective Date</span>
            <span className={styles.valuePlaceholder}>—</span>
          </div>
        </section>
      )}

      {showBillingSummary && (
        <section className={styles.section}>
          <h3 className={styles.title}>Billing Summary</h3>
          <div className={styles.field}>
            <span className={styles.label}>Total Premium</span>
            <span className={styles.valuePlaceholder}>—</span>
          </div>
        </section>
      )}
    </div>
  );
};

export default SideBar;
