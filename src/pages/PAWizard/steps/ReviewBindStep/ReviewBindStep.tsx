import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import styles from "./ReviewBindStep.module.scss";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

const formatDate = (dateValue?: string) => {
  if (!dateValue) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
};

const createPolicyNumber = () =>
  `PA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

const ReviewBindStep = (wizardPageProps: WizardPageProps) => {
  const { paFormData, setPAFormData } = usePAContext();
  const contact = paFormData.primaryContact;
  const customerName =
    [contact?.firstName, contact?.lastName].filter(Boolean).join(" ") || "-";
  const premiumEstimate = paFormData.premiumEstimate;

  const handleBindPolicy = () => {
    setPAFormData((prev) => ({
      ...prev,
      policyNumber: prev.policyNumber ?? createPolicyNumber(),
      sidebarProps: {
        title: "Policy Status",
        sidebaritems: [
          {
            transformationKey: "Status",
            transformationLabel: "Ready to issue",
          },
          {
            transformationKey: "Premium",
            transformationLabel: `${formatCurrency(
              prev.premiumEstimate?.estimatedMonthlyPremium,
            )}/mo`,
          },
        ],
      },
    }));

    wizardPageProps.handleNext?.();
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleBindPolicy}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.page}>
        <p className={styles.subtitle}>
          Confirm the applicant, coverage, premium, and documents before
          binding.
        </p>

        <section className={styles.summaryBand}>
          <div>
            <span>Applicant</span>
            <strong>{customerName}</strong>
          </div>
          <div>
            <span>Effective Date</span>
            <strong>{formatDate(paFormData.effectiveDate)}</strong>
          </div>
          <div>
            <span>Estimated Premium</span>
            <strong>
              {formatCurrency(premiumEstimate?.estimatedMonthlyPremium)} /mo
            </strong>
          </div>
        </section>

        <div className={styles.grid}>
          <section className={styles.panel}>
            <h3>Account</h3>
            <dl>
              <div>
                <dt>Customer</dt>
                <dd>{customerName}</dd>
              </div>
              <div>
                <dt>Account Number</dt>
                <dd>{paFormData.accountNumber || "-"}</dd>
              </div>
              <div>
                <dt>Policy Term</dt>
                <dd>
                  {formatDate(paFormData.effectiveDate)} -{" "}
                  {formatDate(paFormData.expirationDate)}
                </dd>
              </div>
            </dl>
          </section>

          <section className={styles.panel}>
            <h3>Risk Summary</h3>
            <dl>
              <div>
                <dt>Drivers</dt>
                <dd>{(paFormData.drivers?.length ?? 0) + 1} listed</dd>
              </div>
              <div>
                <dt>Vehicles</dt>
                <dd>{paFormData.vehicles?.length ?? 0} listed</dd>
              </div>
              <div>
                <dt>Documents</dt>
                <dd>{paFormData.documents?.length ?? 0} uploaded</dd>
              </div>
            </dl>
          </section>

          <section className={styles.panel}>
            <h3>Coverages</h3>
            <div className={styles.coverageList}>
              {(premiumEstimate?.selectedCoverages ?? []).map((coverage) => (
                <div key={coverage.id} className={styles.coverageRow}>
                  <span>
                    <strong>{coverage.name}</strong>
                    <small>{coverage.description}</small>
                  </span>
                  <strong>{formatCurrency(coverage.monthlyPremium)} /mo</strong>
                </div>
              ))}
              {!premiumEstimate?.selectedCoverages?.length && (
                <p className={styles.empty}>No coverages selected.</p>
              )}
            </div>
          </section>

          <section className={styles.panel}>
            <h3>Payment</h3>
            <dl>
              <div>
                <dt>Base Premium</dt>
                <dd>{formatCurrency(premiumEstimate?.baseMonthlyPremium)}</dd>
              </div>
              <div>
                <dt>Discounts</dt>
                <dd>- {formatCurrency(premiumEstimate?.discountMonthly)}</dd>
              </div>
              <div>
                <dt>Annual Premium</dt>
                <dd>
                  {formatCurrency(premiumEstimate?.estimatedAnnualPremium)}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        <section className={styles.attestation}>
          <label>
            <input type="checkbox" defaultChecked />I confirm the information is
            complete and the applicant has authorized binding this policy.
          </label>
        </section>
      </div>
    </WizardPage>
  );
};

export default ReviewBindStep;
