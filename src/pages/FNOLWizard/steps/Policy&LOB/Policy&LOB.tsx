import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPolicies } from "../../../../api/services/policy/policyApi";
import { getAllAccounts } from "../../../../api/services/account/accountApi";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";

import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";
import styles from "./Policy&LOB.module.scss";
import { SideBarProps } from "../FnolConstant";
import { Policy } from "../../../../api/services/policy/types";
import { createClaim } from "../../../../api/services/claim/claimApi";
import { Claim } from "../../../../api/services/claim/types/Claim";

const StartClaim = (wizardPageProps: WizardPageProps) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { fnolFormData, setFnolFormData } = useFNOLContext();

  const [LOB, setLOB] = useState(
    fnolFormData?.lineOfBusiness || "Personal Auto",
  );

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);

  const [filteredPolicies, setFilteredPolicies] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [claimNumber, setClaimNumber] = useState("");

  const [selectedAccount, setSelectedAccount] = useState(
    fnolFormData?.accountNumber || "",
  );
  const [selectedPolicy, setSelectedPolicy] = useState(
    fnolFormData?.policyNumber || "",
  );

  const [selectedDate, setSelectedDate] = useState(
    fnolFormData?.dateOfLoss || new Date().toISOString().split("T")[0],
  );

  const [timeOfLoss, setTimeOfLoss] = useState(fnolFormData?.timeOfLoss || "");

  const currentTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    Promise.all([getAllAccounts(), getAllPolicies()])
      .then(([accountsResult, policiesResult]) => {
        const accts = accountsResult.data || [];
        const pols = policiesResult.data || [];

        setAccounts(accts);
        setPolicies(pols);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!selectedAccount) {
      setFilteredPolicies([]);
      return;
    }

    const filtered = policies.filter((policy) => {
      const matchesLOB = policy?.product?.name === LOB;
      const matchesAccount = policy?.account?.accountNumber === selectedAccount;

      return matchesLOB && matchesAccount;
    });

    setFilteredPolicies(filtered);
    console.log("filteredpolicy", policies);
  }, [selectedAccount, LOB, policies]);

  const selectedAccountDetails = useMemo(() => {
    return accounts.find(
      (account) => account.accountNumber === selectedAccount,
    );
  }, [accounts, selectedAccount]);

  const handleLOBChange = (lob: string) => {
    setLOB(lob);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(e.target.value);
    setSelectedPolicy("");
  };
  const handlePolicyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    setSelectedPolicy(selectedValue);

    const matchedPolicy = policies.find(
      (policy) => policy._id === selectedValue,
    );
    setFnolFormData((prev) => ({
      ...prev,
      vehicleInvolved: matchedPolicy?.vehicles,
    }));
  };

  useEffect(() => {
    setFnolFormData((prev) => ({
      ...prev,
      accountNumber: selectedAccount,
      accountHolderName: selectedAccountDetails?.accountHolderName || "",
      lineOfBusiness: LOB,
      policyNumber: selectedPolicy,
      dateOfLoss: selectedDate,
      timeOfLoss: timeOfLoss,
      sidebarProps: {
        ...prev.sidebarProps,
        title: prev.sidebarProps?.title || "",
        sidebaritems: [
          {
            transformationKey: SideBarProps.Account,
            transformationLabel: selectedAccount,
          },
          {
            transformationKey: SideBarProps.PolicyNumber,
            transformationLabel: selectedPolicy,
          },
          {
            transformationKey: SideBarProps.LineOfBusiness,
            transformationLabel: LOB,
          },
          {
            transformationKey: SideBarProps.ClaimNumber,
            transformationLabel: claimNumber,
          },
        ],
      },
    }));
  }, [
    selectedAccount,
    selectedAccountDetails,
    LOB,
    selectedPolicy,
    claimNumber,
    selectedDate,
    timeOfLoss,
    setFnolFormData,
  ]);
  const claim: Claim = {
    account: fnolFormData.account?._id || undefined,
    policy: fnolFormData.policyNumber,
    product: {
      code: fnolFormData.lineOfBusiness || "",
      name: fnolFormData.lineOfBusiness || "",
    },
    lossDate: fnolFormData.dateOfLoss
      ? new Date(fnolFormData.dateOfLoss)
      : undefined,
    lossDescription: "Minor accident reported - details to be updated later",
    status: {
      code: "draft",
      name: "Draft",
    },
  };
  const handleCreateClaim = () => {
    //account, policy, product (LOB), date and time of loss, status (draft)
    createClaim(claim).then((response) => {
      const createdClaim = response.data;
      setClaimNumber(createdClaim.claimNumber);

      setFnolFormData((prev) => ({
        ...prev,
        claimNumber: createdClaim.claimNumber,
      }));
    });
    wizardPageProps.handleNext?.();
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleCreateClaim}
      handlePrevious={wizardPageProps.handlePrevious}
      showPageheader={false}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div className={styles["start-claim-page"]}>
        <div className={styles["claim-container"]}>
          <h1 className={styles.title}>Start your claim</h1>

          <p className={styles.subtitle}>
            Identify your policy and the line of business to initialize the
            claim process.
          </p>

          {/* ACCOUNT DROPDOWN */}
          <div className={styles["account-fields"]}>
            <label>
              Choose an Account <span>*</span>
            </label>

            <div className={styles["account-select-row"]}>
              <select
                value={selectedAccount}
                onChange={handleAccountChange}
                disabled={loading}
              >
                <option value="">Select Account</option>

                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account._id}
                  </option>
                ))}
              </select>

              {selectedAccountDetails && (
                <div className={styles["account-holder-name"]}>
                  {selectedAccountDetails.accountHolderName}
                </div>
              )}
            </div>
          </div>

          {/* LOB CARDS */}
          <div className={styles["business-cards"]}>
            <div
              className={`business-card ${
                LOB === "Personal Auto" ? "active" : ""
              }`}
            >
              <button onClick={() => handleLOBChange("Personal Auto")}>
                <h3>Personal Auto</h3>
                <p>Collision, Comprehensive, Liability</p>
              </button>
            </div>

            <div
              className={`business-card ${
                LOB === "Personal Property" ? "active" : ""
              }`}
            >
              <button onClick={() => handleLOBChange("Personal Property")}>
                <h3>Personal Property</h3>
                <p>Homeowners, Renters, Condo</p>
              </button>
            </div>

            <div
              className={`business-card ${LOB === "Commercial" ? "active" : ""}`}
            >
              <button onClick={() => handleLOBChange("Commercial")}>
                <h3>Commercial</h3>
                <p>Collision, Comprehensive, Liability</p>
              </button>
            </div>
          </div>
        </div>

        {/* POLICY SECTION */}
        <div className={styles["top-fields"]}>
          <div className={styles["field-group"]}>
            <label>
              Policy Number <span>*</span>
            </label>

            <div className={styles["input-wrapper"]}>
              <select
                value={selectedPolicy}
                onChange={(e) => handlePolicyChange(e)}
                disabled={!selectedAccount}
              >
                <option value="">
                  {selectedAccount
                    ? "Select Policy"
                    : "Select an account first"}
                </option>

                {policies.map((policy) => (
                  <option key={policy._id} value={policy._id}>
                    {policy._id}
                  </option>
                ))}
              </select>
            </div>

            {/* POLICY PREVIEW */}
            {filteredPolicies.length > 0 && (
              <div className={styles["policy-results"]}>
                <h4>Available Policies</h4>

                <ul>
                  {filteredPolicies.map((policy) => (
                    <li key={policy.policyNumber}>
                      <strong>{policy.policyNumber}</strong> —{" "}
                      {policy?.product?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* LOSS DETAILS */}
        <div className={styles["bottom-fields"]}>
          <div className={styles["field-group"]}>
            <label>
              Date of Loss <span>*</span>
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className={styles["field-group"]}>
            <label>Time of Loss</label>

            <input
              type="time"
              value={timeOfLoss}
              onChange={(e) => setTimeOfLoss(e.target.value)}
              max={selectedDate === today ? currentTime : undefined}
            />
          </div>
        </div>
      </div>
    </WizardPage>
  );
};

export default StartClaim;
