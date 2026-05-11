import React, { useState } from "react";
import { Driver as DriverType } from "../../api/services/job/types";
import { Contact } from "../../api/services/account/types/Contact";
import { addDriverToJob } from "../../api/services/job/jobApi";
import { FormInput } from "../common";
import styles from "./DriverComponent.module.scss";

type DriverProps = {
  value?: DriverType;
};

type DriverFormState = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  licenseNumber: string;
  licenseState: string;
  yearsOfExperience: number | "";
  numberOfAccidents: number | "";
  numberOfViolations: number | "";
  violations: string[];
};

const initialFormState: DriverFormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  licenseNumber: "",
  licenseState: "",
  yearsOfExperience: "",
  numberOfAccidents: "",
  numberOfViolations: "",
  violations: [],
};

export const DriverComponent: React.FC<DriverProps> = ({ value }) => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [driverInfo, setDriverInfo] =
    useState<DriverFormState>(initialFormState);

  const handleChange = (
    field: keyof DriverFormState,
    value: string | number | Date,
  ) => {
    setDriverInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload: Partial<DriverType> = {
      person: {
        firstName: driverInfo.firstName,
        lastName: driverInfo.lastName,
        dateOfBirth: driverInfo.dateOfBirth
          ? driverInfo.dateOfBirth.toISOString().split("T")[0]
          : "",
        type: { code: "person", name: "Person" },
        roles: [{ code: "driver", name: "Driver" }],
      } as Contact,
      licenseNumber: driverInfo.licenseNumber,
      licenseState: driverInfo.licenseState,
      licenseStatus: "Valid",
      licenseYear:
        driverInfo.yearsOfExperience === ""
          ? undefined
          : driverInfo.yearsOfExperience,
      yearsOfExperience:
        driverInfo.yearsOfExperience === ""
          ? undefined
          : driverInfo.yearsOfExperience,
      numAccidents:
        driverInfo.numberOfAccidents === ""
          ? undefined
          : driverInfo.numberOfAccidents,
      numViolations:
        driverInfo.numberOfViolations === ""
          ? undefined
          : driverInfo.numberOfViolations,
      violations: driverInfo.violations,
    };

    try {
      const { data } = await addDriverToJob(
        "pc:437d8b43",
        payload as DriverType,
      );
      console.log("Driver Saved:", data);
      setDriverInfo(initialFormState);
    } catch (error) {
      console.error("Error saving driver:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Driver Information</h2>

        <div className={styles.grid}>
          <FormInput
            label="First Name"
            value={driverInfo.firstName}
            disabled={isReadOnly}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <FormInput
            label="Last Name"
            value={driverInfo.lastName}
            disabled={isReadOnly}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />

          <FormInput
            label="Date Of Birth"
            type="date"
            value={
              driverInfo.dateOfBirth
                ? driverInfo.dateOfBirth.toISOString().split("T")[0]
                : ""
            }
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("dateOfBirth", new Date(e.target.value))
            }
          />

          <FormInput
            label="License Number"
            value={driverInfo.licenseNumber}
            disabled={isReadOnly}
            onChange={(e) => handleChange("licenseNumber", e.target.value)}
          />

          <FormInput
            label="License State"
            type="select"
            value={driverInfo.licenseState}
            disabled={isReadOnly}
            onChange={(e) => handleChange("licenseState", e.target.value)}
          />

          <FormInput
            label="Years of Experience"
            type="number"
            value={driverInfo.yearsOfExperience}
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("yearsOfExperience", Number(e.target.value))
            }
          />

          <FormInput
            label="No. of Accidents"
            type="number"
            value={driverInfo.numberOfAccidents}
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("numberOfAccidents", Number(e.target.value))
            }
          />

          <FormInput
            label="No. of Violations"
            type="number"
            value={driverInfo.numberOfViolations}
            disabled={isReadOnly}
            onChange={(e) =>
              handleChange("numberOfViolations", Number(e.target.value))
            }
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleSubmit}
            disabled={isReadOnly || isLoading}
            className={`${styles.submitButton} ${isReadOnly || isLoading ? styles.disabled : ""}`}
          >
            {isLoading ? "Saving..." : "ADD DRIVER"}
          </button>
        </div>
      </div>
    </div>
  );
};
