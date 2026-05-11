import React, { useState } from "react";
import { useIntl } from "react-intl";
import FormInput from "../../../components/common/FormInput/FormInput";
import Button from "../../../components/common/Button/Button";
import { PERSONAL_AUTO_MESSAGES } from "../PersonalAutoWizard.messages";
import styles from "../PersonalAutoWizard.module.scss";

export interface DriverRecord {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseState: string;
  yearsOfExperience: number;
}

const emptyDriver = (): DriverRecord => ({
  id: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  licenseNumber: "",
  licenseState: "",
  yearsOfExperience: 0,
});

const generateId = () =>
  `drv_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

interface Props {
  drivers: DriverRecord[];
  onChange: (drivers: DriverRecord[]) => void;
}

const DriverInformationStep: React.FC<Props> = ({ drivers, onChange }) => {
  const intl = useIntl();
  const t = (msg: { id: string; defaultMessage: string }) =>
    intl.formatMessage(msg);

  const [draft, setDraft] = useState<DriverRecord>(emptyDriver());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleField =
    (key: keyof DriverRecord) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v =
        key === "yearsOfExperience" ? Number(e.target.value) : e.target.value;
      setDraft((prev) => ({ ...prev, [key]: v as never }));
    };

  const startCreate = () => {
    setDraft(emptyDriver());
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (d: DriverRecord) => {
    setDraft({ ...d });
    setEditingId(d.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!draft.firstName || !draft.lastName) return;
    if (editingId) {
      onChange(
        drivers.map((d) =>
          d.id === editingId ? { ...draft, id: editingId } : d,
        ),
      );
    } else {
      onChange([...drivers, { ...draft, id: generateId() }]);
    }
    setShowForm(false);
    setDraft(emptyDriver());
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onChange(drivers.filter((d) => d.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setDraft(emptyDriver());
    setEditingId(null);
  };

  const dash = t(PERSONAL_AUTO_MESSAGES.emptyValue);

  return (
    <div>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>
          {t(PERSONAL_AUTO_MESSAGES.stepDriverInformation)}
        </h2>
        <p className={styles.stepSubtitle}>
          {t(PERSONAL_AUTO_MESSAGES.driverStepSubtitle)}
        </p>
      </div>

      {drivers.length === 0 && !showForm && (
        <div className={styles.empty}>
          {t(PERSONAL_AUTO_MESSAGES.driverEmpty)}
        </div>
      )}

      {drivers.length > 0 && (
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t(PERSONAL_AUTO_MESSAGES.driverColName)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.driverColDob)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.driverColLicenseNumber)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.driverColLicenseState)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.driverColYearsExp)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.actions)}</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id}>
                <td>
                  {d.firstName} {d.lastName}
                </td>
                <td>{d.dateOfBirth || dash}</td>
                <td>{d.licenseNumber || dash}</td>
                <td>{d.licenseState || dash}</td>
                <td>{d.yearsOfExperience}</td>
                <td>
                  <div className={styles.tableActions}>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => startEdit(d)}
                    >
                      {t(PERSONAL_AUTO_MESSAGES.edit)}
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleDelete(d.id)}
                    >
                      {t(PERSONAL_AUTO_MESSAGES.delete)}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!showForm && (
        <div className={styles.actionRow}>
          <Button variant="primary" onClick={startCreate}>
            {t(PERSONAL_AUTO_MESSAGES.addDriver)}
          </Button>
        </div>
      )}

      {showForm && (
        <>
          <h3 className={styles.subSectionTitle}>
            {editingId
              ? t(PERSONAL_AUTO_MESSAGES.editDriverTitle)
              : t(PERSONAL_AUTO_MESSAGES.addDriverTitle)}
          </h3>
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
              label={t(PERSONAL_AUTO_MESSAGES.licenseNumberLabel)}
              value={draft.licenseNumber}
              onChange={handleField("licenseNumber")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.licenseStateLabel)}
              value={draft.licenseState}
              onChange={handleField("licenseState")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.yearsOfExperienceLabel)}
              type="number"
              value={String(draft.yearsOfExperience)}
              onChange={handleField("yearsOfExperience")}
            />
          </div>
          <div className={styles.actionRow}>
            <Button variant="primary" onClick={handleSave}>
              {editingId
                ? t(PERSONAL_AUTO_MESSAGES.update)
                : t(PERSONAL_AUTO_MESSAGES.save)}
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              {t(PERSONAL_AUTO_MESSAGES.cancel)}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverInformationStep;
