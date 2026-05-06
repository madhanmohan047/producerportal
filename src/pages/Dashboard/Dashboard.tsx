import { useEffect, useState } from 'react';
import { faFileInvoiceDollar, faShieldHalved, faBan, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import DashboardTile, { TileData } from '../../components/DashboardTile/DashboardTile';
import { getAllAccounts } from '../../api/services/account/accountApi';
import { getAllJobs } from '../../api/services/job/jobApi';
import { DASHBOARD_MESSAGES } from '../Dashboard/Dashboard.messages';
import { FormattedMessage } from 'react-intl';
import type { Account, PrimaryLocation } from '../../api/services/account/types';
import type { Job } from '../../api/services/job/types';
import styles from './Dashboard.module.scss';

const INITIAL_TILES: TileData[] = [
  { icon: faFileInvoiceDollar, title: <FormattedMessage {...DASHBOARD_MESSAGES.openQuotes} />,        path: '/quotes',    classname: 'quotestyle',   count: 0 },
  { icon: faShieldHalved,      title: <FormattedMessage {...DASHBOARD_MESSAGES.openPolicyChanges} />, path: '/policies',  classname: 'policystyle',  count: 0 },
  { icon: faBan,               title: <FormattedMessage {...DASHBOARD_MESSAGES.pendingCancellations} />, path: '/accounts', classname: 'accountstyle', count: 0 },
  { icon: faClipboardList,     title: <FormattedMessage {...DASHBOARD_MESSAGES.pendingRequests} />,   path: '/requests',  classname: 'requeststyle', count: 0 },
];

const formatAddress = (loc: PrimaryLocation | undefined) => {
  if (!loc) return '—';
  return [loc.addressLine1, loc.city, loc.state, loc.postalCode].filter(Boolean).join(', ');
};

const getAccountName = (account: Account) => {
  const holder = account.accountHolder;
  if (!holder) return '—';
  return holder.companyName || `${holder.firstName} ${holder.lastName}`.trim() || '—';
};

const Dashboard = () => {
  const [tiles, setTiles] = useState<TileData[]>(INITIAL_TILES);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [policies, setPolicies] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllJobs(), getAllAccounts()])
      .then(([jobsRes, accountsRes]) => {
        const jobs = jobsRes.data;
        const accts = accountsRes.data;

        const quotes       = jobs.filter(item => item.jobType?.name === 'Submission').length;
        const policyChanges = jobs.filter(item => item.jobType?.name === 'PolicyChange').length;
        const cancellations = jobs.filter(item => item.jobType?.name === 'Cancellation').length;
        const requests     = accts.length;

        setTiles(prev => prev.map((tile, idx) => ({
          ...tile,
          count: [quotes, policyChanges, cancellations, requests][idx],
        })));

        setAccounts(accts);
        setPolicies(jobs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}><FormattedMessage {...DASHBOARD_MESSAGES.title} /></h1>
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
                  <FormattedMessage {...DASHBOARD_MESSAGES.recentlyViewedAccounts} />
                </h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colAccountNumber} /></th>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colAccountName} /></th>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colStatus} /></th>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colAddress} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length === 0 ? (
                      <tr className={styles.emptyRow}>
                        <td colSpan={4}><FormattedMessage {...DASHBOARD_MESSAGES.noData} /></td>
                      </tr>
                    ) : (
                      accounts.map((account) => (
                        <tr key={account._id}>
                          <td>{account.accountNumber}</td>
                          <td>{getAccountName(account)}</td>
                          <td>{account.status.name || '—'}</td>
                          <td>{formatAddress(account?.primaryLocation)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Recently Viewed Policies */}
              <div className={styles.tableBlock}>
                <h2 className={styles.tableTitle}>
                  <FormattedMessage {...DASHBOARD_MESSAGES.recentlyViewedPolicies} />
                </h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colAccountNumber} /></th>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colPolicyNumber} /></th>
                      <th><FormattedMessage {...DASHBOARD_MESSAGES.colStatus} /></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {policies.length === 0 ? (
                      <tr className={styles.emptyRow}>
                        <td colSpan={4}><FormattedMessage {...DASHBOARD_MESSAGES.noData} /></td>
                      </tr>
                    ) : (
                      policies.map((policy) => (
                        <tr key={policy._id}>
                          <td>{(policy as any)._id || '—'}</td>
                          <td>{policy.jobNumber || '_'}</td>
                          <td>{policy.jobType?.name || '—'}</td>
                          
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
