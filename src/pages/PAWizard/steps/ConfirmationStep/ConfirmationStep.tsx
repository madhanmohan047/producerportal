import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEnvelope,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import { initialPAFormData } from "../../PAWizardContext";
import messages from "./ConfirmationStep.messages";
import styles from "./ConfirmationStep.module.scss";

const ConfirmationStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { paFormData, setPAFormData } = usePAContext();

  const contact = paFormData.primaryContact;
  const insuredName = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
    : intl.formatMessage(messages.notSet);

  const email = contact?.emailAddress ?? intl.formatMessage(messages.notSet);

  const vehicle = paFormData.vehicles?.[0];
  const vehicleDesc = vehicle
    ? [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ")
    : intl.formatMessage(messages.notSet);

  const annualPrem = paFormData.annualPremium
    ? `$${Math.round(paFormData.annualPremium)}`
    : intl.formatMessage(messages.notSet);

  const policyNumber =
    paFormData.policyNumber ?? intl.formatMessage(messages.notSet);
  const effectiveDate =
    paFormData.effectiveDate ?? intl.formatMessage(messages.notSet);
  const bindDate = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const handleNewSubmission = () => {
    setPAFormData(initialPAFormData);
    navigate("/pawizard/account");
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["confirmation-container"]}>
        <div className={styles["success-icon-wrap"]}>
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={styles["success-icon"]}
          />
        </div>

        <div className={styles["policy-block"]}>
          <p className={styles["success-label"]}>
            {intl.formatMessage(messages.successLabel)}
          </p>
          <p className={styles["policy-number"]}>{policyNumber}</p>
          <p className={styles["policy-dates"]}>
            {intl.formatMessage(messages.effectiveLine, {
              effectiveDate,
            })}
            {" · "}
            {"Bound "}
            {bindDate}
          </p>
        </div>

        <div className={styles["email-banner"]}>
          <FontAwesomeIcon icon={faEnvelope} className={styles["email-icon"]} />
          <span>
            {intl.formatMessage(messages.emailBanner, {
              email: (
                <span key="email" className={styles["email-address"]}>
                  {email}
                </span>
              ),
            })}
          </span>
        </div>

        <div className={styles["summary-cards"]}>
          <div className={styles["summary-card"]}>
            <span className={styles["card-label"]}>
              {intl.formatMessage(messages.cardInsured)}
            </span>
            <span className={styles["card-value"]}>{insuredName}</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["card-label"]}>
              {intl.formatMessage(messages.cardAnnualPrem)}
            </span>
            <span className={styles["card-value"]}>{annualPrem}</span>
          </div>
          <div className={styles["summary-card"]}>
            <span className={styles["card-label"]}>
              {intl.formatMessage(messages.cardVehicle)}
            </span>
            <span className={styles["card-value"]}>{vehicleDesc}</span>
          </div>
        </div>

        <div className={styles["checklist-section"]}>
          <div className={styles["checklist-title"]}>
            {intl.formatMessage(messages.postBindTitle)}
          </div>
          <div className={styles["checklist-items"]}>
            <div className={styles["checklist-item"]}>
              <span className={styles["checklist-num"]}>1</span>
              <span className={styles["checklist-text"]}>
                <span className={styles["checklist-bold"]}>
                  {intl.formatMessage(messages.checklistMvr)}
                </span>{" "}
                {intl.formatMessage(messages.checklistMvrDetail)}
              </span>
            </div>
            <div className={styles["checklist-item"]}>
              <span className={styles["checklist-num"]}>2</span>
              <span className={styles["checklist-text"]}>
                <span className={styles["checklist-bold"]}>
                  {intl.formatMessage(messages.checklistIdCards)}
                </span>{" "}
                {intl.formatMessage(messages.checklistIdCardsDetail)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles["cta-row"]}>
          <button
            className={styles["btn-primary"]}
            onClick={() => window.open("/post-bind-checklist", "_blank")}
          >
            {intl.formatMessage(messages.ctaPostBind)}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
          <button
            className={styles["btn-secondary"]}
            onClick={handleNewSubmission}
          >
            {intl.formatMessage(messages.ctaNewSubmission)}
          </button>
        </div>
      </div>
    </WizardPage>
  );
};

export default ConfirmationStep;
