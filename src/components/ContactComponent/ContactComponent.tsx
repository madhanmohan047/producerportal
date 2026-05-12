import React, { useState, useCallback } from "react";
import { Contact as ContactType } from "../../api/services/account/types";
import styles from "./ContactComponent.module.scss";

// Props for the Contact component
type ContactProps = {
  value?: ContactType;
  onValueChange: (value: any, path: string) => void;
  readOnly?: boolean;
};

export const ContactComponent = ({
  value,
  onValueChange,
  readOnly,
}: ContactProps) => {
  const [contactType, setContactType] = useState<String>(
    value?.type?.code || "",
  );
  const isPerson = contactType === "person";

  // Handler to toggle between "person" and "company" contact types
  const handleToggle = useCallback(
    (type: String) => {
      if (readOnly) return;
      setContactType(type);
      onValueChange(type, "contactType");
    },
    [readOnly, onValueChange],
  );

  // Handler for input changes, updates the corresponding field in the contact value
  const handleChange = useCallback(
    (path: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value, path);
    },
    [onValueChange],
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Toggle */}
        <div className={styles.toggle}>
          <button
            className={`${styles.button} ${
              contactType === "person" ? styles.active : ""
            }`}
            onClick={() => handleToggle("person")}
            disabled={readOnly}
          >
            Person
          </button>

          <button
            className={`${styles.button} ${
              contactType === "company" ? styles.active : ""
            }`}
            onClick={() => handleToggle("company")}
            disabled={readOnly}
          >
            Company
          </button>
        </div>

        <div className={styles.grid}>
          {/* PERSON */}
          {isPerson && (
            <>
              <div>
                <label>First Name</label>
                <input
                  value={value?.firstName ?? ""}
                  onChange={handleChange("firstName")}
                  disabled={readOnly}
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  value={value?.lastName ?? ""}
                  onChange={handleChange("lastName")}
                  disabled={readOnly}
                />
              </div>

              <div className={styles.fullWidth}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={value?.dateOfBirth?.toString()}
                  onChange={handleChange("dateOfBirth")}
                  disabled={readOnly}
                />
              </div>
            </>
          )}

          {/* COMPANY */}
          {!isPerson && (
            <div className={styles.fullWidth}>
              <label>Company Name</label>
              <input
                value={value?.companyName ?? ""}
                onChange={handleChange("companyName")}
                disabled={readOnly}
              />
            </div>
          )}

          <div className={styles.fullWidth}>
            <label>Email Address</label>
            <input
              value={value?.emailAddress ?? ""}
              onChange={handleChange("emailAddress")}
              disabled={readOnly}
            />
          </div>

          <div>
            <label>Work Phone</label>
            <input
              value={value?.workPhone ?? ""}
              onChange={handleChange("workPhone")}
              disabled={readOnly}
            />
          </div>

          <div>
            <label>Home Phone</label>
            <input
              value={value?.homePhone ?? ""}
              onChange={handleChange("homePhone")}
              disabled={readOnly}
            />
          </div>

          <div className={styles.fullWidth}>
            <label>Cell Phone</label>
            <input
              value={value?.cellPhone ?? ""}
              onChange={handleChange("cellPhone")}
              disabled={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
