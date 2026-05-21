import React, { useEffect, useState } from "react";
import { Driver as DriverType } from "../../api/services/job/types";
import { Contact } from "../../api/services/account/types/Contact";
import { addDriverToJob } from "../../api/services/job/jobApi";
import { getTypeList } from "../../api/services/typelist/typelistApi";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import { FormInput } from "../common";
import styles from "./DriverComponent.module.scss";

type PersonMode = "new" | "existing";

type FormState = {
  personMode: PersonMode;
  firstName: string;
  lastName: string;
  emailAddress: string;
  dateOfBirth: string;
  personId: string;
  licenseNumber: string;
  licenseYear: number | "";
  licenseState: ComboboxOption | undefined;
  numViolations: number | "";
  numAccidents: number | "";
  yearsOfExperience: number | "";
};

export type DriverSavedExtras = {
  dateOfBirth: string;
};

type DriverComponentProps = {
  jobId?: string;
  mode?: "add" | "edit";
  isNamedInsured?: boolean;
  initialValues?: Partial<FormState>;
  onSaved?: (driver: DriverType, extras: DriverSavedExtras) => void;
  onCancel?: () => void;
};

const emptyForm = (): FormState => ({
  personMode: "new",
  firstName: "",
  lastName: "",
  emailAddress: "",
  dateOfBirth: "",
  personId: "",
  licenseNumber: "",
  licenseYear: "",
  licenseState: undefined,
  numViolations: "",
  numAccidents: "",
  yearsOfExperience: "",
});

const toNum = (v: number | "") => (v === "" ? 0 : v);

export const DriverComponent: React.FC<DriverComponentProps> = ({
  jobId,
  mode = "add",
  initialValues,
  onSaved,
  onCancel,
}) => {
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm(),
    ...initialValues,
  }));
  const [states, setStates] = useState<ComboboxOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTypeList("State").then((response) => {
      const raw = response.data as any;
      const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
      setStates(list);
    });
  }, []);

 
  const set = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError(null);

    if (form.personMode === "new") {
      if (!form.firstName.trim() || !form.lastName.trim()) {
        setError("First name and last name are required.");
        return;
      }
      if (!form.emailAddress.trim()) {
        setError("Email address is required.");
        return;
      }
    } else if (!form.personId.trim()) {
      setError("Person ID is required.");
      return;
    }

    if (!form.licenseNumber.trim()) {
      setError("License number is required.");
      return;
    }
    if (form.licenseYear === "") {
      setError("License year is required.");
      return;
    }
    if (!form.licenseState) {
      setError("License state is required.");
      return;
    }

    const person: string | Contact =
      form.personMode === "existing"
        ? form.personId.trim()
        : ({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            emailAddress: form.emailAddress.trim(),
            dateOfBirth: form.dateOfBirth || undefined,
            roles: [],
          } as Contact);

    const payload: DriverType = {
      person,
      licenseNumber: form.licenseNumber.trim(),
      licenseYear: toNum(form.licenseYear),
      licenseState: form.licenseState.code,
      licenseStatus: "Valid",
      numViolations: toNum(form.numViolations),
      numAccidents: toNum(form.numAccidents),
      yearsOfExperience: toNum(form.yearsOfExperience),
    } as DriverType;

    if (mode === "edit") {
      onSaved?.(payload, { dateOfBirth: form.dateOfBirth });
      return;
    }

    setIsLoading(true);
    try {
      const { data: saved } = await addDriverToJob(jobId ?? "", payload);
      onSaved?.(saved, { dateOfBirth: form.dateOfBirth });
      setForm(emptyForm());
    } catch (err: any) {
      setError(err?.message ?? "Failed to save driver. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      {mode === "add" && (
        <div className={styles.modeToggle}>
          <button
            type="button"
            className={`${styles.modeBtn} ${form.personMode === "new" ? styles.modeBtnActive : ""}`}
            onClick={() => set("personMode", "new")}
          >
            New Person
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${form.personMode === "existing" ? styles.modeBtnActive : ""}`}
            onClick={() => set("personMode", "existing")}
          >
            Existing Person
          </button>
        </div>
      )}

      <div>
        <p className={styles["section-title"]}>Person Info</p>
        <div className={styles.grid}>
          {form.personMode === "new" ? (
            <>
              <FormInput
                label="First Name *"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="First name"
              />
              <FormInput
                label="Last Name *"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Last name"
              />
              <FormInput
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
              />
              <FormInput
                label="Email *"
                type="email"
                value={form.emailAddress}
                onChange={(e) => set("emailAddress", e.target.value)}
                placeholder="e.g. john@example.com"
              />
            </>
          ) : mode === "edit" ? (
            <>
              <FormInput
                label="First Name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="First name"
                readOnly={!!form.firstName}
              />
              <FormInput
                label="Last Name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Last name"
                readOnly={!!form.lastName}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
                readOnly={!!form.dateOfBirth}
              />
            </>
          ) : (
            <FormInput
              label="Person ID *"
              value={form.personId}
              onChange={(e) => set("personId", e.target.value)}
              placeholder="Existing contact ID"
            />
          )}
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>License</p>
        <div className={styles.grid}>
          <FormInput
            label="License Number *"
            value={form.licenseNumber}
            onChange={(e) => set("licenseNumber", e.target.value)}
            placeholder="e.g. 4421839"
            readOnly={mode === "edit" && !!form.licenseNumber}
          />
          <FormInput
            label="License Year *"
            type="number"
            value={form.licenseYear}
            onChange={(e) =>
              set("licenseYear", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 2018"
            readOnly={mode === "edit" && form.licenseYear !== ""}
          />
          <Combobox
            label="License State *"
            options={states}
            value={form?.licenseState}
            onChange={(opt) => set("licenseState", opt)}
            fullWidth
            disabled={mode === "edit" && !!form.licenseState}
          />
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>Driving Record</p>
        <div className={styles.grid}>
          <FormInput
            label="Violations (3yr)"
            type="number"
            value={form.numViolations}
            onChange={(e) =>
              set("numViolations", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="0"
            readOnly={mode === "edit" && form.numViolations !== ""}
          />
          <FormInput
            label="Accidents (3yr)"
            type="number"
            value={form.numAccidents}
            onChange={(e) =>
              set("numAccidents", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="0"
            readOnly={mode === "edit" && form.numAccidents !== ""}
          />
          <FormInput
            label="Years of Experience"
            type="number"
            value={form.yearsOfExperience}
            onChange={(e) =>
              set("yearsOfExperience", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="0"
            readOnly={mode === "edit" && form.yearsOfExperience !== ""}
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
          {isLoading ? "Saving..." : mode === "edit" ? "Save Changes" : "Add Driver"}
        </button>
        {onCancel && (
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
