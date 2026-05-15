import React, { useEffect, useState } from "react";
import styles from "../AddressCustomerSearch/AddressCustomerSearch.module.scss";
import { getAllAccounts } from "../../api/services/account/accountApi";
import { getAllJobs } from "../../api/services/job/jobApi";
import { Account } from "../../api/services/account/types";
import { usePAWizard } from "../../context/PAWizardContext";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";

export const AddressCustomerSearch = () => {
  const { selectedAccount, setSelectedAccount } = usePAWizard();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [jobCountByAccount, setJobCountByAccount] = useState<
    Record<string, number>
  >({});
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    getAllAccounts()
      .then((res) => setAccounts(res.data))
      .catch((error) => console.error("Error fetching accounts:", error));

    getAllJobs()
      .then((res) => {
        const counts: Record<string, number> = {};
        res.data.forEach((job) => {
          const accountId =
            typeof job.account === "string" ? job.account : job.account?._id;
          if (accountId) {
            counts[accountId] = (counts[accountId] ?? 0) + 1;
          }
        });
        setJobCountByAccount(counts);
      })
      .catch(() => {
        // policy count is non-critical
      });
  }, []);

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account);
  };

  const handleSubmitSuccess = (newAccount: Account) => {
    setAccounts((prev) => [...prev, newAccount]);
    setSelectedAccount(newAccount);
    setShowCreateAccount(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Account &amp; Customer Search</h1>
        <p>
          Search for an existing account or create a new one to begin the
          application.
        </p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, email, phone, or account #"
        />
      </div>

      <div className={styles.infoBanner}>
        <span>⊙ Select a matching account to pre-fill applicant details.</span>
      </div>

      <div className={styles.cardContainer}>
        {accounts.map((account) => {
          const isSelected = selectedAccount?._id === account._id;
          const policyCount = jobCountByAccount[account._id ?? ""] ?? 0;
          const initials =
            (account.accountHolder?.firstName?.charAt(0) ?? "") +
            (account.accountHolder?.lastName?.charAt(0) ?? "");
          const fullName = [
            account.accountHolder?.firstName,
            account.accountHolder?.lastName,
          ]
            .filter(Boolean)
            .join(" ");
          const address = [
            account.primaryLocation?.addressLine1,
            account.primaryLocation?.city,
            account.primaryLocation?.state?.code,
            account.primaryLocation?.postalCode,
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <div
              key={account._id}
              className={isSelected ? styles.selectedCard : styles.card}
              onClick={() => handleSelectAccount(account)}
            >
              <div className={styles.leftSection}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.accountInfo}>
                  <h3>{fullName}</h3>
                  <p>{address}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  className={
                    policyCount === 0 ? styles.emptyBadge : styles.activeBadge
                  }
                >
                  {policyCount} POLICIES
                </span>
                {isSelected && (
                  <span style={{ color: "#2563eb", fontSize: 18, fontWeight: 700 }}>
                    ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className={styles.createButton}
        onClick={() => setShowCreateAccount(true)}
      >
        + Create New Account
      </button>

      {showCreateAccount && (
        <NewAccountModal
          isOpen={showCreateAccount}
          onCancel={() => setShowCreateAccount(false)}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
    </div>
  );
};

export default AddressCustomerSearch;
