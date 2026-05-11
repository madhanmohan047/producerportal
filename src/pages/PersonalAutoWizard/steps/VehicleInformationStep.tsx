import React, { useState } from "react";
import { useIntl } from "react-intl";
import FormInput from "../../../components/common/FormInput/FormInput";
import Button from "../../../components/common/Button/Button";
import { PERSONAL_AUTO_MESSAGES } from "../PersonalAutoWizard.messages";
import styles from "../PersonalAutoWizard.module.scss";

export interface VehicleRecord {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  color: string;
  costNew: number;
}

const emptyVehicle = (): VehicleRecord => ({
  id: "",
  vin: "",
  year: new Date().getFullYear(),
  make: "",
  model: "",
  color: "",
  costNew: 0,
});

const generateId = () =>
  `veh_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

interface Props {
  vehicles: VehicleRecord[];
  onChange: (vehicles: VehicleRecord[]) => void;
}

const VehicleInformationStep: React.FC<Props> = ({ vehicles, onChange }) => {
  const intl = useIntl();
  const t = (msg: { id: string; defaultMessage: string }) =>
    intl.formatMessage(msg);

  const [draft, setDraft] = useState<VehicleRecord>(emptyVehicle());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleField =
    (key: keyof VehicleRecord) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isNum = key === "year" || key === "costNew";
      setDraft((prev) => ({
        ...prev,
        [key]: (isNum ? Number(e.target.value) : e.target.value) as never,
      }));
    };

  const startCreate = () => {
    setDraft(emptyVehicle());
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (v: VehicleRecord) => {
    setDraft({ ...v });
    setEditingId(v.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!draft.make || !draft.model) return;
    if (editingId) {
      onChange(
        vehicles.map((v) =>
          v.id === editingId ? { ...draft, id: editingId } : v,
        ),
      );
    } else {
      onChange([...vehicles, { ...draft, id: generateId() }]);
    }
    setShowForm(false);
    setDraft(emptyVehicle());
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onChange(vehicles.filter((v) => v.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setDraft(emptyVehicle());
    setEditingId(null);
  };

  const dash = t(PERSONAL_AUTO_MESSAGES.emptyValue);

  return (
    <div>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>
          {t(PERSONAL_AUTO_MESSAGES.stepVehicleInformation)}
        </h2>
        <p className={styles.stepSubtitle}>
          {t(PERSONAL_AUTO_MESSAGES.vehicleStepSubtitle)}
        </p>
      </div>

      {vehicles.length === 0 && !showForm && (
        <div className={styles.empty}>
          {t(PERSONAL_AUTO_MESSAGES.vehicleEmpty)}
        </div>
      )}

      {vehicles.length > 0 && (
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>{t(PERSONAL_AUTO_MESSAGES.vehicleColYear)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.vehicleColMakeModel)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.vehicleColVin)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.vehicleColColor)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.vehicleColCostNew)}</th>
              <th>{t(PERSONAL_AUTO_MESSAGES.actions)}</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.year}</td>
                <td>
                  {v.make} {v.model}
                </td>
                <td>{v.vin || dash}</td>
                <td>{v.color || dash}</td>
                <td>
                  {v.costNew ? `$${v.costNew.toLocaleString()}` : dash}
                </td>
                <td>
                  <div className={styles.tableActions}>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => startEdit(v)}
                    >
                      {t(PERSONAL_AUTO_MESSAGES.edit)}
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => handleDelete(v.id)}
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
            {t(PERSONAL_AUTO_MESSAGES.addVehicle)}
          </Button>
        </div>
      )}

      {showForm && (
        <>
          <h3 className={styles.subSectionTitle}>
            {editingId
              ? t(PERSONAL_AUTO_MESSAGES.editVehicleTitle)
              : t(PERSONAL_AUTO_MESSAGES.addVehicleTitle)}
          </h3>
          <div className={styles.formGrid}>
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.yearLabel)}
              type="number"
              value={String(draft.year)}
              onChange={handleField("year")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.makeLabel)}
              required
              value={draft.make}
              onChange={handleField("make")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.modelLabel)}
              required
              value={draft.model}
              onChange={handleField("model")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.vinLabel)}
              value={draft.vin}
              onChange={handleField("vin")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.colorLabel)}
              value={draft.color}
              onChange={handleField("color")}
            />
            <FormInput
              label={t(PERSONAL_AUTO_MESSAGES.costNewLabel)}
              type="number"
              value={String(draft.costNew)}
              onChange={handleField("costNew")}
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

export default VehicleInformationStep;
