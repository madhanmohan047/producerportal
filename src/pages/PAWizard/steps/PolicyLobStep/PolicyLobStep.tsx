import { useEffect, useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import { getAllJobs } from "../../../../api/services/job/jobApi";
import { getTypeList } from "../../../../api/services/typelist/typelistApi";
import Combobox, { ComboboxOption } from "../../../../components/common/Combobox/Combobox";
import { FormInput } from "../../../../components/common";
import styles from "./PolicyLobStep.module.scss";

const PolicyLobStep = (wizardPageProps: WizardPageProps) => {
  const { paFormData, setPAFormData } = usePAContext();

  const [states, setStates] = useState<ComboboxOption[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTypeList("State").then((res) => setStates(res.data));
  }, []);

  const set = <K extends keyof typeof paFormData>(field: K, value: (typeof paFormData)[K]) =>
    setPAFormData((prev) => ({ ...prev, [field]: value }));

  const handleNext = async () => {
    if (!paFormData.effectiveDate) {
      setError("Effective date is required.");
      return;
    }
    if (!paFormData.baseState) {
      setError("Base state is required.");
      return;
    }

    if (paFormData.jobId) {
      wizardPageProps.handleNext?.();
      return;
    }

    setIsCreating(true);
    setError(null);
    try {
      const res = await getAllJobs();
      const raw = res.data as any;
      const jobs = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
      const match = jobs.find((j: any) => {
        const id = typeof j.account === "string" ? j.account : j.account?._id;
        return id === paFormData.accountId;
      }) ?? jobs[0];

      if (!match?._id) {
        setError("No submission found for this account.");
        return;
      }

      setPAFormData((prev) => ({ ...prev, jobId: match._id }));
      wizardPageProps.handleNext?.();
    } catch (err: any) {
      setError(err?.message ?? "Failed to load submissions. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const accountLabel = paFormData.primaryContact
    ? `${paFormData.primaryContact.firstName ?? ""} ${paFormData.primaryContact.lastName ?? ""}`.trim()
    : paFormData.accountNumber ?? "—";

  return (
    <WizardPage {...wizardPageProps} handleNext={handleNext}>
      <div className={styles.form}>
        {accountLabel && (
          <div className={styles["account-banner"]}>
            <span className={styles["account-label"]}>Account:</span>
            {accountLabel}
            {paFormData.accountNumber && ` (${paFormData.accountNumber})`}
          </div>
        )}

        <div>
          <p className={styles["section-title"]}>Policy Details</p>
          <div className={styles.grid}>
            <FormInput
              label="Effective Date *"
              type="date"
              value={paFormData.effectiveDate ?? ""}
              onChange={(e) => set("effectiveDate", e.target.value)}
            />
            <FormInput
              label="Expiration Date"
              type="date"
              value={paFormData.expirationDate ?? ""}
              onChange={(e) => set("expirationDate", e.target.value)}
            />
            <Combobox
              label="Base State *"
              options={states}
              value={paFormData.baseState as ComboboxOption | undefined}
              onChange={(opt) => set("baseState", opt)}
              fullWidth
            />
          </div>
        </div>

        {error && <p className={styles["error-text"]}>{error}</p>}
        {isCreating && <p>Loading submission…</p>}
      </div>
    </WizardPage>
  );
};

export default PolicyLobStep;
