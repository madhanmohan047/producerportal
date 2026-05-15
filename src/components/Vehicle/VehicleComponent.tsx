import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { usePAWizard } from "../../context/PAWizardContext";
import messages from "./VehicleComponent.messages";
import FormInput from "../common/FormInput/FormInput";
import Combobox, { ComboboxOption } from "../common/Combobox/Combobox";
import AddressComponent from "../AddressComponent/AddressComponent";
import { Address } from "../../api/services/account/types/Address";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { addVehicleToJob } from "../../api/services/job/jobApi";
import { DEFAULT_JOB_ID, DEFAULT_COUNTRY } from "../../constants";
import { getTypeList } from "../../api/services/typelist/typelistApi";
import { TypeList } from "../../api/utils/types";
import styles from "./VehicleComponent.module.scss";

type VehicleEntry = {
  localId: string;
  apiId?: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  licensePlate: string;
  annualMileage: number;
  costNew: number;
  bodyType: ComboboxOption | undefined;
  licenseState: ComboboxOption | undefined;
  garageLocation: Address;
};

const emptyAddress = (): Address =>
  ({
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postalCode: "",
    state: { code: "", name: "" },
    country: DEFAULT_COUNTRY,
    addressType: { code: "", name: "" },
  }) as Address;

const emptyVehicleForm = (): Omit<VehicleEntry, "localId"> => ({
  make: "",
  model: "",
  year: 0,
  vin: "",
  color: "",
  licensePlate: "",
  annualMileage: 0,
  costNew: 0,
  bodyType: undefined,
  licenseState: undefined,
  garageLocation: emptyAddress(),
});

const VehicleComponent: React.FC = () => {
  const intl = useIntl();
  const { setVehicleCount } = usePAWizard();

  const [vehicles, setVehicles] = useState<VehicleEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyVehicleForm());
  const [saving, setSaving] = useState(false);
  const [bodyTypes, setBodyTypes] = useState<TypeList[]>([]);
  const [states, setStates] = useState<TypeList[]>([]);

  useEffect(() => {
    getTypeList("BodyType").then((response) => setBodyTypes(response.data));
    getTypeList("State").then((response) => setStates(response.data));
  }, []);

  useEffect(() => {
    setVehicleCount(vehicles.length);
  }, [vehicles, setVehicleCount]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyVehicleForm());
    setModalOpen(true);
  };

  const openEditModal = (vehicle: VehicleEntry) => {
    setEditingId(vehicle.localId);
    setForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      vin: vehicle.vin,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      annualMileage: vehicle.annualMileage,
      costNew: vehicle.costNew,
      bodyType: vehicle.bodyType,
      licenseState: vehicle.licenseState,
      garageLocation: vehicle.garageLocation,
    });
    setModalOpen(true);
  };

  const handleDelete = (localId: string) => {
    setVehicles((prev) => prev.filter((v) => v.localId !== localId));
  };

  const handleSave = async () => {
    setSaving(true);
    let apiId: string | undefined;

    try {
      if (!editingId) {
        const payload: Vehicle = {
          make: form.make,
          model: form.model,
          year: form.year,
          vin: form.vin,
          color: form.color,
          licensePlate: form.licensePlate,
          annualMileage: form.annualMileage,
          costNew: form.costNew,
          bodyType: form.bodyType ?? { code: "", name: "" },
          licenseState: form.licenseState ?? { code: "", name: "" },
          garageLocation: form.garageLocation,
          vehicleDrivers: [],
        };
        const { data } = await addVehicleToJob(DEFAULT_JOB_ID, payload);
        apiId = data._id;
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
    } finally {
      setSaving(false);
    }

    if (editingId) {
      setVehicles((prev) =>
        prev.map((v) => (v.localId === editingId ? { ...v, ...form } : v)),
      );
    } else {
      setVehicles((prev) => [
        ...prev,
        { localId: Date.now().toString(), apiId, ...form },
      ]);
    }

    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {intl.formatMessage(messages.title)}
      </h2>
      <p className={styles.subtitle}>List all vehicles covered under this policy.</p>

      <div className={styles.vehicleList}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.localId} className={styles.vehicleCard}>
            <div className={styles.cardHeader}>
              <span className={styles.vehicleTitle}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => openEditModal(vehicle)}
                >
                  ✎ Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(vehicle.localId)}
                  title="Remove vehicle"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.cardFields}>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(messages.vin)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={vehicle.vin}
                  readOnly
                  placeholder="—"
                />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(messages.licensePlate)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={vehicle.licensePlate}
                  readOnly
                  placeholder="—"
                />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  {intl.formatMessage(messages.bodyType)}
                </span>
                <input
                  className={styles.fieldInput}
                  value={vehicle.bodyType?.name ?? ""}
                  readOnly
                  placeholder="—"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addVehicleBtn} onClick={openAddModal}>
        + Add Another Vehicle
      </button>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? "Edit Vehicle" : "Add Vehicle"}</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <FormInput
                  label={intl.formatMessage(messages.make)}
                  placeholder={intl.formatMessage(messages.make)}
                  value={form.make}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, make: e.target.value }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.model)}
                  placeholder={intl.formatMessage(messages.model)}
                  value={form.model}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, model: e.target.value }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.year)}
                  placeholder={intl.formatMessage(messages.year)}
                  value={form.year || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      year: parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.costnew)}
                  placeholder={intl.formatMessage(messages.costnew)}
                  value={form.costNew || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      costNew: parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.vin)}
                  placeholder={intl.formatMessage(messages.vin)}
                  value={form.vin}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, vin: e.target.value }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.color)}
                  placeholder={intl.formatMessage(messages.color)}
                  value={form.color}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, color: e.target.value }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.licensePlate)}
                  placeholder={intl.formatMessage(messages.licensePlate)}
                  value={form.licensePlate}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      licensePlate: e.target.value,
                    }))
                  }
                />
                <FormInput
                  label={intl.formatMessage(messages.annualMileage)}
                  placeholder={intl.formatMessage(messages.annualMileage)}
                  value={form.annualMileage || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      annualMileage: parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <Combobox
                  label={intl.formatMessage(messages.bodyType)}
                  options={bodyTypes}
                  value={form.bodyType}
                  onChange={(opt) =>
                    setForm((prev) => ({ ...prev, bodyType: opt }))
                  }
                  required
                />
                <Combobox
                  label={intl.formatMessage(messages.licenseState)}
                  options={states}
                  value={form.licenseState}
                  onChange={(opt) =>
                    setForm((prev) => ({ ...prev, licenseState: opt }))
                  }
                />
              </div>

              <div className={styles.addressSection}>
                <span className={styles.addressLabel}>
                  {intl.formatMessage(messages.garageLocation)}
                </span>
                <AddressComponent
                  readOnly={false}
                  address={form.garageLocation}
                  onAddressChange={(updated) =>
                    setForm((prev) => ({ ...prev, garageLocation: updated }))
                  }
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : intl.formatMessage(messages.submit)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleComponent;
