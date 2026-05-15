import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { DriverComponent } from "../../../../components/DriverComponent/DriverComponent";
import { Driver } from "../../../../api/services/job/types/Driver";
import { usePAContext } from "../../PAWizardContext";
import messages from "./DriversStep.messages";
import styles from "./DriversStep.module.scss";

const DriversStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();
  const [showForm, setShowForm] = useState(false);
  const [additionalDrivers, setAdditionalDrivers] = useState<Partial<Driver>[]>(
    paFormData.drivers
  );

  const contact = paFormData.primaryContact;
  const namedInsuredName = contact
    ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
    : "";

  const handleDriverAdded = (driver: Driver) => {
    setAdditionalDrivers((prev) => [...prev, driver]);
    setShowForm(false);
  };

  useEffect(() => {
    setPAFormData((prev) => ({
      ...prev,
      drivers: additionalDrivers as Driver[],
      sidebarProps: {
        title: "Policy Summary",
        sidebaritems: [
          {
            transformationKey: "Drivers",
            transformationLabel: `${additionalDrivers.length + 1} listed`,
          },
          {
            transformationKey: "Vehicles",
            transformationLabel: `${prev.vehicles?.length ?? 0} listed`,
          },
        ],
      },
    }));
  }, [additionalDrivers]);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["drivers-container"]}>
        {namedInsuredName && (
          <div className={styles["driver-card"]}>
            <div className={styles["driver-card-header"]}>
              <div className={styles["driver-name-row"]}>
                <span className={styles["driver-name"]}>{namedInsuredName}</span>
                <span className={styles["insured-badge"]}>
                  {intl.formatMessage(messages.namedInsured)}
                </span>
              </div>
              <button className={styles["edit-btn"]}>
                <FontAwesomeIcon icon={faPen} />
                {intl.formatMessage(messages.edit)}
              </button>
            </div>
            <div className={styles["driver-fields"]}>
              <div className={styles["driver-field"]}>
                <label>{intl.formatMessage(messages.dob)}</label>
                <input
                  readOnly
                  value={contact?.dateOfBirth?.toString() ?? ""}
                  placeholder="—"
                />
              </div>
              <div className={styles["driver-field"]}>
                <label>{intl.formatMessage(messages.licenseNumber)}</label>
                <input readOnly value="" placeholder="—" />
              </div>
              <div className={styles["driver-field"]}>
                <label>{intl.formatMessage(messages.violations)}</label>
                <input readOnly value={intl.formatMessage(messages.none)} />
              </div>
            </div>
          </div>
        )}

        {additionalDrivers.map((d, i) => {
          const person = d.person as any;
          const name = person
            ? `${person.firstName ?? ""} ${person.lastName ?? ""}`.trim()
            : `Driver ${i + 2}`;
          return (
            <div key={i} className={styles["driver-card"]}>
              <div className={styles["driver-card-header"]}>
                <span className={styles["driver-name"]}>{name || `Driver ${i + 2}`}</span>
                <button className={styles["edit-btn"]}>
                  <FontAwesomeIcon icon={faPen} />
                  {intl.formatMessage(messages.edit)}
                </button>
              </div>
              <div className={styles["driver-fields"]}>
                <div className={styles["driver-field"]}>
                  <label>{intl.formatMessage(messages.licenseNumber)}</label>
                  <input readOnly value={d.licenseNumber ?? "—"} placeholder="—" />
                </div>
                <div className={styles["driver-field"]}>
                  <label>{intl.formatMessage(messages.violations)}</label>
                  <input readOnly value={d.numViolations?.toString() ?? intl.formatMessage(messages.none)} />
                </div>
              </div>
            </div>
          );
        })}

        {showForm && (
          <div className={styles["add-form"]}>
            <DriverComponent jobId={paFormData.jobId ?? ""} onDriverAdded={handleDriverAdded} />
            <button className={styles["cancel-btn"]} onClick={() => setShowForm(false)}>
              {intl.formatMessage(messages.cancel)}
            </button>
          </div>
        )}

        {!showForm && (
          <button className={styles["add-driver-btn"]} onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage(messages.addAnotherDriver)}
          </button>
        )}

        <div className={styles["info-banner"]}>
          <FontAwesomeIcon icon={faCircleInfo} className={styles["info-icon"]} />
          {intl.formatMessage(messages.mvrNote)}
        </div>
      </div>
    </WizardPage>
  );
};

export default DriversStep;
