import { useEffect, useState } from "react";
import {
  faFileInvoiceDollar,
  faShieldHalved,
  faBan,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import DashboardTile, {
  TileData,
} from "../../components/DashboardTile/DashboardTile";
import { getAllAccounts } from "../../api/services/account/accountApi";
import { getAllJobs } from "../../api/services/job/jobApi";
import { FormattedMessage, useIntl } from "react-intl";
import type {
  Account,
  PrimaryLocation,
} from "../../api/services/account/types";
import type { Job } from "../../api/services/job/types";
import styles from "./Dashboard.module.scss";
import DataTable from "../../components/DataTable/DataTable";
import { TableColumn } from "../../types/TableTypes";
import { Link } from "react-router-dom";
import messages from "./Dashboard.messages";
import { get } from "http";

const INITIAL_TILES: TileData[] = [
  {
    icon: faFileInvoiceDollar,
    title: <FormattedMessage {...messages.openQuotes} />,
    path: "/quotes",
    classname: "quotestyle",
    count: 0,
  },
  {
    icon: faShieldHalved,
    title: <FormattedMessage {...messages.openPolicyChanges} />,
    path: "/policies",
    classname: "policystyle",
    count: 0,
  },
  {
    icon: faBan,
    title: <FormattedMessage {...messages.pendingCancellations} />,
    path: "/accounts",
    classname: "accountstyle",
    count: 0,
  },
  {
    icon: faClipboardList,
    title: <FormattedMessage {...messages.pendingRequests} />,
    path: "/requests",
    classname: "requeststyle",
    count: 0,
  },
];

type TableAccount = {
  accountNumber: string;
  name: string;
  status: string;
  address: string;
};
type TablePolicy = {
  jobNumber: string;
  name: string;
  status: string;
};

const Dashboard = () => {
  const [tiles, setTiles] = useState<TileData[]>(INITIAL_TILES);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [policies, setPolicies] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableAccount[]>([]);
  const [policyTableData, setPolicyTableData] = useState<TablePolicy[]>([]);
  const intl = useIntl();

  const columns: TableColumn[] = [
    {
      key: "accountNumber",
      label: intl.formatMessage(messages.colAccountNumber),
      cell: (value: TableAccount) => (
        <Link
          to={`/AccountDetails?id=${getAccountId(value.accountNumber)}`}
          className={styles.accountLink}
        >
          {value.accountNumber}
        </Link>
      ),
      sortable: true,
      sortType: "string",
    },
    {
      key: "name",
      label: intl.formatMessage(messages.colAccountName),
      sortable: true,
      sortType: "string",
    },
    {
      key: "status",
      label: intl.formatMessage(messages.colStatus),
      sortable: true,
      sortType: "string",
    },
    {
      key: "address",
      label: intl.formatMessage(messages.colAddress),
      sortable: true,
      sortType: "string",
    },
  ];
  const policyColumns: TableColumn[] = [
    {
      key: "jobNumber",
      label: intl.formatMessage(messages.colAccountNumber),
      sortable: true,
      sortType: "string",
    },
    {
      key: "name",
      label: intl.formatMessage(messages.colPolicyNumber),
      sortable: true,
      sortType: "string",
    },
    {
      key: "status",
      label: intl.formatMessage(messages.colStatus),
      sortable: true,
      sortType: "string",
    },
  ];
  const getAccountId = (accountNumber: string) => {
    const acct = accounts.find((a) => a.accountNumber === accountNumber);
    return acct ? acct._id : "";
  };
  useEffect(() => {
    Promise.all([getAllJobs(), getAllAccounts()])
      .then(([jobsRes, accountsRes]) => {
        const jobs = jobsRes.data;
        const accts = accountsRes.data;

        const quotes = jobs.filter(
          (item) => item.jobType?.name === "Submission",
        ).length;
        const policyChanges = jobs.filter(
          (item) => item.jobType?.name === "PolicyChange",
        ).length;
        const cancellations = jobs.filter(
          (item) => item.jobType?.name === "Cancellation",
        ).length;
        const requests = accts.length;

        setTiles((prev) =>
          prev.map((tile, idx) => ({
            ...tile,
            count: [quotes, policyChanges, cancellations, requests][idx],
          })),
        );

        setAccounts(accts);
        setTableData(
          accts.map((acct) => ({
            accountNumber: acct.accountNumber ?? "—",
            name: getAccountName(acct),
            status: acct.status?.name ?? "—",
            address: formatAddress(acct.primaryLocation),
          })),
        );
        setPolicies(jobs);
        setPolicyTableData(
          jobs.map((job) => ({
            jobNumber: ((job as any)._id || "—") ?? "—",
            name: job.jobNumber ?? "—",
            status: job.jobType.name ?? "—",
          })),
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const formatAddress = (loc: PrimaryLocation | undefined) => {
    if (!loc) return "—";
    return [loc.addressLine1, loc.city, loc.state.name, loc.postalCode]
      .filter(Boolean)
      .join(", ");
  };

  const getAccountName = (account: Account) => {
    const holder = account.accountHolder;
    if (!holder) return "—";
    return (
      holder.companyName ||
      `${holder.firstName} ${holder.lastName}`.trim() ||
      "—"
    );
  };
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          <FormattedMessage {...messages.title} />
        </h1>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <>
            <div className={styles.tilesGrid}>
              {tiles.map((tile) => (
                <DashboardTile key={tile.path} {...tile} />
              ))}
            </div>

            <div className={styles.tablesSection}>
              {/* Recently Viewed Accounts */}
              <div className={styles.tableBlock}>
                <h2 className={styles.tableTitle}>
                  <FormattedMessage {...messages.recentlyViewedAccounts} />
                </h2>

                <DataTable columns={columns} data={tableData} />
              </div>
              {/* Recently Viewed Policies */}
              <div className={styles.tableBlock}>
                <h2 className={styles.tableTitle}>
                  <FormattedMessage {...messages.recentlyViewedPolicies} />
                </h2>
                <DataTable columns={policyColumns} data={policyTableData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
