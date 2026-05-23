import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Address } from "../../../../api/services";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";
import { getPolicyById } from "../../../../api/services/policy/policyApi";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import AddressSection from "../../../../components/AddressComponent/AddressComponent";
import YesNoToggle from "../../../../components/common/YesNoToggle/YesNoToggle";
import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import { TypeList } from "../../../../api/utils/types";
import Combobox, {
  ComboboxOption,
} from "../../../../components/common/Combobox/Combobox";
// import { getPolicyById } from "../../api/services/policy/policyApi";
// import { useFNOLContext } from "../FNOLWizard/FNOLWizardContext";
import styles from "../LossDetails/LossDetails.module.scss";

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
  const [losscause, setlosscause] = useState<ComboboxOption[]>([]);
  const [vehiclesInvolved, setVehiclesInvolved] = useState<ComboboxOption[]>(
    [],
  );

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const policyId = params.get("id");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [tempAddress, setTempAddress] = useState<Address>(emptyAddress);

  const updateField = useCallback(
    (key: string, value: any) => {
      setFnolFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
      console.log("updatedfnol", fnolFormData);
    },
    [setFnolFormData],
  );

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setFnolFormData((prev) => ({
      ...prev,
      currentClaim: {
        ...prev.currentClaim,
        lossLocation: value,
      },
    }));

    if (value === "Add New Location") {
      setShowAddressModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);

    // clear modal fields
    setTempAddress(emptyAddress);
  };

  const handleSaveAddress = () => {
    updateField("lossAddress", tempAddress);

    setShowAddressModal(false);

    // clear modal after save
    setTempAddress(emptyAddress);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getPolicyById(policyId || "");
  //       const data = res.data;
  //       // console.log("policy details fetched:", data);
  //     } catch (error) {
  //       console.error("Error fetching policy:", error);
  //     }
  //   };

  //   if (policyId) fetchData();
  // }, []);

  useEffect(() => {
    console.log("newfnol", fnolFormData);

    getTypeList("LossCause").then((response) => {
      console.log("LossCause response", response);

      setlosscause(Array.isArray(response) ? response : response.data || []);
    });

    setVehiclesInvolved(
      fnolFormData?.vehicleInvolved?.map((vehicle) => ({
        code: vehicle._id || "",
        name: `${vehicle.make} ${vehicle.model}`,
      })) || [],
    );
  }, []);

  useEffect(() => {
    if (!policyId) return;

    const fetchPolicyDetails = async () => {
      try {
        const res = await getPolicyById(policyId);

        setPolicyDetails(res.data);
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };

    fetchPolicyDetails();
  }, [policyId]);

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
              value={(Array.isArray(losscause) ? losscause : []).find(
                (selectedCause) =>
                  selectedCause.code === fnolFormData.causeOfLoss,
              )}
              onChange={(option) => {
                setFnolFormData((prev) => ({
                  ...prev,
                  currentClaim: {
                    ...prev.currentClaim,
                    lossCause: {
                      code: option.code,
                      name: option.name,
                    },
                  },
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
            {/* <input
              type="text"
              value={fnolFormData.vehicleInvolved || ""}
              onChange={(e) => updateField("vehicleInvolved", e.target.value)}
            /> */}
            <Combobox
              label={"Loss Cause"}
              required
              options={vehiclesInvolved}
              value={vehiclesInvolved.find(
                (selectedCause) =>
                  selectedCause.code === fnolFormData.selectedVehicle,
              )}
              onChange={(option) => {
                setFnolFormData((prev) => ({
                  ...prev,
                  selectedVehicle: option.code,
                  currentClaim: {
                    ...prev.currentClaim,
                    vehicleInvolved: option.code,
                  },
                }));
              }}
              disabled={false}
            />{" "}
          </div>

          {/* Loss Location */}
          <div className={styles["field-group-full-width"]}>
            <label>
              Loss Location <span>*</span>
            </label>

            <select
              value={fnolFormData.locationType || ""}
              onChange={handleLocationChange}
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

          {fnolFormData.locationType === "Add New Location" &&
            fnolFormData.lossAddress && (
              <div className={styles["full-width"]}>
                <div className={styles["saved-address-preview"]}>
                  <h4 className={styles["saved-address-title"]}>New Address</h4>

                  <p>{fnolFormData.lossAddress.addressLine1}</p>

                  {fnolFormData.lossAddress.addressLine2 && (
                    <p>{fnolFormData.lossAddress.addressLine2}</p>
                  )}

                  <p>
                    {fnolFormData.lossAddress.city},{" "}
                    {fnolFormData.lossAddress.state?.name}{" "}
                    {fnolFormData.lossAddress.postalCode}
                  </p>

                  <p>{fnolFormData.lossAddress.country?.name}</p>
                </div>
              </div>
            )}
        </div>

        {/* TOGGLES */}
        <div className={styles["radio-section"]}>
          <div className={styles["radio-group"]}>
            <p>Was anyone injured?</p>

            <YesNoToggle
              value={fnolFormData.currentClaim?.isInjured ?? undefined}
              onChange={(val: boolean) =>
                setFnolFormData((prev) => ({
                  ...prev,
                  injured: val,
                  currentClaim: {
                    ...prev.currentClaim,
                    isInjured: val,
                  },
                }))
              }
            />
          </div>

          <div className={styles["radio-group"]}>
            <p>Police report filed?</p>

            <YesNoToggle
              value={fnolFormData.currentClaim?.isReported ?? undefined}
              onChange={(val: boolean) =>
                setFnolFormData((prev) => ({
                  ...prev,
                  currentClaim: {
                    ...prev.currentClaim,
                    isReported: val,
                  },
                }))
              }
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={styles["description-section"]}>
          <label>
            Detailed Description <span>*</span>
          </label>

          <textarea
            value={fnolFormData.currentClaim?.lossDescription || ""}
            onChange={(e) =>
              setFnolFormData((prev) => ({
                ...prev,
                currentClaim: {
                  ...prev.currentClaim,
                  lossDescription: e.target.value,
                },
              }))
            }
            placeholder="Describe exactly what happened..."
          />
        </div>
      </div>
      {showAddressModal && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-container"]}>
            <div className={styles["modal-header"]}>
              <h2>Add New Loss Location</h2>

              <button
                type="button"
                onClick={handleCloseModal}
                className={styles["close-button"]}
              >
                ✕
              </button>
            </div>

            <div className={styles["modal-body"]}>
              <AddressSection
                readOnly={false}
                address={tempAddress}
                onAddressChange={(addr) => setTempAddress(addr)}
              />
            </div>

            <div className={styles["modal-footer"]}>
              <button
                type="button"
                className={styles["save-button"]}
                onClick={handleSaveAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </WizardPage>
  );
};
