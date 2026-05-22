import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { FormInput } from "../common";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { addVehicleToJob } from "../../api/services/job/jobApi";
import { getTypeList } from "../../api/services/typelist/typelistApi";
import messages from "./VehicleComponent.messages";
import styles from "./VehicleComponent.module.scss";

type VehicleFormState = {
  _id?: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  color: string;
  licensePlate: string;
  annualMileage: string;
  costNew: string;
  bodyType: ComboboxOption | undefined;
  licenseState: ComboboxOption | undefined;
  garagingStreet: string;
  garagingCity: string;
  garagingZip: string;
  garagingState: ComboboxOption | undefined;
};

export type VehicleComponentProps = {
  jobId?: string;
  mode?: "add" | "edit";
  initialValues?: Partial<VehicleFormState>;
  onSaved?: (vehicle: Vehicle) => void;
  onCancel?: () => void;
};

const emptyForm = (): VehicleFormState => ({
  make: "",
  model: "",
  year: "",
  vin: "",
  color: "",
  licensePlate: "",
  annualMileage: "",
  costNew: "",
  bodyType: undefined,
  licenseState: undefined,
  garagingStreet: "",
  garagingCity: "",
  garagingZip: "",
  garagingState: undefined,
});

const VehicleComponent: React.FC<VehicleComponentProps> = ({
  jobId,
  mode = "add",
  initialValues,
  onSaved,
  onCancel,
}) => {
  const intl = useIntl();
  const [form, setForm] = useState<VehicleFormState>(() => ({
    ...emptyForm(),
    ...initialValues,
  }));
  const [bodyTypes, setBodyTypes] = useState<ComboboxOption[]>([]);
  const [states, setStates] = useState<ComboboxOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTypeList("BodyType")
      .then((res) => {
        const raw = res as any;
        setBodyTypes(Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []));
      })
      .catch((err) => console.error("[VehicleComponent] Failed to load BodyTypes:", err));

    getTypeList("State")
      .then((res) => {
        const raw = res as any;
        setStates(Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []));
      })
      .catch((err) => console.error("[VehicleComponent] Failed to load States:", err));
  }, []);

  const set = <K extends keyof VehicleFormState>(field: K, value: VehicleFormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError(null);

    if (!form.make.trim() || !form.model.trim() || !form.vin.trim()) {
      setError(intl.formatMessage(messages.errorMakeModel));
      return;
    }
    const yearNum = Number(form.year);
    if (!form.year || isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      setError(intl.formatMessage(messages.errorYear));
      return;
    }
    if (!form.garagingStreet.trim() || !form.garagingCity.trim() || !form.garagingZip.trim() || !form.garagingState) {
      setError(intl.formatMessage(messages.errorGaragingAddress));
      return;
    }

    const payload = {
      make: form.make.trim(),
      model: form.model.trim(),
      year: yearNum,
      vin: form.vin.trim(),
      color: form.color.trim(),
      licensePlate: form.licensePlate.trim(),
      annualMileage: form.annualMileage ? Number(form.annualMileage) : 0,
      costNew: form.costNew ? Number(form.costNew) : 0,
      bodyType: form.bodyType ?? { code: "", name: "" },
      licenseState: form.licenseState ?? { code: "", name: "" },
      garageLocation: {
        addressLine1: form.garagingStreet.trim(),
        addressLine2: "",
        city: form.garagingCity.trim(),
        postalCode: form.garagingZip.trim(),
        state: { code: form.garagingState.code, name: form.garagingState.name },
        country: { code: "US", name: "United States" },
        county: "",
        addressType: { code: "home", name: "Home" },
      },
      vehicleDrivers: [],
    } as unknown as Vehicle;

    if (mode === "edit") {
      onSaved?.({ ...payload, _id: form._id });
      return;
    }

    setIsLoading(true);
    console.log("[VehicleComponent] jobId prop:", jobId);
    console.log("[VehicleComponent] payload:", payload);
    try {
      const res = await addVehicleToJob(jobId ?? "", payload);
      console.log("[VehicleComponent] addVehicleToJob response:", res);
      const rawData = (res as any).data;
      const saved: Vehicle = rawData?.data ?? rawData ?? res;
      console.log("[VehicleComponent] saved vehicle:", saved);
      onSaved?.(saved);
      setForm(emptyForm());
    } catch (err: any) {
      console.error("[VehicleComponent] addVehicleToJob error:", err);
      console.error("[VehicleComponent] backend response data:", err?.response?.data);
      setError(err?.response?.data?.message ?? err?.message ?? intl.formatMessage(messages.errorSave));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionVehicleInfo)}</p>
        <div className={styles.formGrid}>
          <FormInput
            label={intl.formatMessage(messages.make)}
            value={form.make}
            onChange={(e) => set("make", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderMake)}
          />
          <FormInput
            label={intl.formatMessage(messages.model)}
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderModel)}
          />
          <FormInput
            label={intl.formatMessage(messages.year)}
            type="number"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderYear)}
          />
          <FormInput
            label={intl.formatMessage(messages.vin)}
            value={form.vin}
            onChange={(e) => set("vin", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderVin)}
          />
          <FormInput
            label={intl.formatMessage(messages.color)}
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderColor)}
          />
          <Combobox
            label={intl.formatMessage(messages.bodyType)}
            options={bodyTypes}
            value={form.bodyType}
            onChange={(opt) => set("bodyType", opt)}
            fullWidth
          />
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionRegistration)}</p>
        <div className={styles.formGrid}>
          <FormInput
            label={intl.formatMessage(messages.licensePlate)}
            value={form.licensePlate}
            onChange={(e) => set("licensePlate", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderLicensePlate)}
          />
          <Combobox
            label={intl.formatMessage(messages.licenseState)}
            options={states}
            value={form.licenseState}
            onChange={(opt) => set("licenseState", opt)}
            fullWidth
          />
          <FormInput
            label={intl.formatMessage(messages.annualMileage)}
            type="number"
            value={form.annualMileage}
            onChange={(e) => set("annualMileage", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderMileage)}
          />
          <FormInput
            label={intl.formatMessage(messages.costNew)}
            type="number"
            value={form.costNew}
            onChange={(e) => set("costNew", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderCostNew)}
          />
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionGaragingAddress)}</p>
        <div className={styles.formGrid}>
          <FormInput
            label={intl.formatMessage(messages.garagingStreet)}
            value={form.garagingStreet}
            onChange={(e) => set("garagingStreet", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderGaragingStreet)}
          />
          <FormInput
            label={intl.formatMessage(messages.garagingCity)}
            value={form.garagingCity}
            onChange={(e) => set("garagingCity", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderGaragingCity)}
          />
          <Combobox
            label={intl.formatMessage(messages.garagingState)}
            options={states}
            value={form.garagingState}
            onChange={(opt) => set("garagingState", opt)}
            fullWidth
          />
          <FormInput
            label={intl.formatMessage(messages.garagingZip)}
            value={form.garagingZip}
            onChange={(e) => set("garagingZip", e.target.value)}
            placeholder={intl.formatMessage(messages.placeholderGaragingZip)}
          />
        </div>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.actions}>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${styles.saveButton} ${isLoading ? styles.disabled : ""}`}
        >
          {isLoading
            ? intl.formatMessage(messages.saving)
            : mode === "edit"
            ? intl.formatMessage(messages.saveChanges)
            : intl.formatMessage(messages.addVehicle)}
        </button>
        {onCancel && (
          <button onClick={onCancel} className={styles.cancelButton}>
            {intl.formatMessage(messages.cancel)}
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleComponent;
