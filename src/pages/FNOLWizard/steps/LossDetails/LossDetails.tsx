import React, { useState, useEffect } from "react";
// import AddressSection from "../../components/AddressComponent/AddressComponent";
// import { Address } from "../../api/services";
import { useLocation } from "react-router-dom";
import { Address } from "../../../../api/services";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";
import { getPolicyById } from "../../../../api/services/policy/policyApi";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";

// import YesNoToggle from "../../components/common/YesNoToggle/YesNoToggle";
// import WizardPage from "../../components/Wizard/WizardPage/Wizardpage";
// import { WizardPageProps } from "../../types/Wizardtype";
import styles from "../LossDetails/LossDetails.module.scss";
import AddressSection from "../../../../components/AddressComponent/AddressComponent";
import YesNoToggle from "../../../../components/common/YesNoToggle/YesNoToggle";
import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import { TypeList } from "../../../../api/utils/types";
import Combobox, {
  ComboboxOption,
} from "../../../../components/common/Combobox/Combobox";
// import { getPolicyById } from "../../api/services/policy/policyApi";
// import { useFNOLContext } from "../FNOLWizard/FNOLWizardContext";

const emptyAddress: Address = {
  _id: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  county: "",
  state: { code: "", name: "" },
  postalCode: "",
  country: { code: "", name: "" },
  addressType: { code: "", name: "" },
};

export const LossDetails = (wizardPageProps: WizardPageProps) => {
  const { fnolFormData, setFnolFormData } = useFNOLContext();

  const [policyDetails, setPolicyDetails] = useState<any>(null);
  // const [losscause, setlosscause] = useState<TypeList[]>([]);
  const [losscause, setlosscause] = useState<ComboboxOption[]>([]);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const policyId = params.get("id");

  const updateField = (key: string, value: any) => {
    setFnolFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    getTypeList("LossCause").then((response) => {
      setlosscause(response);
    });
  }, []);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div className={styles["loss-details-page"]}>
        {/* HEADER */}
        <div className={styles["loss-header"]}>
          <h1>Loss Details</h1>

          <p>
            Provide a detailed account of the incident and the location of the
            loss.
          </p>
        </div>

        {/* FORM */}
        <div className={styles["loss-form-grid"]}>
          {/* Cause of Loss */}
          <div className={styles["field-group"]}>
            <label>
              Cause of Loss <span>*</span>
            </label>

            <Combobox
              label={"Loss Cause"}
              required
              options={losscause}
              value={losscause.find(
                (selectedCause) =>
                  selectedCause.code === fnolFormData.causeOfLoss,
              )}
              onChange={(option) => {
                setFnolFormData((prev) => ({
                  ...prev,
                  causeOfLoss: option.code,
                }));
              }}
              disabled={false}
            />
          </div>

          {/* Vehicle Involved */}
          <div className={styles["field-group"]}>
            <label>
              Vehicle Involved <span>*</span>
            </label>

            <input
              type="text"
              value={fnolFormData.vehicleInvolved || ""}
              onChange={(e) => updateField("vehicleInvolved", e.target.value)}
            />
          </div>

          {/* Loss Location */}
          <div className={styles["field-group-full-width"]}>
            <label>
              Loss Location <span>*</span>
            </label>

            <select
              value={fnolFormData.locationType || ""}
              onChange={(e) => updateField("locationType", e.target.value)}
            >
              <option value="Read Only">
                Enter address or intersection...
              </option>

              <option value="Primary Location">Primary Location</option>

              <option value="Garage Location">Garage Location</option>

              <option value="Add New Location">Add New Location</option>
            </select>
          </div>
          {fnolFormData.locationType === "Primary Location" && (
            <div className={styles["full-width"]}>
              <span className={styles["primary-address-value"]}>
                {policyDetails?.primaryAddress || "Primary Location Address"}
              </span>
            </div>
          )}

          {fnolFormData.locationType === "Garage Location" && (
            <div className={styles["full-width"]}>
              <span className={styles["primary-address-value"]}>
                {policyDetails?.garageAddress || "Garage Location Address"}
              </span>
            </div>
          )}

          {fnolFormData.locationType === "Add New Location" && (
            <div className={styles["full-width"]}>
              <AddressSection
                readOnly={false}
                address={fnolFormData.lossAddress || emptyAddress}
                onAddressChange={(addr) => updateField("lossAddress", addr)}
              />
            </div>
          )}
        </div>

        {/* TOGGLES */}
        <div className={styles["radio-section"]}>
          <div className={styles["radio-group"]}>
            <p>Was anyone injured?</p>

            <YesNoToggle
              value={fnolFormData.injured ?? undefined}
              onChange={(val: boolean) => updateField("injured", val)}
            />
          </div>

          <div className={styles["radio-group"]}>
            <p>Police report filed?</p>

            <YesNoToggle
              value={fnolFormData.policeReport ?? undefined}
              onChange={(val: boolean) => updateField("policeReport", val)}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={styles["description-section"]}>
          <label>
            Detailed Description <span>*</span>
          </label>

          <textarea
            value={fnolFormData.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe exactly what happened..."
          />
        </div>
      </div>
    </WizardPage>
  );
};
