import React, { useState } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./AccountCustomerSearch.module.scss";
import { getAllAccounts } from "../../../../api/services/account/accountApi";
import { Account } from "../../../../api/services/account/types";
import { Contact } from "../../../../api/services/account/types/Contact";
import { Address } from "../../../../api/services/account/types/Address";
import { NewAccountModal } from "./NewAccountModal/NewAccountModal";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import messages from "./AccountCustomerSearch.messages";

export const AccountCustomerSearch = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<Account | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts();
        const raw = response.data as any;
        const list: Account[] = Array.isArray(raw.data)
          ? raw.data
          : Array.isArray(raw)
          ? raw
          : [];
        setAccounts(list);
        if (paFormData.accountId) {
          const found = list.find((a) => a._id === paFormData.accountId);
          if (found) setSelectedAccount(found);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  const filtered = query
    ? accounts.filter((a) => {
        const q = query.toLowerCase();
        const h = a.accountHolder;
        return (
          (h?.firstName ?? "").toLowerCase().includes(q) ||
          (h?.lastName ?? "").toLowerCase().includes(q) ||
          (h?.emailAddress ?? "").toLowerCase().includes(q) ||
          (a.accountNumber ?? "").toLowerCase().includes(q)
        );
      })
    : accounts;

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    setError(null);
    const holder = account.accountHolder as Contact;
    const location = account.primaryLocation as Address;
    setPAFormData((prev) => ({
      ...prev,
      accountId: account._id,
      accountNumber: account.accountNumber,
      primaryContact: holder,
      mailingAddress: location,
    }));
  };

  const handleSubmitSuccess = (newAccount: Account) => {
    setAccounts((prev) => [...prev, newAccount]);
    handleAccountSelect(newAccount);
    setShowCreateAccount(false);
  };

  const handleNext = () => {
    if (!selectedAccount) {
      setError(intl.formatMessage(messages.errorSelectAccount));
      return;
    }
    wizardPageProps.handleNext?.();
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#94a3b8" }} />
          <input
            type="text"
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.infoBanner}>
          <span>{intl.formatMessage(messages.infoBanner)}</span>
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: "0.85rem", margin: 0 }}>{error}</p>
        )}

        <div className={styles.cardContainer}>
          {filtered.length === 0 && query && (
            <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
              {intl.formatMessage(messages.noAccountsFound)}
            </p>
          )}
          {filtered.map((account) => {
            const isSelected = selectedAccount?._id === account._id;
            const holder = account.accountHolder;
            const policyCount = (account as any).submissions?.length ?? 0;
            return (
              <div
                key={account._id}
                className={isSelected ? styles.selectedCard : styles.card}
                onClick={() => handleAccountSelect(account)}
              >
                <div className={styles.leftSection}>
                  <div className={styles.avatar}>
                    {holder?.firstName?.charAt(0)}
                    {holder?.lastName?.charAt(0)}
                  </div>
                  <div className={styles.accountInfo}>
                    <h3>
                      {holder?.firstName} {holder?.lastName}
                    </h3>
                    <p>{account.primaryLocation?.addressLine1}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {policyCount > 0 ? (
                    <div className={styles.activeBadge}>
                      {policyCount} {policyCount === 1
                        ? intl.formatMessage(messages.policy)
                        : intl.formatMessage(messages.policies)}
                    </div>
                  ) : (
                    <div className={styles.emptyBadge}>
                      {intl.formatMessage(messages.zeroPolicies)}
                    </div>
                  )}
                  {isSelected && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#2563eb", fontSize: "1rem" }}
                    />
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
          {intl.formatMessage(messages.createNewAccount)}
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
