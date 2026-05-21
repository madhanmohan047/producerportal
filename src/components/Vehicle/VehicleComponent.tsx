import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { FormInput } from "../common";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { Address } from "../../api/services/account/types/Address";
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
  garageLocation?: Address;
};

export type VehicleComponentProps = {
  jobId?: string;
  mode?: "add" | "edit";
  initialValues?: Partial<VehicleFormState>;
  onSaved?: (vehicle: Vehicle) => void;
  onCancel?: () => void;
};

const emptyAddress: Address = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  county: "",
  postalCode: "",
  state: { code: "", name: "" },
  country: { code: "", name: "" },
  addressType: { code: "", name: "" },
} as Address;

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
    getTypeList("BodyType").then((res) => {
      const raw = res.data as any;
      setBodyTypes(Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []));
    });
    getTypeList("State").then((res) => {
      const raw = res.data as any;
      setStates(Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []));
    });
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

    const payload: Vehicle = {
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
      garageLocation: form.garageLocation ?? emptyAddress,
      vehicleDrivers: [],
    } as Vehicle;

    if (mode === "edit") {
      onSaved?.({ ...payload, _id: form._id });
      return;
    }

    setIsLoading(true);
    try {
      const { data: saved } = await addVehicleToJob(jobId ?? "", payload);
      onSaved?.(saved);
      setForm(emptyForm());
    } catch (err: any) {
      setError(err?.message ?? intl.formatMessage(messages.errorSave));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <p className={styles["section-title"]}>Vehicle Info</p>
        <div className={styles.formGrid}>
          <FormInput
            label={intl.formatMessage(messages.make)}
            value={form.make}
            onChange={(e) => set("make", e.target.value)}
            placeholder="e.g. Toyota"
          />
          <FormInput
            label={intl.formatMessage(messages.model)}
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder="e.g. Camry"
          />
          <FormInput
            label={intl.formatMessage(messages.year)}
            type="number"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder="e.g. 2022"
          />
          <FormInput
            label={intl.formatMessage(messages.vin)}
            value={form.vin}
            onChange={(e) => set("vin", e.target.value)}
            placeholder="e.g. 1HGBH41JXMN109186"
          />
          <FormInput
            label={intl.formatMessage(messages.color)}
            value={form.color}
            onChange={(e) => set("color", e.target.value)}
            placeholder="e.g. White"
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
        <p className={styles["section-title"]}>Registration & Usage</p>
        <div className={styles.formGrid}>
          <FormInput
            label={intl.formatMessage(messages.licensePlate)}
            value={form.licensePlate}
            onChange={(e) => set("licensePlate", e.target.value)}
            placeholder="e.g. ABC-1234"
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
            placeholder="e.g. 12000"
          />
          <FormInput
            label={intl.formatMessage(messages.costNew)}
            type="number"
            value={form.costNew}
            onChange={(e) => set("costNew", e.target.value)}
            placeholder="e.g. 25000"
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
