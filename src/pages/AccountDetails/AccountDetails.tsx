import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountById } from "./../../api/services";
import styles from "./AccountDetails.module.scss";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>();
  const [accountDetails, setAccountDetails] = useState<any>(null);
  // const [policies, setPolicies] = useState<any[]>([]);
  // const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      //   try {
      //     const response = await getAccountById(accountId || "");
      //     .then((res) => res.data)
      //     .then((data) => {
      //       setAccountDetails(data);
      //       console.log('Account details fetched successfully:', accountDetails);

      //     });
      //     console.log('Fetched account details:', setAccountDetails);
      //   }
      //     catch (error) {
      //     console.error('Error fetching account:', error);
      //   }
      try {
        const res = await getAccountById("AC-77668852");
        const data = res.data;

        setAccountDetails(data);
        console.log("Account details fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchData();
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
                {accountDetails?.status || ""}
              </span>
            </div>

            <div className={styles["account-details-row"]}>
              <span className={styles["account-details-label"]}>
                Account Location
              </span>
              <span className={styles["account-details-value"]}>
                {accountDetails?.primaryLocationId.addressLine1 || ""}{" "}
                {accountDetails?.primaryLocationId.addressLine2 || ""}{" "}
                {accountDetails?.primaryLocationId.city || ""}{" "}
                {accountDetails?.primaryLocationId.state || ""}{" "}
                {accountDetails?.primaryLocationId.zipCode || ""}
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
              {/* {policies.map((policy) => ( */}
              <div
                // key={policy.id}
                className={styles["policy-card"]}
              >
                {/* <h4>{policy.name}</h4> */}
                <h4>Policy 1</h4>
                {/* <p>{policy.description}</p> */}
              </div>
              {/* ))} */}
            </div>
            <div className={styles["jobs"]}>
              <h3>Jobs</h3>
              {/* {jobs.map((job) => ( */}
              <div
                // key={job.id}
                className={styles["job-card"]}
              >
                {/* <h4>{job.title}</h4> */}
                <h4>Job 1</h4>
                {/* <p>{job.description}</p> */}
              </div>
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
