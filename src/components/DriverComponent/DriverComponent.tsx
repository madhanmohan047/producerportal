import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { DRIVER_MESSAGES } from "./DriverComponent.messages";
import { usePAWizard } from "../../context/PAWizardContext";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import FormInput from "../common/FormInput/FormInput";
import { addDriverToJob } from "../../api/services/job/jobApi";
import { Driver as DriverType } from "../../api/services/job/types";
import { Contact } from "../../api/services/account/types/Contact";
import {
  US_STATES,
  DEFAULT_JOB_ID,
  CONTACT_TYPE_PERSON,
  CONTACT_ROLE_DRIVER,
  LICENSE_STATUS_VALID,
} from "../../constants";
import styles from "./DriverComponent.module.scss";

type DriverEntry = {
  localId: string;
  apiId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseState: ComboboxOption | undefined;
  licenseYear: number | "";
  yearsOfExperience: number | "";
  numAccidents: number | "";
  numViolations: number | "";
  violations: string;
  isPrimary: boolean;
};

type DriverFormData = Omit<DriverEntry, "localId" | "apiId">;

const emptyForm = (): DriverFormData => ({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  licenseNumber: "",
  licenseState: undefined,
  licenseYear: "",
  yearsOfExperience: "",
  numAccidents: "",
  numViolations: "",
  violations: "None",
  isPrimary: false,
});

const toDateString = (dob: Date | string | undefined): string => {
  if (!dob) return "";
  if (dob instanceof Date) return dob.toISOString().split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob.toString())) return dob.toString();
  const parsed = new Date(dob);
  return !isNaN(parsed.getTime()) ? parsed.toISOString().split("T")[0] : dob.toString();
};

const buildPayload = (form: DriverFormData): DriverType =>
  ({
    person: {
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth,
      type: CONTACT_TYPE_PERSON,
      roles: [CONTACT_ROLE_DRIVER],
    } as Contact,
    licenseNumber: form.licenseNumber,
    licenseState: form.licenseState?.code ?? "",
    licenseStatus: LICENSE_STATUS_VALID,
    licenseYear: form.licenseYear === "" ? undefined : form.licenseYear,
    yearsOfExperience: form.yearsOfExperience === "" ? undefined : form.yearsOfExperience,
    numAccidents: form.numAccidents === "" ? undefined : form.numAccidents,
    numViolations: form.numViolations === "" ? undefined : form.numViolations,
    violations: form.violations ? [form.violations] : [],
  }) as DriverType;

export const DriverComponent: React.FC = () => {
  const intl = useIntl();
  const { selectedAccount, setDriverCount } = usePAWizard();
  const savedNamedInsured = useRef(false);

  const [drivers, setDrivers] = useState<DriverEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<DriverFormData>(emptyForm());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDriverCount(drivers.length);
  }, [drivers, setDriverCount]);

  // Auto-populate and save the named insured when account is selected
  useEffect(() => {
    const holder = selectedAccount?.accountHolder;
    if (!holder || savedNamedInsured.current) return;
    savedNamedInsured.current = true;

    const dob = toDateString(holder.dateOfBirth);
    const namedInsuredEntry: DriverEntry = {
      localId: "named-insured",
      firstName: holder.firstName ?? "",
      lastName: holder.lastName ?? "",
      dateOfBirth: dob,
      licenseNumber: "",
      licenseState: undefined,
      licenseYear: "",
      yearsOfExperience: "",
      numAccidents: "",
      numViolations: "",
      violations: "None",
      isPrimary: true,
    };

    const payload = buildPayload({
      firstName: holder.firstName ?? "",
      lastName: holder.lastName ?? "",
      dateOfBirth: dob,
      licenseNumber: "",
      licenseState: undefined,
      licenseYear: "",
      yearsOfExperience: "",
      numAccidents: "",
      numViolations: "",
      violations: "None",
      isPrimary: true,
    });

    addDriverToJob(DEFAULT_JOB_ID, payload)
      .then(({ data }) => {
        setDrivers([{ ...namedInsuredEntry, apiId: data._id }]);
      })
      .catch((error) => {
        console.error("Error saving named insured driver:", error);
        setDrivers([namedInsuredEntry]);
      });
  }, [selectedAccount]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEditModal = (driver: DriverEntry) => {
    setEditingId(driver.localId);
    setForm({
      firstName: driver.firstName,
      lastName: driver.lastName,
      dateOfBirth: driver.dateOfBirth,
      licenseNumber: driver.licenseNumber,
      licenseState: driver.licenseState,
      licenseYear: driver.licenseYear,
      yearsOfExperience: driver.yearsOfExperience,
      numAccidents: driver.numAccidents,
      numViolations: driver.numViolations,
      violations: driver.violations,
      isPrimary: driver.isPrimary,
    });
    setModalOpen(true);
  };

  const handleDelete = (localId: string) => {
    setDrivers((prev) => prev.filter((d) => d.localId !== localId));
  };

  const handleSave = async () => {
    setSaving(true);
    let apiId: string | undefined;

    try {
      if (!editingId) {
        const { data } = await addDriverToJob(DEFAULT_JOB_ID, buildPayload(form));
        apiId = data._id;
      }
    } catch (error) {
      console.error("Error saving driver:", error);
    } finally {
      setSaving(false);
    }

    if (editingId) {
      setDrivers((prev) =>
        prev.map((d) => {
          if (d.localId !== editingId) {
            return form.isPrimary ? { ...d, isPrimary: false } : d;
          }
          return { ...d, ...form };
        }),
      );
    } else {
      const newEntry: DriverEntry = {
        localId: Date.now().toString(),
        apiId,
        ...form,
      };
      setDrivers((prev) => {
        const base = form.isPrimary
          ? prev.map((d) => ({ ...d, isPrimary: false }))
          : prev;
        return [...base, newEntry];
      });
    }

    setModalOpen(false);
  };

  const setField = <K extends keyof DriverFormData>(key: K, val: DriverFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const editingDriverIsPrimary =
    editingId !== null &&
    drivers.find((d) => d.localId === editingId)?.isPrimary === true;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {intl.formatMessage(DRIVER_MESSAGES.heading)}
      </h2>
      <p className={styles.subtitle}>
        {intl.formatMessage(DRIVER_MESSAGES.subtitle)}
      </p>

      <div className={styles.driverList}>
        {drivers.map((driver) => (
          <div key={driver.localId} className={styles.driverCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <span className={styles.driverName}>
                  {driver.firstName} {driver.lastName}
                </span>
                {driver.isPrimary && (
                  <span className={styles.badge}>
                    {intl.formatMessage(DRIVER_MESSAGES.namedInsuredBadge)}
                  </span>
                )}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => openEditModal(driver)}
                >
                  ✎ {intl.formatMessage(DRIVER_MESSAGES.editButton)}
                </button>
                {!driver.isPrimary && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(driver.localId)}
                    title="Remove driver"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className={styles.cardFields}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(DRIVER_MESSAGES.dobLabel)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={driver.dateOfBirth}
                  readOnly
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.emptyFieldFallback)}
                />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(DRIVER_MESSAGES.licenseLabel)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={driver.licenseNumber}
                  readOnly
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.licensePlaceholder)}
                />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(DRIVER_MESSAGES.violationsLabel)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={driver.violations}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addDriverBtn} onClick={openAddModal}>
        + {intl.formatMessage(DRIVER_MESSAGES.addDriverButton)}
      </button>

      <div className={styles.mvrNote}>
        <span className={styles.mvrIcon}>ℹ</span>
        <span>{intl.formatMessage(DRIVER_MESSAGES.mvrNote)}</span>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? "Edit Driver" : "Add Driver"}</h3>
              <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.firstNameLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.firstNamePlaceholder)}
                  value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.lastNameLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.lastNamePlaceholder)}
                  value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.dobLabel)}
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => setField("dateOfBirth", e.target.value)}
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.licenseLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.licensePlaceholder)}
                  value={form.licenseNumber}
                  onChange={(e) => setField("licenseNumber", e.target.value)}
                />
                <Combobox
                  label={intl.formatMessage(DRIVER_MESSAGES.licenseStateLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.licenseStatePlaceholder)}
                  options={US_STATES}
                  value={form.licenseState}
                  onChange={(opt) => setField("licenseState", opt)}
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.licenseYearLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.licenseYearPlaceholder)}
                  type="number"
                  value={form.licenseYear}
                  onChange={(e) =>
                    setField("licenseYear", e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.yearsOfExperienceLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.yearsOfExperiencePlaceholder)}
                  type="number"
                  value={form.yearsOfExperience}
                  onChange={(e) =>
                    setField("yearsOfExperience", e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.numAccidentsLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.numAccidentsPlaceholder)}
                  type="number"
                  value={form.numAccidents}
                  onChange={(e) =>
                    setField("numAccidents", e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.numViolationsLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.numViolationsPlaceholder)}
                  type="number"
                  value={form.numViolations}
                  onChange={(e) =>
                    setField("numViolations", e.target.value === "" ? "" : Number(e.target.value))
                  }
                />
                <FormInput
                  label={intl.formatMessage(DRIVER_MESSAGES.violationsLabel)}
                  placeholder={intl.formatMessage(DRIVER_MESSAGES.violationsPlaceholder)}
                  value={form.violations}
                  onChange={(e) => setField("violations", e.target.value)}
                />
              </div>

              <label className={styles.primaryToggle}>
                <input
                  type="checkbox"
                  checked={form.isPrimary}
                  disabled={editingDriverIsPrimary}
                  onChange={(e) => setField("isPrimary", e.target.checked)}
                />
                Set as Primary Driver
              </label>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                {intl.formatMessage(DRIVER_MESSAGES.cancelButton)}
              </button>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : intl.formatMessage(DRIVER_MESSAGES.saveButton)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
