import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion, { AccordionCard } from "../../components/AccordionComponent/AccordionComponent";
import { usePolicySummary, fmt, money } from "./usePolicySummary";
import styles from "./PolicySummaryPage.module.scss";

const Field: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className={styles.field}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={styles.fieldValue}>{value || "—"}</span>
  </div>
);

export const PolicySummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { policy, loading, error } = usePolicySummary();

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "#c0392b" }}>{error}</div>;
  if (!policy) return null;

  const insuredName =
    [policy.primaryInsured?.firstName, policy.primaryInsured?.lastName]
      .filter(Boolean)
      .join(" ") || "—";
      console.log("policy", policy.primaryInsured)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className={styles.headerTitle}>
            <h1 className={styles.title}>Policy Summary</h1>
          </div>
        </div>

        <div className={styles.cardBody}>
          <Accordion defaultOpenIndex={0}>
            <AccordionCard title="Policy Details">
              <div className={styles.section}>
                <div className={styles.grid}>
                  <Field label="Policy Status" value={policy.policyStatus?.name} />
                  <Field label="Product" value={policy.product?.name} />
                  <Field label="Base State" value={policy.baseState?.name} />
                  <Field label="Coverage Currency" value={policy.preferredCoverageCurrency?.name} />
                  <Field label="UW Company" value={policy.uwCompany?.name} />
                  <Field label="Effective Date" value={fmt(policy.effectiveDate)} />
                  <Field label="Expiration Date" value={fmt(policy.expirationDate)} />
                  <Field label="Issued Date" value={fmt(policy.issuedDate)} />
                </div>
              </div>
            </AccordionCard>

            <AccordionCard title="Insured">
              <div className={styles.section}>
                <div className={styles.grid}>
                  <Field label="Name" value={insuredName} />
                  <Field label="Email" value={policy.primaryInsured?.emailAddress} />
                  <Field label="Phone" value={policy.primaryInsured?.workPhone} />
                  <Field label="Type" value={policy.primaryInsured?.type?.name} />
                </div>
              </div>
            </AccordionCard>

            <AccordionCard title="Account">
              <div className={styles.section}>
                <div className={styles.grid}>
                  <Field label="Account Number" value={policy.account?.accountNumber} />
                  <Field label="Account Status" value={policy.account?.status?.name} />
                </div>
              </div>
            </AccordionCard>

            <AccordionCard title="Premium">
              <div className={styles.section}>
                <div className={styles.premiumGrid}>
                  <div className={styles.premiumRow}>
                    <span className={styles.premiumLabel}>Premium</span>
                    <span className={styles.premiumValue}>{money(policy.premiumAmount)}</span>
                  </div>
                  <div className={styles.premiumRow}>
                    <span className={styles.premiumLabel}>Tax</span>
                    <span className={styles.premiumValue}>{money(policy.taxAmount)}</span>
                  </div>
                  <div className={`${styles.premiumRow} ${styles.premiumTotal}`}>
                    <span className={styles.premiumLabel}>Total</span>
                    <span className={styles.premiumValue}>{money(policy.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </AccordionCard>

            {policy.jobs.length > 0 && (
              <AccordionCard title="Jobs">
                <div className={styles.section}>
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Job #</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Product</th>
                          <th>State</th>
                          <th>Effective</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policy.jobs.map((job) => (
                          <tr key={job._id}>
                            <td>{job.jobNumber || "—"}</td>
                            <td>{job.jobType?.name || "—"}</td>
                            <td>{job.jobStatus?.name || "—"}</td>
                            <td>{job.product?.name || "—"}</td>
                            <td>{job.baseState?.name || "—"}</td>
                            <td>{fmt(job.effectiveDate?.toString())}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionCard>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
