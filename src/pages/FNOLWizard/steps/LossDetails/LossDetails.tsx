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
  // const [lossAddress, setLossAddress] = useState<Address>(emptyAddress);
  const { fnolFormData, setFnolFormData } = useFNOLContext();
  // const [causeOfLoss, setCauseOfLoss] = useState("");
  // const [vehicleInvolved, setVehicleInvolved] = useState("2021 Honda Accord");

  // const [locationType, setLocationType] = useState<string>("");
  // const [showPrimaryLocation, setshowPrimaryLocation] = useState(false);
  // const [showCustomLocation, setShowCustomLocation] = useState(false);
  // const [selectedLocationType, setSelectedLocationType] = useState("");
  const [policyDetails, setPolicyDetails] = useState<any>(null);
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
    const fetchData = async () => {
      try {
        const res = await getPolicyById(policyId || "");
        const data = res.data;

        console.log("policy details fetched:", data);

        // optionally preload FNOL data
        // setFnolFormData((prev) => ({
        //   ...prev,
        //   policyNumber: data?.policyNumber,
        // }));
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };

    if (policyId) fetchData();
  }, []);

  useEffect(() => {
    console.log("FNOL UPDATED:", fnolFormData);
  }, [fnolFormData]);

  // const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedLocationType(value);
  // };

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

            <select
              value={fnolFormData.causeOfLoss || ""}
              onChange={(e) => updateField("causeOfLoss", e.target.value)}
            >
              <option value="">Select cause...</option>

              <option value="Fire">Fire</option>

              <option value="Accident">Accident</option>

              <option value="Vandalism">Vandalism</option>

              <option value="Weather-related damage">
                Weather-related damage
              </option>

              <option value="Flood">Flood</option>

              <option value="Theft">Theft</option>
            </select>
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
