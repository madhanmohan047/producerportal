import React, { useState } from "react";
import { useIntl } from "react-intl";
import FormInput from "../../../components/common/FormInput/FormInput";
import Button from "../../../components/common/Button/Button";
import { PERSONAL_AUTO_MESSAGES } from "../PersonalAutoWizard.messages";
import styles from "../PersonalAutoWizard.module.scss";

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
}

export const emptyPersonalInfo: PersonalInformation = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  postalCode: "",
};

interface Props {
  value: PersonalInformation;
  onChange: (value: PersonalInformation) => void;
}

const PersonalInformationStep: React.FC<Props> = ({ value, onChange }) => {
  const intl = useIntl();
  const t = (msg: { id: string; defaultMessage: string }) =>
    intl.formatMessage(msg);

  const [draft, setDraft] = useState<PersonalInformation>(value);
  const [isSaved, setIsSaved] = useState<boolean>(
    Object.values(value).some(Boolean),
  );
  const [isEditing, setIsEditing] = useState<boolean>(!isSaved);

  const handleField =
    (key: keyof PersonalInformation) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    onChange(draft);
    setIsSaved(true);
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleDelete = () => {
    setDraft(emptyPersonalInfo);
    onChange(emptyPersonalInfo);
    setIsSaved(false);
    setIsEditing(true);
  };

  const handleClear = () => setDraft(emptyPersonalInfo);

  if (isSaved && !isEditing) {
    const rows: Array<[string, string]> = [
      [t(PERSONAL_AUTO_MESSAGES.firstNameLabel), value.firstName],
      [t(PERSONAL_AUTO_MESSAGES.lastNameLabel), value.lastName],
      [t(PERSONAL_AUTO_MESSAGES.dateOfBirthLabel), value.dateOfBirth],
      [t(PERSONAL_AUTO_MESSAGES.emailLabel), value.email],
      [t(PERSONAL_AUTO_MESSAGES.phoneLabel), value.phone],
      [t(PERSONAL_AUTO_MESSAGES.addressLine1Label), value.addressLine1],
      [t(PERSONAL_AUTO_MESSAGES.cityLabel), value.city],
      [t(PERSONAL_AUTO_MESSAGES.stateLabel), value.state],
      [t(PERSONAL_AUTO_MESSAGES.postalCodeLabel), value.postalCode],
    ];

    return (
      <div>
        <div className={styles.stepHeader}>
          <h2 className={styles.stepTitle}>
            {t(PERSONAL_AUTO_MESSAGES.stepPersonalInformation)}
          </h2>
          <p className={styles.stepSubtitle}>
            {t(PERSONAL_AUTO_MESSAGES.personalSavedSubtitle)}
          </p>
        </div>

        <div className={styles.savedCard}>
          <h3 className={styles.savedTitle}>
            {t(PERSONAL_AUTO_MESSAGES.personalSavedTitle)}
          </h3>
          {rows.map(([label, val]) => (
            <div key={label} className={styles.savedRow}>
              <span className={styles.savedLabel}>{label}:</span>
              <span className={styles.savedValue}>
                {val || t(PERSONAL_AUTO_MESSAGES.emptyValue)}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.actionRow}>
          <Button variant="primary" onClick={handleEdit}>
            {t(PERSONAL_AUTO_MESSAGES.edit)}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t(PERSONAL_AUTO_MESSAGES.delete)}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>
          {t(PERSONAL_AUTO_MESSAGES.stepPersonalInformation)}
        </h2>
        <p className={styles.stepSubtitle}>
          {t(PERSONAL_AUTO_MESSAGES.personalEditSubtitle)}
        </p>
      </div>

      <div className={styles.formGrid}>
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.firstNameLabel)}
          required
          value={draft.firstName}
          onChange={handleField("firstName")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.lastNameLabel)}
          required
          value={draft.lastName}
          onChange={handleField("lastName")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.dateOfBirthLabel)}
          type="date"
          value={draft.dateOfBirth}
          onChange={handleField("dateOfBirth")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.emailLabel)}
          type="email"
          value={draft.email}
          onChange={handleField("email")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.phoneLabel)}
          value={draft.phone}
          onChange={handleField("phone")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.addressLine1Label)}
          value={draft.addressLine1}
          onChange={handleField("addressLine1")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.cityLabel)}
          value={draft.city}
          onChange={handleField("city")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.stateLabel)}
          value={draft.state}
          onChange={handleField("state")}
        />
        <FormInput
          label={t(PERSONAL_AUTO_MESSAGES.postalCodeLabel)}
          value={draft.postalCode}
          onChange={handleField("postalCode")}
        />
      </div>

      <div className={styles.actionRow}>
        <Button variant="primary" onClick={handleSave}>
          {isSaved
            ? t(PERSONAL_AUTO_MESSAGES.update)
            : t(PERSONAL_AUTO_MESSAGES.save)}
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          {t(PERSONAL_AUTO_MESSAGES.clear)}
        </Button>
        {isSaved && (
          <Button variant="danger" onClick={handleDelete}>
            {t(PERSONAL_AUTO_MESSAGES.delete)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationStep;
