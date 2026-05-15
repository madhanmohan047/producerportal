import React, { useState } from "react";
import styles from "../AddressCustomerSearch/AddressCustomerSearch.module.scss";
import { getAllAccounts } from "../../api/services/account/accountApi";
import { Account } from "../../api/services/account/types";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";

export const AddressCustomerSearch = () => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const [selectedAccount, setSelectedAccount] = React.useState<
    string | undefined
  >(undefined);

  const [showCreateAccount, setShowCreateAccount] = useState(false);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts();
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmitSuccess = (newAccount: any) => {
    //  console.log(
    //    "PARENT RECEIVED:",
    //    newAccount
    //  );

    setAccounts((prev) => [...prev, newAccount]);

    setSelectedAccount(newAccount._id);

    setShowCreateAccount(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Address & Customer Search</h1>
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
        <span> Select a matching account to pre-fill applicant details.</span>
      </div>
      <div className={styles.cardContainer}>
        {accounts.map((account) => (
          <div
            key={account._id}
            className={
              selectedAccount === account._id
                ? styles.selectedCard
                : styles.card
            }
            onClick={() => setSelectedAccount(account._id)}
          >
            <div className={styles.leftSection}>
              <div className={styles.avatar}>
                {account.accountHolder?.firstName?.charAt(0)}
                {account.accountHolder?.lastName?.charAt(0)}
              </div>

              <div className={styles.accountInfo}>
                <h3>
                  {" "}
                  {account.accountHolder?.firstName}{" "}
                  {account.accountHolder?.lastName}
                </h3>
                <p>{account.primaryLocation?.addressLine1}</p>
              </div>
            </div>

            <div className={styles.activeBadge}>2 Policies</div>
          </div>
        ))}
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
