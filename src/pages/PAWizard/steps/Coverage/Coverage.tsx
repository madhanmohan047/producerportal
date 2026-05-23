import { useEffect, useMemo, useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import {
  PACoverageOption,
  PAPremiumEstimate,
  usePAContext,
} from "../../PAWizardContext";
import styles from "./Coverage.module.scss";

const coverageOptions: PACoverageOption[] = [
  {
    id: "liability",
    name: "Liability BI/PD",
    description: "Required - 100/300/100 limit",
    monthlyPremium: 42,
    required: true,
  },
  {
    id: "pip",
    name: "PIP",
    description: "Required in TX - $2,500 medical",
    monthlyPremium: 18,
    required: true,
  },
  {
    id: "um-uim",
    name: "UM/UIM",
    description: "Uninsured Motorist coverage",
    monthlyPremium: 14,
  },
  {
    id: "comprehensive",
    name: "Comprehensive",
    description: "$500 deductible",
    monthlyPremium: 28,
  },
  {
    id: "collision",
    name: "Collision",
    description: "$500 deductible",
    monthlyPremium: 54,
  },
  {
    id: "rental",
    name: "Rental",
    description: "$40/day, 30 days max",
    monthlyPremium: 8,
  },
  {
    id: "roadside",
    name: "Roadside",
    description: "Towing, battery, lockout",
    monthlyPremium: 6,
  },
  {
    id: "gap",
    name: "GAP",
    description: "Loan / lease gap coverage",
    monthlyPremium: 12,
  },
];

const requiredCoverageIds = coverageOptions
  .filter((coverage) => coverage.required)
  .map((coverage) => coverage.id);

const defaultSelectedCoverageIds = [
  ...requiredCoverageIds,
  "comprehensive",
  "collision",
  "roadside",
];

const calculatePremium = (
  selectedCoverages: PACoverageOption[],
  liabilityLimits: string,
  comprehensiveDeductible: string,
  collisionDeductible: string,
): PAPremiumEstimate => {
  const baseMonthlyPremium = selectedCoverages.reduce(
    (total, coverage) => total + coverage.monthlyPremium,
    0,
  );
  const discountMonthly = selectedCoverages.length >= 5 ? 5 : 0;
  const estimatedMonthlyPremium = Math.max(
    baseMonthlyPremium - discountMonthly,
    0,
  );

  return {
    baseMonthlyPremium,
    discountMonthly,
    estimatedMonthlyPremium,
    estimatedAnnualPremium: estimatedMonthlyPremium * 12,
    selectedCoverages,
    liabilityLimits,
    comprehensiveDeductible,
    collisionDeductible,
  };
};

const Coverage = (wizardPageProps: WizardPageProps) => {
  const { paFormData, setPAFormData } = usePAContext();
  const [selectedCoverageIds, setSelectedCoverageIds] = useState<string[]>(
    paFormData.selectedCoverageIds ?? defaultSelectedCoverageIds,
  );
  const [liabilityLimits, setLiabilityLimits] = useState(
    paFormData.liabilityLimits ?? "100/300/100",
  );
  const [comprehensiveDeductible, setComprehensiveDeductible] = useState(
    paFormData.comprehensiveDeductible ?? "$500",
  );
  const [collisionDeductible, setCollisionDeductible] = useState(
    paFormData.collisionDeductible ?? "$500",
  );

  const selectedCoverages = useMemo(
    () =>
      coverageOptions.filter((coverage) =>
        selectedCoverageIds.includes(coverage.id),
      ),
    [selectedCoverageIds],
  );

  const premiumEstimate = useMemo(
    () =>
      calculatePremium(
        selectedCoverages,
        liabilityLimits,
        comprehensiveDeductible,
        collisionDeductible,
      ),
    [
      collisionDeductible,
      comprehensiveDeductible,
      liabilityLimits,
      selectedCoverages,
    ],
  );

  useEffect(() => {
    setPAFormData((prev) => ({
      ...prev,
      selectedCoverageIds,
      liabilityLimits,
      comprehensiveDeductible,
      collisionDeductible,
      premiumEstimate,
      sidebarProps: {
        title: "Policy Summary",
        sidebaritems: [
          {
            transformationKey: "Drivers",
            transformationLabel: `${(prev.drivers?.length ?? 0) + 1} listed`,
          },
          {
            transformationKey: "Vehicles",
            transformationLabel: `${prev.vehicles?.length ?? 0} listed`,
          },
        ],
      },
    }));
  }, [
    collisionDeductible,
    comprehensiveDeductible,
    liabilityLimits,
    premiumEstimate,
    selectedCoverageIds,
    setPAFormData,
  ]);

  const toggleCoverage = (coverage: PACoverageOption) => {
    if (coverage.required) return;

    setSelectedCoverageIds((current) =>
      current.includes(coverage.id)
        ? current.filter((id) => id !== coverage.id)
        : [...current, coverage.id],
    );
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles.coveragePage}>
        <p className={styles.subtitle}>
          Select coverages and set limits. Required coverages are pre-selected.
        </p>

        <div className={styles.coverageGrid}>
          {coverageOptions.map((coverage) => {
            const isSelected = selectedCoverageIds.includes(coverage.id);

            return (
              <button
                key={coverage.id}
                type="button"
                className={`${styles.coverageCard} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => toggleCoverage(coverage)}
                aria-pressed={isSelected}
              >
                <span>
                  <strong>{coverage.name}</strong>
                  <small>{coverage.description}</small>
                </span>
                <strong className={styles.price}>
                  ${coverage.monthlyPremium}/mo
                </strong>
              </button>
            );
          })}
        </div>

        <div className={styles.deductibles}>
          <h3>Deductibles</h3>

          <div className={styles.deductibleGrid}>
            <label>
              Liability Limits
              <select
                value={liabilityLimits}
                onChange={(event) => setLiabilityLimits(event.target.value)}
              >
                <option value="50/100/50">50/100/50</option>
                <option value="100/300/100">100/300/100</option>
                <option value="250/500/250">250/500/250</option>
              </select>
            </label>

            <label>
              Comp Deductible
              <select
                value={comprehensiveDeductible}
                onChange={(event) =>
                  setComprehensiveDeductible(event.target.value)
                }
              >
                <option value="$250">$250</option>
                <option value="$500">$500</option>
                <option value="$1,000">$1,000</option>
              </select>
            </label>

            <label>
              Coll Deductible
              <select
                value={collisionDeductible}
                onChange={(event) => setCollisionDeductible(event.target.value)}
              >
                <option value="$250">$250</option>
                <option value="$500">$500</option>
                <option value="$1,000">$1,000</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </WizardPage>
  );
};

export default Coverage;
