import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccountById } from "./../../api/services";
import Combobox, {
  ComboboxOption,
} from "../../components/common/Combobox/Combobox";
import styles from "./AccountDetails.module.scss";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | string>(0);
  const [selectedJobId, setSelectedJobId] = useState<number | string>(0);
  const [selectedStatus, setSelectedStatus] = useState<number | string>(0);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const accountId = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAccountById(accountId || "");
        const data = res.data;
        setAccountDetails(data);
        console.log("Account details fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    if (accountId) fetchData();
  }, [accountId]);

  const loadPolicies = async (): Promise<ComboboxOption[]> => {
    const res = await fetch(`/api/accounts/${accountId}/policies`);
    const data = await res.json();
    return data.map((p: any) => ({ id: p.id, value: p.name }));
  };

  const loadJobs = async (): Promise<ComboboxOption[]> => {
    const res = await fetch(`/api/accounts/${accountId}/jobs`);
    const data = await res.json();

    return data.map((j: any) => ({
      id: j._id,
      value: `${j.jobNumber} - ${j.jobType?.name}`,
    }));
  };

  return (
    <div className={styles["account-details-page"]}>
      <div className={styles["account-details-card"]}>
        <div className={styles["card-header"]}>
          <button
            className={styles["back-button"]}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <h1 className={styles["account-details-title"]}>Account Details</h1>
        </div>

        <div className={styles["card-content"]}>
          <div className={styles["account-details-grid"]}>
            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Holder Name
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.accountHolder?.firstName || ""}{" "}
                {accountDetails?.accountHolder?.lastName || ""}
              </span>
            </div>

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Number
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.accountNumber || ""}
              </span>
            </div>

            {/* Account Status — driven by Combobox */}
            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Status
              </span>
              {/* <Combobox
                options={statusOptions}
                selectedId={selectedStatus}
                variant="primary"
                size="small"
                placeholder="--Select Status--"
                onOptionChange={(opt) => {
                  setSelectedStatus(opt.id);
                  console.log("Status changed:", opt);
                  // call your update API here if needed
                }}
              /> */}
            </div>

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Location
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.primaryLocation?.addressLine1 || ""}{" "}
                {accountDetails?.primaryLocation?.addressLine2 || ""}{" "}
                {accountDetails?.primaryLocation?.city || ""}{" "}
                {accountDetails?.primaryLocation?.state?.name || ""}{" "}
                {accountDetails?.primaryLocation?.zipCode || ""}
              </span>
            </div>

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Organization Type
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.organization || ""}
              </span>
            </div>

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Producer Code
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.producerCode || ""}
              </span>
            </div>
          </div>

          <div className={styles["related-entities"]}>
            {/* Policies */}
            <div className={styles["policies"]}>
              <h3>Policies</h3>
              {/* <Combobox
                label="Select Policy"
                loadOptions={loadPolicies}
                selectedId={selectedPolicyId}
                variant="primary"
                size="medium"
                fullWidth
                placeholder="--Select Policy--"
                onOptionChange={(opt) => {
                  setSelectedPolicyId(opt.id);
                  console.log("Policy selected:", opt);
                }}
              /> */}
              {selectedPolicyId !== 0 && (
                <div className={styles["policy-card"]}>
                  <h4>Policy ID: {selectedPolicyId}</h4>
                </div>
              )}
            </div>

            {/* Jobs */}
            <div className={styles["jobs"]}>
              <h3>Jobs</h3>
              {/* <Combobox
                label="Select Job"
                loadOptions={loadJobs}
                selectedId={selectedJobId}
                variant="secondary"
                size="medium"
                fullWidth
                placeholder="--Select Job--"
                onOptionChange={(opt) => {
                  setSelectedJobId(opt.id);
                  console.log("Job selected:", opt);
                }}
              /> */}
              {selectedJobId !== 0 && (
                <div className={styles["job-card"]}>
                  <h4>Job ID: {selectedJobId}</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
