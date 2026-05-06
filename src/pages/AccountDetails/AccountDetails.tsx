import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccountById } from "./../../api/services";
import styles from "./AccountDetails.module.scss";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState<any>(null);

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
                {accountDetails?.accountHolderId?.firstName || ""}{" "}
                {accountDetails?.accountHolderId?.lastName || ""}
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

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Status
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.status?.name || ""}
              </span>
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
            <div className={styles["policies"]}>
              <h3>Policies</h3>
              <div className={styles["policy-card"]}>
                <h4>Policy 1</h4>
              </div>
            </div>

            <div className={styles["jobs"]}>
              <h3>Jobs</h3>
              <div className={styles["job-card"]}>
                <h4>Job 1</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
