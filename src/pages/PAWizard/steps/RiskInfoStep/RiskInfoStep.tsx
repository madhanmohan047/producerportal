import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faCircleInfo, faTag } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { FormInput } from "../../../../components/common";
import Combobox, { ComboboxOption } from "../../../../components/common/Combobox/Combobox";
import { usePAContext } from "../../PAWizardContext";
import {
  ANTI_THEFT_OPTIONS,
  OVERNIGHT_PARKING_OPTIONS,
  US_STATES,
  LOW_MILEAGE_THRESHOLD,
  QUALIFYING_ANTI_THEFT_CODES,
} from "../../../../utils/vehicleRiskConstants";
import messages from "./RiskInfoStep.messages";
import styles from "./RiskInfoStep.module.scss";

type GaragingAddress = {
  street: string;
  city: string;
  state: ComboboxOption | undefined;
  zip: string;
};

type VehicleRiskData = {
  garagingAddress: GaragingAddress;
  annualMileage: string;
  antiTheftDevice: ComboboxOption | undefined;
  overnightParking: ComboboxOption | undefined;
};

const vehicleLabel = (v: { year: number; make: string; model: string }, idx: number) =>
  `${v.year} ${v.make} ${v.model}`.trim() || `Vehicle ${idx + 1}`;

const RiskInfoStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { paFormData, setPAFormData } = usePAContext();
  const vehicles = paFormData.vehicles ?? [];
  const baseStateCode = (paFormData.baseState as ComboboxOption | undefined)?.code ?? "";

  const [activeTab, setActiveTab] = useState(0);
  const [riskData, setRiskData] = useState<VehicleRiskData[]>(() =>
    vehicles.map((v) => {
      const loc = v.garageLocation;
      const stateCode = (loc?.state as ComboboxOption | undefined)?.code ?? "";
      return {
        garagingAddress: {
          street: loc?.addressLine1 ?? "",
          city: loc?.city ?? "",
          state: stateCode
            ? US_STATES.find((s) => s.code === stateCode) ?? undefined
            : undefined,
          zip: loc?.postalCode ?? "",
        },
        annualMileage: v.annualMileage ? String(v.annualMileage) : "",
        antiTheftDevice: ANTI_THEFT_OPTIONS[0],
        overnightParking: undefined,
      };
    })
  );

  const [fieldErrors, setFieldErrors] = useState<Record<number, string>>({});

  const setRisk = (idx: number, patch: Partial<VehicleRiskData>) =>
    setRiskData((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  const setGaraging = (idx: number, patch: Partial<GaragingAddress>) =>
    setRisk(idx, {
      garagingAddress: { ...riskData[idx].garagingAddress, ...patch },
    });

  const handleNext = () => {
    const errors: Record<number, string> = {};
    riskData.forEach((r, i) => {
      const miles = Number(r.annualMileage);
      if (!r.annualMileage.trim() || isNaN(miles) || miles <= 0) {
        errors[i] = intl.formatMessage(messages.mileageRequired);
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setActiveTab(Number(Object.keys(errors)[0]));
      return;
    }

    setFieldErrors({});
    setPAFormData((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v, i) => ({
        ...v,
        annualMileage: Number(riskData[i].annualMileage),
        garageLocation: {
          ...v.garageLocation,
          addressLine1: riskData[i].garagingAddress.street,
          city: riskData[i].garagingAddress.city,
          state: riskData[i].garagingAddress.state as any,
          postalCode: riskData[i].garagingAddress.zip,
        },
      })),
    }));
    wizardPageProps.handleNext?.();
  };

  const discountFlags: string[] = [];
  riskData.forEach((r, i) => {
    const miles = Number(r.annualMileage);
    if (r.annualMileage && miles < LOW_MILEAGE_THRESHOLD) {
      discountFlags.push(
        `${vehicleLabel(vehicles[i], i)}: ${intl.formatMessage(messages.discountLowMileage)}`
      );
    }
    if (r.antiTheftDevice && QUALIFYING_ANTI_THEFT_CODES.has(r.antiTheftDevice.code)) {
      discountFlags.push(
        `${vehicleLabel(vehicles[i], i)}: ${intl.formatMessage(messages.discountComprehensive)}`
      );
    }
  });

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["risk-container"]}>
        {vehicles.length === 0 ? (
          <p className={styles["empty-state"]}>{intl.formatMessage(messages.noVehicles)}</p>
        ) : (
          <>
            {/* ── Tab bar ── */}
            <div className={styles.tabs}>
              {vehicles.map((v, idx) => (
                <button
                  key={idx}
                  className={`${styles.tab} ${activeTab === idx ? styles["tab-active"] : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {vehicleLabel(v, idx)}
                  {fieldErrors[idx] && " ⚠"}
                </button>
              ))}
            </div>

            {/* ── Active vehicle panel ── */}
            {(() => {
              const v = vehicles[activeTab];
              const r = riskData[activeTab];
              if (!v || !r) return null;

              const garagingStateCode = r.garagingAddress.state?.code ?? "";
              const stateMismatch =
                garagingStateCode !== "" &&
                baseStateCode !== "" &&
                garagingStateCode !== baseStateCode;

              const isLowMileage =
                r.annualMileage !== "" &&
                Number(r.annualMileage) < LOW_MILEAGE_THRESHOLD &&
                Number(r.annualMileage) > 0;

              return (
                <div className={styles["vehicle-panel"]}>
                  {/* Header */}
                  <div className={styles["vehicle-header"]}>
                    <div className={styles["vehicle-name-row"]}>
                      <span className={styles["vehicle-name"]}>{vehicleLabel(v, activeTab)}</span>
                      {v.bodyType?.name && (
                        <span className={styles["body-type-badge"]}>{v.bodyType.name}</span>
                      )}
                    </div>
                    <button
                      className={styles["edit-link"]}
                      onClick={() => navigate("/pawizard/vehicles")}
                    >
                      {intl.formatMessage(messages.editVehicle)}
                    </button>
                  </div>

                  {/* ── Garaging Address ── */}
                  <div className={styles.section}>
                    <p className={styles["section-title"]}>
                      {intl.formatMessage(messages.sectionGaraging)}
                    </p>
                    <div className={styles["address-grid"]}>
                      <FormInput
                        label={intl.formatMessage(messages.street)}
                        value={r.garagingAddress.street}
                        onChange={(e) => setGaraging(activeTab, { street: e.target.value })}
                        placeholder="123 Main St"
                      />
                      <FormInput
                        label={intl.formatMessage(messages.city)}
                        value={r.garagingAddress.city}
                        onChange={(e) => setGaraging(activeTab, { city: e.target.value })}
                        placeholder="City"
                      />
                      <Combobox
                        label={intl.formatMessage(messages.state)}
                        options={US_STATES}
                        value={r.garagingAddress.state}
                        onChange={(opt) => setGaraging(activeTab, { state: opt })}
                        fullWidth
                      />
                      <FormInput
                        label={intl.formatMessage(messages.zip)}
                        value={r.garagingAddress.zip}
                        onChange={(e) => setGaraging(activeTab, { zip: e.target.value })}
                        placeholder="00000"
                      />
                    </div>
                    {stateMismatch && (
                      <div className={styles["warning-banner"]}>
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        {intl.formatMessage(messages.stateMismatch)}
                      </div>
                    )}
                  </div>

                  {/* ── Risk Details ── */}
                  <div className={styles.section}>
                    <p className={styles["section-title"]}>
                      {intl.formatMessage(messages.sectionRisk)}
                    </p>
                    <div className={styles["risk-details-grid"]}>
                      <div>
                        <FormInput
                          label={intl.formatMessage(messages.annualMileage)}
                          type="number"
                          value={r.annualMileage}
                          onChange={(e) => {
                            setRisk(activeTab, { annualMileage: e.target.value });
                            if (fieldErrors[activeTab]) {
                              setFieldErrors((prev) => {
                                const next = { ...prev };
                                delete next[activeTab];
                                return next;
                              });
                            }
                          }}
                          placeholder={intl.formatMessage(messages.annualMileagePlaceholder)}
                        />
                        {fieldErrors[activeTab] && (
                          <p className={styles["field-error"]}>{fieldErrors[activeTab]}</p>
                        )}
                        {isLowMileage && (
                          <div className={styles["mileage-note"]}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            {intl.formatMessage(messages.lowMileageNote)}
                          </div>
                        )}
                      </div>
                      <Combobox
                        label={intl.formatMessage(messages.antiTheft)}
                        options={ANTI_THEFT_OPTIONS}
                        value={r.antiTheftDevice}
                        onChange={(opt) => setRisk(activeTab, { antiTheftDevice: opt })}
                        fullWidth
                      />
                      <Combobox
                        label={intl.formatMessage(messages.overnightParking)}
                        options={OVERNIGHT_PARKING_OPTIONS}
                        value={r.overnightParking}
                        onChange={(opt) => setRisk(activeTab, { overnightParking: opt })}
                        fullWidth
                      />
                    </div>
                  </div>

                  {/* ── Primary Use ── */}
                  <div className={styles.section}>
                    <p className={styles["section-title"]}>
                      {intl.formatMessage(messages.sectionPrimaryUse)}
                    </p>
                    <div className={styles["primary-use-row"]}>
                      <span className={styles["primary-use-value"]}>
                        {v.bodyType?.name || intl.formatMessage(messages.notSet)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── Discount Flag Summary ── */}
            <div className={styles["discount-card"]}>
              <p className={styles["discount-header"]}>
                <FontAwesomeIcon icon={faTag} />{" "}
                {intl.formatMessage(messages.discountTitle)}
              </p>
              <p className={styles["discount-note"]}>
                {intl.formatMessage(messages.discountNote)}
              </p>
              {discountFlags.length === 0 ? (
                <p className={styles["no-discounts"]}>
                  {intl.formatMessage(messages.noDiscounts)}
                </p>
              ) : (
                discountFlags.map((flag, i) => (
                  <div key={i} className={styles["discount-flag"]}>
                    <FontAwesomeIcon icon={faTag} />
                    {flag}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </WizardPage>
  );
};

export default RiskInfoStep;
