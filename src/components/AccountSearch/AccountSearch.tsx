import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleInfo,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getAllAccounts } from "../../api/services/account/accountApi";
import { Account } from "../../api/services/account/types";
import messages from "./AccountSearch.messages";
import styles from "./AccountSearch.module.scss";

type AccountSearchProps = {
  selectedAccountId?: string;
  onAccountSelect: (account: Account) => void;
  onCreateNew: () => void;
};

const getInitials = (account: Account): string => {
  const holder = account.accountHolder;
  if (!holder) return "?";
  if (holder.companyName) return holder.companyName.slice(0, 2);
  return `${holder.firstName?.[0] ?? ""}${holder.lastName?.[0] ?? ""}`;
};

const getDisplayName = (account: Account): string => {
  const holder = account.accountHolder;
  if (!holder) return account.accountNumber ?? "—";
  return (
    holder.companyName ||
    `${holder.firstName ?? ""} ${holder.lastName ?? ""}`.trim() ||
    account.accountNumber ||
    "—"
  );
};

const getDisplayAddress = (account: Account): string => {
  const loc = account.primaryLocation;
  if (!loc) return "";
  return [loc.addressLine1, loc.city, loc.state?.name, loc.postalCode]
    .filter(Boolean)
    .join(", ");
};

const matchesQuery = (account: Account, q: string): boolean => {
  const lower = q.toLowerCase();
  const holder = account.accountHolder;
  return (
    (holder?.firstName ?? "").toLowerCase().includes(lower) ||
    (holder?.lastName ?? "").toLowerCase().includes(lower) ||
    (holder?.companyName ?? "").toLowerCase().includes(lower) ||
    (holder?.emailAddress ?? "").toLowerCase().includes(lower) ||
    (account.accountNumber ?? "").toLowerCase().includes(lower)
  );
};

const AccountSearch = ({
  selectedAccountId,
  onAccountSelect,
  onCreateNew,
}: AccountSearchProps) => {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAccounts()
      .then((res) => setAccounts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = query.length > 0
    ? accounts.filter((a) => matchesQuery(a, query))
    : accounts;

  return (
    <div className={styles["container"]}>
      {/* Search input */}
      <div className={styles["search-bar"]}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["search-icon"]} />
        <input
          className={styles["search-input"]}
          type="text"
          placeholder={intl.formatMessage(messages.placeholder)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Hint */}
      <div className={styles["hint-banner"]}>
        <FontAwesomeIcon icon={faCircleInfo} />
        {intl.formatMessage(messages.hint)}
      </div>

      {/* Results */}
      {loading && (
        <p className={styles["status-text"]}>{intl.formatMessage(messages.loading)}</p>
      )}

      {!loading && query.length > 0 && filtered.length === 0 && (
        <p className={styles["status-text"]}>
          {intl.formatMessage(messages.noResults, { query })}
        </p>
      )}

      {filtered.map((account) => {
        const isSelected = account._id === selectedAccountId;
        return (
          <div
            key={account._id}
            className={`${styles["result-card"]} ${isSelected ? styles["result-card--selected"] : ""}`}
            onClick={() => onAccountSelect(account)}
          >
            <div className={styles["avatar"]}>{getInitials(account)}</div>
            <div className={styles["card-info"]}>
              <div className={styles["card-name"]}>{getDisplayName(account)}</div>
              <div className={styles["card-address"]}>{getDisplayAddress(account)}</div>
            </div>
            {isSelected && (
              <FontAwesomeIcon icon={faCheck} className={styles["selected-icon"]} />
            )}
          </div>
        );
      })}

      {/* Create New Account */}
      <button className={styles["create-btn"]} onClick={onCreateNew}>
        <FontAwesomeIcon icon={faPlus} />
        {intl.formatMessage(messages.createNew)}
      </button>
    </div>
  );
};

export default AccountSearch;
