import { useNavigate } from "react-router-dom";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { createInitialPAFormData, usePAContext } from "../../PAWizardContext";
import styles from "./ConfirmationStep.module.scss";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

const formatDate = (dateValue?: string) => {
  if (!dateValue) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
};

const ConfirmationStep = (wizardPageProps: WizardPageProps) => {
  const navigate = useNavigate();
  const { paFormData, setPAFormData } = usePAContext();
  const contact = paFormData.primaryContact;
  const customerName =
    [contact?.firstName, contact?.lastName].filter(Boolean).join(" ") || "-";
  const customerEmail = contact?.emailAddress || "the customer";
  const policyNumber = paFormData.policyNumber ?? "Pending";
  const premiumEstimate = paFormData.premiumEstimate;
  const primaryVehicle = paFormData.vehicles?.[0];
  const vehicleLabel = primaryVehicle
    ? `${primaryVehicle.year} ${primaryVehicle.make} ${primaryVehicle.model}`.trim()
    : "-";

  const startNewSubmission = () => {
    sessionStorage.removeItem("selectedAccount");
    setPAFormData(createInitialPAFormData());
    navigate("/pawizard/account");
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.statusIcon}>
            <i className="fa-solid fa-check" />
          </div>
          <p className={styles.boundText}>Policy successfully bound</p>
          <h2>{policyNumber}</h2>
          <p className={styles.meta}>
            Effective {formatDate(paFormData.effectiveDate)} · Bound Today
          </p>
        </section>

        <section className={styles.notice}>
          <i className="fa-regular fa-envelope" />
          <span>
            Policy documents and ID cards sent to{" "}
            <strong>{customerEmail}</strong>.
          </span>
        </section>

        <section className={styles.tiles}>
          <div>
            <span>Insured</span>
            <strong>{customerName}</strong>
          </div>
          <div>
            <span>Annual Prem</span>
            <strong>
              {formatCurrency(premiumEstimate?.estimatedAnnualPremium)}
            </strong>
          </div>
          <div>
            <span>Vehicle</span>
            <strong>{vehicleLabel}</strong>
          </div>
        </section>

        <section className={styles.checklist}>
          <h3>Post-Bind Checklist</h3>
          <div className={styles.checklistItem}>
            <span>1</span>
            <p>
              <strong>MVR &amp; CLUE ordered:</strong> Results will arrive in 1-2
              business days.
            </p>
          </div>
          <div className={styles.checklistItem}>
            <span>2</span>
            <p>
              <strong>ID Cards issued:</strong> Digital cards are available
              immediately.
            </p>
          </div>
        </section>

        <section className={styles.actions}>
          <button type="button" className={styles.primaryAction}>
            Post-bind Checklist
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </button>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={startNewSubmission}
          >
            New Submission
          </button>
        </section>
      </div>
    </WizardPage>
  );
};

export default ConfirmationStep;
