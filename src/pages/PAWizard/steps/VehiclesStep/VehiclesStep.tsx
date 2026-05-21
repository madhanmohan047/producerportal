import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import VehicleComponent from "../../../../components/Vehicle/VehicleComponent";
import { Vehicle } from "../../../../api/services/job/types/Vehicle";
import { usePAContext } from "../../PAWizardContext";
import { getJobVehicles } from "../../../../api/services/job/jobApi";
import messages from "./VehiclesStep.messages";
import styles from "./VehiclesStep.module.scss";

const vehicleLabel = (v: Vehicle, idx: number) =>
  `${v.year || ""} ${v.make || ""} ${v.model || ""}`.trim() || `Vehicle ${idx + 1}`;

const toFormValues = (v: Vehicle) => ({
  _id: v._id,
  make: v.make ?? "",
  model: v.model ?? "",
  year: v.year ? String(v.year) : "",
  vin: v.vin ?? "",
  color: v.color ?? "",
  licensePlate: v.licensePlate ?? "",
  annualMileage: v.annualMileage ? String(v.annualMileage) : "",
  costNew: v.costNew ? String(v.costNew) : "",
  bodyType: v.bodyType?.code ? v.bodyType : undefined,
  licenseState: v.licenseState?.code ? v.licenseState : undefined,
  garageLocation: v.garageLocation,
});

const VehiclesStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();

  const [vehicles, setVehicles] = useState<Vehicle[]>(paFormData.vehicles ?? []);
  const [activeTab, setActiveTab] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [primaryIdx, setPrimaryIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPAFormData((prev) => ({ ...prev, vehicles }));
  }, [vehicles]);

  useEffect(() => {
    if (!paFormData.jobId) return;
    getJobVehicles(paFormData.jobId).then((res) => {
      const raw = res.data as any;
      const fetched: Vehicle[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
      if (fetched.length > 0) setVehicles(fetched);
    });
  }, [paFormData.jobId]);

  const switchToTab = (idx: number) => {
    setActiveTab(idx);
    setShowAddForm(false);
    setEditingIdx(null);
  };

  const handleVehicleAdded = (saved: Vehicle) => {
    setVehicles((prev) => {
      const next = [...prev, saved];
      setActiveTab(next.length - 1);
      return next;
    });
    setShowAddForm(false);
    setError(null);
  };

  const handleEditSaved = (idx: number, saved: Vehicle) => {
    setVehicles((prev) => prev.map((v, i) => (i === idx ? saved : v)));
    setEditingIdx(null);
  };

  const removeVehicle = (idx: number) => {
    setVehicles((prev) => prev.filter((_, i) => i !== idx));
    if (primaryIdx === idx) setPrimaryIdx(0);
    else if (primaryIdx > idx) setPrimaryIdx((p) => p - 1);
    if (editingIdx === idx) setEditingIdx(null);
    setActiveTab((prev) => (prev >= idx ? Math.max(0, prev - 1) : prev));
  };

  const handleNext = () => {
    if (vehicles.length === 0) {
      setError(intl.formatMessage(messages.atLeastOneRequired));
      return;
    }
    setError(null);
    wizardPageProps.handleNext?.();
  };

  const vehicle = vehicles[activeTab];
  const isEditing = editingIdx === activeTab;
  const isPrimary = activeTab === primaryIdx;
  const showPrimaryToggle = vehicles.length > 1 && !isPrimary;

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["vehicles-container"]}>

        {!paFormData.jobId && (
          <div className={styles["no-job-banner"]}>
            ⚠ No submission linked yet. Go back to Step 2 (Policy Info) and click Continue to create a submission before adding vehicles.
          </div>
        )}

        {/* ── Tab bar ── */}
        <div className={styles.tabs}>
          {vehicles.map((v, idx) => (
            <button
              key={idx}
              className={`${styles.tab} ${!showAddForm && activeTab === idx ? styles["tab-active"] : ""}`}
              onClick={() => switchToTab(idx)}
            >
              {vehicleLabel(v, idx)}
              {idx === primaryIdx && " ★"}
            </button>
          ))}
        </div>

        {/* ── Add-vehicle form panel ── */}
        {showAddForm && (
          <div className={styles["vehicle-panel"]}>
            <div className={styles["vehicle-card-header"]}>
              <div className={styles["vehicle-name-row"]}>
                <span className={styles["vehicle-name"]}>
                  {intl.formatMessage(messages.newVehicle)}
                </span>
              </div>
            </div>
            <VehicleComponent
              jobId={paFormData.jobId ?? ""}
              mode="add"
              onSaved={handleVehicleAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}
        
        {!showAddForm && vehicle && (
          <div className={styles["vehicle-panel"]}>
            <div className={styles["vehicle-card-header"]}>
              <div className={styles["vehicle-name-row"]}>
                <span className={styles["vehicle-name"]}>
                  {vehicleLabel(vehicle, activeTab)}
                </span>
                {vehicle.bodyType?.name && (
                  <span className={styles["body-type-badge"]}>{vehicle.bodyType.name}</span>
                )}
                {isPrimary && (
                  <span className={styles["primary-badge"]}>
                    {intl.formatMessage(messages.primary)}
                  </span>
                )}
              </div>
              <div className={styles["card-actions"]}>
                {showPrimaryToggle && !isEditing && (
                  <button
                    className={styles["primary-btn"]}
                    onClick={() => setPrimaryIdx(activeTab)}
                  >
                    {intl.formatMessage(messages.setAsPrimary)}
                  </button>
                )}
                {!isEditing && (
                  <button
                    className={styles["edit-btn"]}
                    onClick={() => { setShowAddForm(false); setEditingIdx(activeTab); }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    {intl.formatMessage(messages.edit)}
                  </button>
                )}
                {!isEditing && (
                  <button
                    className={styles["remove-btn"]}
                    onClick={() => removeVehicle(activeTab)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    {intl.formatMessage(messages.remove)}
                  </button>
                )}
              </div>
            </div>

            {isEditing ? (
              <VehicleComponent
                jobId={paFormData.jobId ?? ""}
                mode="edit"
                initialValues={toFormValues(vehicle)}
                onSaved={(saved) => handleEditSaved(activeTab, saved)}
                onCancel={() => setEditingIdx(null)}
              />
            ) : (
              <div className={styles["vehicle-fields"]}>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.vin)}</label>
                  <input readOnly value={vehicle.vin || "—"} />
                </div>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.bodyType)}</label>
                  <input readOnly value={vehicle.bodyType?.name || "—"} />
                </div>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.color)}</label>
                  <input readOnly value={vehicle.color || "—"} />
                </div>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.licensePlate)}</label>
                  <input readOnly value={vehicle.licensePlate || "—"} />
                </div>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.annualMileage)}</label>
                  <input
                    readOnly
                    value={vehicle.annualMileage ? `${vehicle.annualMileage.toLocaleString()} mi/yr` : "—"}
                  />
                </div>
                <div className={styles["vehicle-field"]}>
                  <label>{intl.formatMessage(messages.licenseState)}</label>
                  <input readOnly value={vehicle.licenseState?.name || "—"} />
                </div>
              </div>
            )}
          </div>
        )}

        {!showAddForm && (
          <button
            className={styles["add-btn"]}
            disabled={!paFormData.jobId}
            style={!paFormData.jobId ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
            onClick={() => { if (paFormData.jobId) { setShowAddForm(true); setEditingIdx(null); } }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage(messages.addVehicle)}
          </button>
        )}

        {!showAddForm && vehicles.length === 0 && (
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
            {intl.formatMessage(messages.noVehicles)}
          </p>
        )}

        {error && (
          <div className={styles["error-banner"]}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            {error}
          </div>
        )}
      </div>
    </WizardPage>
  );
};

export default VehiclesStep;
