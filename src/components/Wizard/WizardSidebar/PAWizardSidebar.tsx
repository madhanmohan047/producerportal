import { usePAContext } from "../../../pages/PAWizard/PAWizardContext";
import styles from "./WizardSidebar.module.scss";

const PAWizardSidebar = () => {
  const { paFormData } = usePAContext();

  const contact = paFormData.primaryContact;
  const accountHolder = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
    : "—";
  const accountNumber = paFormData.accountNumber ?? "—";

  const effectiveDate = paFormData.effectiveDate;
  const hasPolicy = !!effectiveDate;

  const hasAccount = !!paFormData.accountId;

  // Named Insured always counts as 1 driver once account is selected
  const apiDriverCount = paFormData.drivers?.length ?? 0;
  const driverCount = hasAccount ? apiDriverCount + 1 : 0;

  const vehicleCount = paFormData.vehicles?.length ?? 0;

  return (
    <div className={styles["container"]}>

      {/* ACCOUNT — always visible */}
      <div className={styles["section"]}>
        <div className={styles["section-header"]}>Account</div>
        <div className={styles["sidebaritems"]}>
          <div className={styles["title"]}>Account Holder</div>
          <div className={styles["value"]}>{accountHolder}</div>
        </div>
        <div className={styles["sidebaritems"]}>
          <div className={styles["title"]}>Account #</div>
          <div className={styles["value"]}>{accountNumber}</div>
        </div>
      </div>

      {/* POLICY DETAILS — after step 2 saves effective date */}
      {hasPolicy && (
        <div className={styles["section"]}>
          <div className={styles["section-header"]}>Policy Details</div>
          <div className={styles["sidebaritems"]}>
            <div className={styles["title"]}>Line of Business</div>
            <div className={styles["value"]}>Personal Auto</div>
          </div>
          <div className={styles["sidebaritems"]}>
            <div className={styles["title"]}>Effective Date</div>
            <div className={styles["value"]}>{effectiveDate}</div>
          </div>
        </div>
      )}

      {/* DRIVERS — visible once account is selected (Named Insured pre-populated) */}
      {hasAccount && (
        <div className={styles["section"]}>
          <div className={styles["section-header"]}>Drivers</div>
          <div className={styles["sidebaritems"]}>
            <div className={styles["title"]}>Listed</div>
            <div className={styles["value"]}>
              {driverCount} {driverCount === 1 ? "driver" : "drivers"}
            </div>
          </div>
        </div>
      )}

      {/* VEHICLES — visible once at least one vehicle is added */}
      {vehicleCount > 0 && (
        <div className={styles["section"]}>
          <div className={styles["section-header"]}>Vehicles</div>
          <div className={styles["sidebaritems"]}>
            <div className={styles["title"]}>Listed</div>
            <div className={styles["value"]}>
              {vehicleCount} {vehicleCount === 1 ? "vehicle" : "vehicles"}
            </div>
          </div>
        </div>
      )}

      {paFormData.monthlyPremium != null && (
        <div className={styles["premium-box"]}>
          <div className={styles["premium-label"]}>Est. Monthly Premium</div>
          <div className={styles["premium-amount"]}>
            ${Math.round(paFormData.monthlyPremium)}
            <span className={styles["premium-unit"]}>/mo</span>
          </div>
          {paFormData.annualPremium != null && (
            <div className={styles["premium-annual"]}>
              ${Math.round(paFormData.annualPremium)}/yr
              {paFormData.annualDiscount != null && paFormData.annualDiscount > 0 && (
                <> &middot; saving ${paFormData.annualDiscount}/yr in discounts</>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default PAWizardSidebar;
