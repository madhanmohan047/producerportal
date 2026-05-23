import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { PAPremiumEstimate, usePAContext } from "../../PAWizardContext";
import styles from "./Premium.module.scss";

const fallbackPremiumEstimate: PAPremiumEstimate = {
  baseMonthlyPremium: 0,
  discountMonthly: 0,
  estimatedMonthlyPremium: 0,
  estimatedAnnualPremium: 0,
  selectedCoverages: [],
  liabilityLimits: "100/300/100",
  comprehensiveDeductible: "$500",
  collisionDeductible: "$500",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

const Premium = (wizardPageProps: WizardPageProps) => {
  const { paFormData } = usePAContext();
  const premiumEstimate =
    paFormData.premiumEstimate ?? fallbackPremiumEstimate;
  const effectiveDate = paFormData.effectiveDate ?? "2026-01-15";

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.container}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>Premium Summary</div>

          <div className={styles.summaryBody}>
            <div className={styles.premiumDetails}>
              <div className={styles.row}>
                <span>Base Premium</span>
                <strong>
                  {formatCurrency(premiumEstimate.baseMonthlyPremium)}
                </strong>
              </div>

              <div className={`${styles.row} ${styles.discount}`}>
                <span>Total Discounts</span>
                <strong>
                  - {formatCurrency(premiumEstimate.discountMonthly)}
                </strong>
              </div>

              <div className={styles.divider} />

              <div className={styles.estimatedRow}>
                <span>Estimated Premium</span>
                <div>
                  <strong>
                    {formatCurrency(premiumEstimate.estimatedMonthlyPremium)}
                  </strong>
                  <span>/mo</span>
                  <p>
                    {formatCurrency(premiumEstimate.estimatedAnnualPremium)} /yr
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.savingBox}>
              <h4>You're saving!</h4>

              <div className={styles.savingRow}>
                <span>Total discount</span>
                <strong>
                  {formatCurrency(premiumEstimate.discountMonthly)} /mo
                </strong>
              </div>

              <div className={styles.savingRow}>
                <span>Discounts applied</span>
                <button type="button">View details</button>
              </div>
            </div>
          </div>
        </section>

        {premiumEstimate.selectedCoverages.length > 0 && (
          <section className={styles.card}>
            <div className={styles.cardHeader}>Selected Coverages</div>
            <div className={styles.coverageList}>
              {premiumEstimate.selectedCoverages.map((coverage) => (
                <div key={coverage.id} className={styles.coverageRow}>
                  <span>
                    <strong>{coverage.name}</strong>
                    <small>{coverage.description}</small>
                  </span>
                  <strong>{formatCurrency(coverage.monthlyPremium)} /mo</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.card}>
          <div className={styles.cardHeader}>Payment &amp; Billing</div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Payment Plan</label>
              <select defaultValue="monthly">
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Start Date</label>
              <input type="date" value={effectiveDate} readOnly />
            </div>

            <div className={styles.formGroup}>
              <label>Billing Method</label>
              <select defaultValue="eft">
                <option value="eft">Electronic Funds Transfer (EFT)</option>
                <option value="creditCard">Credit Card</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Bank Account</label>
              <select defaultValue="checking">
                <option value="checking">**** 1234 (Checking)</option>
              </select>
            </div>
          </div>

          <div className={styles.infoBox}>
            Your first payment of{" "}
            {formatCurrency(premiumEstimate.estimatedMonthlyPremium)} will be
            drafted on {effectiveDate}.
          </div>

          <div className={styles.notesGroup}>
            <label>Notes (Optional)</label>
            <textarea
              maxLength={500}
              placeholder="Add any notes about the premium or payment"
            />
            <span>0 / 500</span>
          </div>
        </section>
      </div>
    </WizardPage>
  );
};

export default Premium;
