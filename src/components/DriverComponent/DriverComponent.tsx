import React, { useState } from "react";
import { Driver as DriverType } from "../../api/services/job/types";
import { Contact } from "../../api/services/account/types/Contact";
import { addDriverToJob } from "../../api/services/job/jobApi";
import { FormInput } from "../common";
import styles from "./DriverComponent.module.scss";

type PersonMode = "new" | "existing";

type DriverComponentProps = {
  jobId: string;
  onDriverAdded?: (driver: DriverType) => void;
};

type FormState = {
  personMode: PersonMode;
  firstName: string;
  lastName: string;
  emailAddress: string;
  personId: string;
  licenseNumber: string;
  licenseState: string;
  yearsOfExperience: number | "";
  numAccidents: number | "";
  numViolations: number | "";
};

const initialForm: FormState = {
  personMode: "new",
  firstName: "",
  lastName: "",
  emailAddress: "",
  personId: "",
  licenseNumber: "",
  licenseState: "",
  yearsOfExperience: "",
  numAccidents: "",
  numViolations: "",
};

export const DriverComponent: React.FC<DriverComponentProps> = ({ jobId, onDriverAdded }) => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof FormState, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError(null);

    if (form.personMode === "new") {
      if (!form.firstName.trim() || !form.lastName.trim() || !form.emailAddress.trim()) {
        setError("First name, last name, and email are required.");
        return;
      }
    } else if (!form.personId.trim()) {
      setError("Person ID is required.");
      return;
    }

    const person: string | Contact =
      form.personMode === "existing"
        ? form.personId.trim()
        : ({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            emailAddress: form.emailAddress.trim(),
            type: { code: "person", name: "Person" },
            roles: [{ code: "driver", name: "Driver" }],
          } as Contact);

    const payload: Partial<DriverType> = {
      person,
      licenseNumber: form.licenseNumber.trim() || undefined,
      licenseState: form.licenseState.trim() || undefined,
      licenseStatus: "Valid",
      yearsOfExperience: form.yearsOfExperience === "" ? undefined : form.yearsOfExperience,
      numAccidents: form.numAccidents === "" ? undefined : form.numAccidents,
      numViolations: form.numViolations === "" ? undefined : form.numViolations,
      violations: [],
    };

    setIsLoading(true);
    try {
      const { data: saved } = await addDriverToJob(jobId, payload as DriverType);
      onDriverAdded?.(saved);
      setForm(initialForm);
    } catch (err: any) {
      setError(err?.message ?? "Failed to add driver. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Driver Information</h2>

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

      <div className={styles.grid}>
        {form.personMode === "new" ? (
          <>
            <FormInput
              label="First Name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
            <FormInput
              label="Last Name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
            <FormInput
              label="Email Address"
              type="email"
              value={form.emailAddress}
              onChange={(e) => set("emailAddress", e.target.value)}
            />
          </>
        ) : (
          <FormInput
            label="Person ID"
            value={form.personId}
            onChange={(e) => set("personId", e.target.value)}
          />
        )}

        <FormInput
          label="License Number"
          value={form.licenseNumber}
          onChange={(e) => set("licenseNumber", e.target.value)}
        />
        <FormInput
          label="License State"
          value={form.licenseState}
          onChange={(e) => set("licenseState", e.target.value)}
        />
        <FormInput
          label="Years of Experience"
          type="number"
          value={form.yearsOfExperience}
          onChange={(e) =>
            set("yearsOfExperience", e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <FormInput
          label="No. of Accidents"
          type="number"
          value={form.numAccidents}
          onChange={(e) =>
            set("numAccidents", e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <FormInput
          label="No. of Violations"
          type="number"
          value={form.numViolations}
          onChange={(e) =>
            set("numViolations", e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.buttonContainer}>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${styles.submitButton} ${isLoading ? styles.disabled : ""}`}
        >
          {isLoading ? "Saving..." : "Add Driver"}
        </button>
      </div>
    </div>
  );
};
