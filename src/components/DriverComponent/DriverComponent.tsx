import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Driver as DriverType } from "../../api/services/job/types";
import { Contact } from "../../api/services/account/types/Contact";
import { addDriverToJob } from "../../api/services/job/jobApi";
import { getTypeList } from "../../api/services/typelist/typelistApi";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import { FormInput } from "../common";
import messages from "./DriverComponent.messages";
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
  const intl = useIntl();
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm(),
    ...initialValues,
  }));
  const [states, setStates] = useState<ComboboxOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTypeList("State").then((response) => {
      const raw = response as any;
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
        setError(intl.formatMessage(messages.errorName));
        return;
      }
      if (!form.emailAddress.trim()) {
        setError(intl.formatMessage(messages.errorEmail));
        return;
      }
    } else if (!form.personId.trim()) {
      setError(intl.formatMessage(messages.errorPersonId));
      return;
    }

    if (!form.licenseNumber.trim()) {
      setError(intl.formatMessage(messages.errorLicenseNumber));
      return;
    }
    if (form.licenseYear === "") {
      setError(intl.formatMessage(messages.errorLicenseYear));
      return;
    }
    if (!form.licenseState) {
      setError(intl.formatMessage(messages.errorLicenseState));
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
      setError(err?.message ?? intl.formatMessage(messages.errorSave));
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
            {intl.formatMessage(messages.newPerson)}
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${form.personMode === "existing" ? styles.modeBtnActive : ""}`}
            onClick={() => set("personMode", "existing")}
          >
            {intl.formatMessage(messages.existingPerson)}
          </button>
        </div>
      )}

      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionPersonInfo)}</p>
        <div className={styles.grid}>
          {form.personMode === "new" ? (
            <>
              <FormInput
                label={intl.formatMessage(messages.firstNameRequired)}
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder={intl.formatMessage(messages.firstNamePlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.lastNameRequired)}
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder={intl.formatMessage(messages.lastNamePlaceholder)}
              />
              <FormInput
                label={intl.formatMessage(messages.dateOfBirth)}
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
              />
              <FormInput
                label={intl.formatMessage(messages.emailRequired)}
                type="email"
                value={form.emailAddress}
                onChange={(e) => set("emailAddress", e.target.value)}
                placeholder={intl.formatMessage(messages.emailPlaceholder)}
              />
            </>
          ) : mode === "edit" ? (
            <>
              <FormInput
                label={intl.formatMessage(messages.firstName)}
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder={intl.formatMessage(messages.firstNamePlaceholder)}
                readOnly={!!form.firstName}
              />
              <FormInput
                label={intl.formatMessage(messages.lastName)}
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder={intl.formatMessage(messages.lastNamePlaceholder)}
                readOnly={!!form.lastName}
              />
              <FormInput
                label={intl.formatMessage(messages.dateOfBirth)}
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set("dateOfBirth", e.target.value)}
                readOnly={!!form.dateOfBirth}
              />
            </>
          ) : (
            <FormInput
              label={intl.formatMessage(messages.personIdRequired)}
              value={form.personId}
              onChange={(e) => set("personId", e.target.value)}
              placeholder={intl.formatMessage(messages.personIdPlaceholder)}
            />
          )}
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionLicense)}</p>
        <div className={styles.grid}>
          <FormInput
            label={intl.formatMessage(messages.licenseNumberRequired)}
            value={form.licenseNumber}
            onChange={(e) => set("licenseNumber", e.target.value)}
            placeholder={intl.formatMessage(messages.licenseNumberPlaceholder)}
            readOnly={mode === "edit" && !!form.licenseNumber}
          />
          <FormInput
            label={intl.formatMessage(messages.licenseYearRequired)}
            type="number"
            value={form.licenseYear}
            onChange={(e) =>
              set("licenseYear", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder={intl.formatMessage(messages.licenseYearPlaceholder)}
            readOnly={mode === "edit" && form.licenseYear !== ""}
          />
          <Combobox
            label={intl.formatMessage(messages.licenseStateRequired)}
            options={states}
            value={form?.licenseState}
            onChange={(opt) => set("licenseState", opt)}
            fullWidth
            disabled={mode === "edit" && !!form.licenseState}
          />
        </div>
      </div>

      <div>
        <p className={styles["section-title"]}>{intl.formatMessage(messages.sectionDrivingRecord)}</p>
        <div className={styles.grid}>
          <FormInput
            label={intl.formatMessage(messages.violations)}
            type="number"
            value={form.numViolations}
            onChange={(e) =>
              set("numViolations", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder={intl.formatMessage(messages.placeholderZero)}
            readOnly={mode === "edit" && form.numViolations !== ""}
          />
          <FormInput
            label={intl.formatMessage(messages.accidents)}
            type="number"
            value={form.numAccidents}
            onChange={(e) =>
              set("numAccidents", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder={intl.formatMessage(messages.placeholderZero)}
            readOnly={mode === "edit" && form.numAccidents !== ""}
          />
          <FormInput
            label={intl.formatMessage(messages.yearsOfExperience)}
            type="number"
            value={form.yearsOfExperience}
            onChange={(e) =>
              set("yearsOfExperience", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder={intl.formatMessage(messages.placeholderZero)}
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
          {isLoading
            ? intl.formatMessage(messages.saving)
            : mode === "edit"
            ? intl.formatMessage(messages.saveChanges)
            : intl.formatMessage(messages.addDriver)}
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
