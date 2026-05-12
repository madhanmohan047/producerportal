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
import { getAllPolicies } from "../../api/services/policy/policyApi";
  import { FormattedMessage, useIntl } from "react-intl";
import type {
  Account,
  PrimaryLocation,
} from "../../api/services/account/types";
import styles from "./Dashboard.module.scss";
import DataTable from "../../components/DataTable/DataTable";
import { TableColumn } from "../../types/TableTypes";
import { Link } from "react-router-dom";
import messages from "./Dashboard.messages";
import Accordion, {
  AccordionCard,
} from "../../components/AccordionComponent/AccordionComponent";

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
  id: string;
  jobNumber: string;
  name: string;
  status: string;
};

const Dashboard = () => {
  const [tiles, setTiles] = useState<TileData[]>(INITIAL_TILES);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
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
      cell: (value: TablePolicy) => (
        <Link
          to={`/policySummary?id=${value.id}`}
          className={styles.accountLink}
        >
          {value.id}
        </Link>
      ),
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
    Promise.all([getAllAccounts(), getAllPolicies()])
      .then(([accountsResult, policiesResult]) => {
        const accts = accountsResult.data;
        const pols = policiesResult.data;

        const quotes = pols.filter(
          (item) => item.jobType?.code === "submission",
        ).length;
        const policyChanges = pols.filter(
          (item) => item.jobType?.code === "policyChange",
        ).length;
        const cancellations = pols.filter(
          (item) => item.jobType?.code === "cancellation",
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
        setPolicies(pols);  
        setPolicyTableData(
          pols.map((pol) => {
            const insured = pol.primaryInsured ?? null;
            return {
              id: pol._id,
              jobNumber: pol.jobNumber ?? pol._id,
              name:
                [insured?.firstName, insured?.lastName].filter(Boolean).join(" ") ||
                pol.product?.name ||
                "—",
              status: pol.jobStatus?.name ?? pol.policyStatus?.name ?? "—",
            };
          }),
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  const formatAddress = (loc: PrimaryLocation | string | undefined) => {
    if (!loc || typeof loc === "string") return "—";
    return [loc.addressLine1, loc.city, loc.state?.name, loc.postalCode]
      .filter(Boolean)
      .join(", ");
  };

  const getAccountName = (account: Account) => {
    const holder = account.accountHolder;
    if (!holder || typeof holder === "string") return "—";
    return (
      holder.companyName ||
      `${holder.firstName ?? ""} ${holder.lastName ?? ""}`.trim() ||
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
              <Accordion defaultOpenIndex={0}>
                <AccordionCard
                  title={<FormattedMessage {...messages.recentlyViewedAccounts} />}
                >
                  <DataTable columns={columns} data={tableData} />
                </AccordionCard>
                <AccordionCard
                  title={<FormattedMessage {...messages.recentlyViewedPolicies} />}
                >
                  <DataTable columns={policyColumns} data={policyTableData} />
                </AccordionCard>
              </Accordion>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
