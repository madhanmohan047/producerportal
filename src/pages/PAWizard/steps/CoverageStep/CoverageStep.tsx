import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import {
  DEFAULT_COVERAGES,
  DEFAULT_DISCOUNTS,
  COMP_DEDUCTIBLE_RATES,
  COLL_DEDUCTIBLE_RATES,
  LIABILITY_LIMIT_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  CoverageLineItem,
  computePremium,
} from "./quoteCoverageStep";
import messages from "./CoverageStep.messages";
import styles from "./CoverageStep.module.scss";

const CoverageStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();

  const [coverages, setCoverages] = useState<CoverageLineItem[]>(() => {
    if (paFormData.selectedCoverages && paFormData.selectedCoverages.length > 0) {
      return paFormData.selectedCoverages;
    }
    return DEFAULT_COVERAGES;
  });

  const [liabilityLimits, setLiabilityLimits] = useState(
    paFormData.liabilityLimits ?? "100/300/100"
  );
  const [compDeductible, setCompDeductible] = useState(
    paFormData.compDeductible ?? "$500"
  );
  const [collDeductible, setCollDeductible] = useState(
    paFormData.collDeductible ?? "$500"
  );

  useEffect(() => {
    const p = computePremium(coverages, DEFAULT_DISCOUNTS);
    setPAFormData((prev) => ({
      ...prev,
      monthlyPremium: p.monthlyTotal,
      annualPremium: p.annualTotal,
      annualDiscount: p.totalDiscountAnnual,
    }));
  }, [coverages, setPAFormData]);

  const toggleCoverage = (id: string) => {
    setCoverages((prev) =>
      prev.map((c) => {
        if (c.id !== id || c.required) return c;
        if (c.id === "comprehensive") {
          return { ...c, selected: !c.selected, monthlyRate: COMP_DEDUCTIBLE_RATES[compDeductible] ?? c.monthlyRate };
        }
        if (c.id === "collision") {
          return { ...c, selected: !c.selected, monthlyRate: COLL_DEDUCTIBLE_RATES[collDeductible] ?? c.monthlyRate };
        }
        return { ...c, selected: !c.selected };
      })
    );
  };

  const updateDeductible = (type: "comp" | "coll", value: string) => {
    if (type === "comp") {
      setCompDeductible(value);
      setCoverages((prev) =>
        prev.map((c) =>
          c.id === "comprehensive"
            ? { ...c, description: `${value} deductible`, monthlyRate: COMP_DEDUCTIBLE_RATES[value] ?? c.monthlyRate }
            : c
        )
      );
    } else {
      setCollDeductible(value);
      setCoverages((prev) =>
        prev.map((c) =>
          c.id === "collision"
            ? { ...c, description: `${value} deductible`, monthlyRate: COLL_DEDUCTIBLE_RATES[value] ?? c.monthlyRate }
            : c
        )
      );
    }
  };

  const handleNext = () => {
    setPAFormData((prev) => ({
      ...prev,
      selectedCoverages: coverages,
      liabilityLimits,
      compDeductible,
      collDeductible,
    }));
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
      <div className={styles["coverage-container"]}>
        <p className={styles["subtitle"]}>
          {intl.formatMessage(messages.subtitle)}
        </p>

        <div className={styles["card-grid"]}>
          {coverages.map((cov) => (
            <button
              key={cov.id}
              className={`${styles["card"]} ${cov.selected ? styles["card-selected"] : ""} ${cov.required ? styles["card-required"] : ""}`}
              onClick={() => toggleCoverage(cov.id)}
              aria-pressed={cov.selected}
            >
              <div className={styles["card-header"]}>
                <span className={styles["card-name"]}>{cov.name}</span>
                <span className={styles["card-price"]}>${cov.monthlyRate}/mo</span>
              </div>
              <div className={styles["card-desc"]}>
                {cov.required
                  ? `${intl.formatMessage(messages.requiredPrefix)}${cov.description.replace(/^Required[^—]*—\s*/, "")}`
                  : cov.description}
              </div>
            </button>
          ))}
        </div>

        <div className={styles["deductibles-section"]}>
          <div className={styles["deductibles-label"]}>{intl.formatMessage(messages.deductibles)}</div>
          <div className={styles["deductibles-grid"]}>
            <div className={styles["field"]}>
              <label className={styles["field-label"]}>{intl.formatMessage(messages.liabilityLimits)}</label>
              <select
                className={styles["field-select"]}
                value={liabilityLimits}
                onChange={(e) => setLiabilityLimits(e.target.value)}
              >
                {LIABILITY_LIMIT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className={styles["field"]}>
              <label className={styles["field-label"]}>{intl.formatMessage(messages.compDeductible)}</label>
              <select
                className={styles["field-select"]}
                value={compDeductible}
                onChange={(e) => updateDeductible("comp", e.target.value)}
              >
                {DEDUCTIBLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className={styles["field"]}>
              <label className={styles["field-label"]}>{intl.formatMessage(messages.collDeductible)}</label>
              <select
                className={styles["field-select"]}
                value={collDeductible}
                onChange={(e) => updateDeductible("coll", e.target.value)}
              >
                {DEDUCTIBLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </WizardPage>
  );
};

export default CoverageStep;
