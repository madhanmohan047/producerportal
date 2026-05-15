import { useLocation } from "react-router-dom";
import { usePAWizard } from "../../context/PAWizardContext";
import { STEP_ORDER } from "../../constants";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  const location = useLocation();
  const {
    selectedAccount,
    accountHolderName,
    lob,
    effectiveDate,
    totalPremium,
    driverCount,
    vehicleCount,
  } = usePAWizard();

  const currentRoute =
    location.pathname.split("/").filter(Boolean).pop() ?? "";
  const stepIndex = STEP_ORDER.indexOf(currentRoute);

  const showPolicySummary = stepIndex >= STEP_ORDER.indexOf("drivers");
  const showBillingSummary = stepIndex >= STEP_ORDER.indexOf("quote");

  const accountNumber = selectedAccount?.accountNumber ?? null;

  return (
    <div className={styles.sidebar}>
      <section className={styles.section}>
        <h3 className={styles.title}>Account</h3>

        <div className={styles.field}>
          <span className={styles.label}>Customer</span>
          {accountHolderName ? (
            <span className={styles.value}>{accountHolderName}</span>
          ) : (
            <span className={styles.valuePlaceholder}>—</span>
          )}
        </div>

        {accountNumber && (
          <div className={styles.field}>
            <span className={styles.label}>Account Number</span>
            <span className={styles.value}>{accountNumber}</span>
          </div>
        )}

        {lob && (
          <div className={styles.field}>
            <span className={styles.label}>LOB</span>
            <span className={styles.value}>{lob}</span>
          </div>
        )}

        {effectiveDate && (
          <div className={styles.field}>
            <span className={styles.label}>Effective Date</span>
            <span className={styles.value}>{effectiveDate}</span>
          </div>
        )}
      </section>

      {showPolicySummary && (
        <section className={styles.section}>
          <h3 className={styles.title}>Policy Summary</h3>

          <div className={styles.field}>
            <span className={styles.label}>Drivers</span>
            <span className={styles.value}>
              {driverCount > 0 ? `${driverCount} listed` : "None"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Vehicles</span>
            <span className={styles.value}>
              {vehicleCount > 0 ? `${vehicleCount} listed` : "None"}
            </span>
          </div>
        </section>
      )}

      {showBillingSummary && (
        <section className={styles.section}>
          <h3 className={styles.title}>Billing Summary</h3>

          <div className={styles.field}>
            <span className={styles.label}>Total Premium</span>
            {totalPremium !== null ? (
              <span className={styles.value}>
                ${totalPremium.toLocaleString()}
              </span>
            ) : (
              <span className={styles.valuePlaceholder}>—</span>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SideBar;
