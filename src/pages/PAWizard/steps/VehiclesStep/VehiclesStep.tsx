import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import VehicleComponent from "../../../../components/Vehicle/VehicleComponent";
import { Vehicle } from "../../../../api/services/job/types/Vehicle";
import { usePAContext } from "../../PAWizardContext";
import messages from "./VehiclesStep.messages";
import styles from "./VehiclesStep.module.scss";

const VehiclesStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();
  const [showForm, setShowForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>(paFormData.vehicles);

  const handleVehicleAdded = (vehicle: Vehicle) => {
    const updated = [...vehicles, vehicle];
    setVehicles(updated);
    setShowForm(false);
  };

  useEffect(() => {
    setPAFormData((prev) => ({
      ...prev,
      vehicles,
      sidebarProps: {
        title: "Vehicles",
        sidebaritems: [
          { transformationKey: "Added", transformationLabel: `${vehicles.length} vehicle(s)` },
          ...vehicles.map((v, i) => ({
            transformationKey: `Vehicle ${i + 1}`,
            transformationLabel: `${v.year} ${v.make} ${v.model}`.trim(),
          })),
        ],
      },
    }));
  }, [vehicles]);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["vehicles-container"]}>
        {vehicles.length === 0 && !showForm && (
          <p className={styles["empty-state"]}>
            {intl.formatMessage(messages.noVehicles)}
          </p>
        )}

        {vehicles.map((v, i) => (
          <div key={i} className={styles["vehicle-card"]}>
            <span className={styles["vehicle-label"]}>
              {`${v.year} ${v.make} ${v.model}`.trim() || `Vehicle ${i + 1}`}
            </span>
            <span className={styles["vehicle-vin"]}>
              {intl.formatMessage(messages.vin)}: {v.vin || "—"}
            </span>
          </div>
        ))}

        {showForm && (
          <div className={styles["add-form"]}>
            <VehicleComponent onVehicleAdded={handleVehicleAdded} />
            <button className={styles["cancel-btn"]} onClick={() => setShowForm(false)}>
              {intl.formatMessage(messages.cancel)}
            </button>
          </div>
        )}

        {!showForm && (
          <button className={styles["add-vehicle-btn"]} onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faPlus} />
            {vehicles.length === 0
              ? intl.formatMessage(messages.addVehicle)
              : intl.formatMessage(messages.addAnotherVehicle)}
          </button>
        )}
      </div>
    </WizardPage>
  );
};

export default VehiclesStep;
