import React, { useCallback, useState } from "react";
import styles from "./AccountCustomerSearch.module.scss";
import { getAllAccounts } from "../../../../api/services/account/accountApi";
import { Account } from "../../../../api/services/account/types";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { createInitialPAFormData, usePAContext } from "../../PAWizardContext";

export const AccountCustomerSearch = (wizardPageProps: WizardPageProps) => {
  const { setPAFormData } = usePAContext();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const updateSelectedAccount = useCallback((account: Account) => {
    setSelectedAccount(account);
    sessionStorage.setItem("selectedAccount", JSON.stringify(account));
    setPAFormData((prev) => ({
      ...prev,
      accountId: account._id,
      accountNumber: account.accountNumber,
      organizationId:
        typeof account.organization === "string"
          ? account.organization
          : account.organization?._id,
      producerCodeId:
        typeof account.producerCode === "string"
          ? account.producerCode
          : account.producerCode?._id,
      primaryContact: account.accountHolder,
      mailingAddress: account.primaryLocation,
    }));
  }, [setPAFormData]);

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

  React.useEffect(() => {
    sessionStorage.removeItem("selectedAccount");
    setSelectedAccount(null);
    setPAFormData(createInitialPAFormData());
  }, [setPAFormData]);

  const handleSubmitSuccess = (newAccount: Account) => {
    setAccounts((prev) => [...prev, newAccount]);
    updateSelectedAccount(newAccount);
    setShowCreateAccount(false);
  };

  const handleAccountSelect = (account: Account) => {
    updateSelectedAccount(account);
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={() => {
        if (!selectedAccount) {
          alert("Please select a customer.");
          return;
        }

        wizardPageProps.handleNext?.();
      }}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.container}>
        <div className={styles.header}>
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
          <span>Select a matching account to pre-fill applicant details.</span>
        </div>
        <div className={styles.cardContainer}>
          {accounts.map((account) => (
            <div
              key={account._id}
              className={
                selectedAccount?._id === account._id
                  ? styles.selectedCard
                  : styles.card
              }
              onClick={() => handleAccountSelect(account)}
            >
              <div className={styles.leftSection}>
                <div className={styles.avatar}>
                  {account.accountHolder?.firstName?.charAt(0)}
                  {account.accountHolder?.lastName?.charAt(0)}
                </div>

                <div className={styles.accountInfo}>
                  <h3>
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
    </WizardPage>
  );
};

export default AccountCustomerSearch;
