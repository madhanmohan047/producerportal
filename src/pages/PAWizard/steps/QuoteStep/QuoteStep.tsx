import { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTag, faCheck, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import {
  DEFAULT_COVERAGES,
  DEFAULT_DISCOUNTS,
  computePremium,
} from "../CoverageStep/quoteCoverageStep";
import messages from "./QuoteStep.messages";
import styles from "./QuoteStep.module.scss";
import { generateQuoteHTML } from "./quoteTemplate";

const QuoteStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();

  const coverages = paFormData.selectedCoverages ?? DEFAULT_COVERAGES;
  const discounts = DEFAULT_DISCOUNTS;
  const premium = useMemo(() => computePremium(coverages, discounts), [coverages]);

  useEffect(() => {
    setPAFormData((prev) => ({
      ...prev,
      selectedCoverages: prev.selectedCoverages ?? DEFAULT_COVERAGES,
      monthlyPremium: premium.monthlyTotal,
      annualPremium: premium.annualTotal,
      annualDiscount: premium.totalDiscountAnnual,
    }));
  }, [setPAFormData]);

  const handleDownload = () => {
    const contact = paFormData.primaryContact;
    const insuredName = contact
      ? [contact.firstName, contact.lastName].filter(Boolean).join(" ")
      : "Insured";
    const vehicle = paFormData.vehicles?.[0];
    const vehicleDesc = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "—";

    const html = generateQuoteHTML({
      insuredName,
      vehicleDesc,
      effectiveDate: paFormData.effectiveDate,
      coverages,
      discounts,
      premium,
    });

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.addEventListener("load", () => {
        win.print();
        URL.revokeObjectURL(url);
      });
    }
  };

  const selectedCoverages = coverages.filter((c) => c.selected);

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["quote-container"]}>

        <div className={styles["actions-row"]}>
          <p className={styles["subtitle"]}>
            {intl.formatMessage(messages.subtitle)}
          </p>
          <button className={styles["download-btn"]} onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} />
            {intl.formatMessage(messages.downloadQuote)}
          </button>
        </div>

        <section className={styles["table-section"]}>
          <div className={styles["section-label"]}>
            <FontAwesomeIcon icon={faShieldHalved} />
            {intl.formatMessage(messages.coverageBreakdown)}
          </div>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th className={styles["col-coverage"]}>{intl.formatMessage(messages.colCoverage)}</th>
                <th className={styles["col-num"]}>{intl.formatMessage(messages.colMonthlyRate)}</th>
                <th className={styles["col-num"]}>{intl.formatMessage(messages.colAnnualCost)}</th>
              </tr>
            </thead>
            <tbody>
              {selectedCoverages.map((cov) => (
                <tr key={cov.id} className={styles["data-row"]}>
                  <td className={styles["cov-cell"]}>
                    <div className={styles["cov-name-row"]}>
                      <span className={styles["cov-name"]}>{cov.name}</span>
                      {cov.required && (
                        <span className={styles["req-badge"]}>{intl.formatMessage(messages.required)}</span>
                      )}
                    </div>
                    <span className={styles["cov-desc"]}>{cov.description}</span>
                  </td>
                  <td className={styles["amount-cell"]}>
                    ${cov.monthlyRate}
                    <span className={styles["unit"]}>{intl.formatMessage(messages.unitMo)}</span>
                  </td>
                  <td className={styles["amount-cell"]}>
                    ${cov.monthlyRate * 12}
                    <span className={styles["unit"]}>{intl.formatMessage(messages.unitYr)}</span>
                  </td>
                </tr>
              ))}
              <tr className={styles["subtotal-row"]}>
                <td>{intl.formatMessage(messages.subtotal)}</td>
                <td className={styles["amount-cell"]}>
                  ${premium.monthlySubtotal}
                  <span className={styles["unit"]}>{intl.formatMessage(messages.unitMo)}</span>
                </td>
                <td className={styles["amount-cell"]}>
                  ${premium.annualSubtotal}
                  <span className={styles["unit"]}>{intl.formatMessage(messages.unitYr)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles["table-section"]}>
          <div className={styles["section-label"]}>
            <FontAwesomeIcon icon={faTag} />
            {intl.formatMessage(messages.discountsApplied)}
          </div>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th className={styles["col-coverage"]}>{intl.formatMessage(messages.discount)}</th>
                <th className={styles["col-num"]}></th>
                <th className={styles["col-num"]}>{intl.formatMessage(messages.colAnnualSavings)}</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((d) => (
                <tr key={d.id} className={styles["data-row"]}>
                  <td className={styles["cov-cell"]}>
                    <div className={styles["cov-name-row"]}>
                      <FontAwesomeIcon icon={faCheck} className={styles["check-icon"]} />
                      <span className={styles["cov-name"]}>{d.name}</span>
                    </div>
                  </td>
                  <td></td>
                  <td className={styles["discount-cell"]}>
                    &#8722;${d.annualValue}
                    <span className={styles["unit"]}>{intl.formatMessage(messages.unitYr)}</span>
                  </td>
                </tr>
              ))}
              <tr className={styles["subtotal-row"]}>
                <td>{intl.formatMessage(messages.totalDiscounts)}</td>
                <td></td>
                <td className={styles["discount-cell"]}>
                  &#8722;${premium.totalDiscountAnnual}
                  <span className={styles["unit"]}>{intl.formatMessage(messages.unitYr)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles["totals-section"]}>
          <div className={styles["section-label"]}>{intl.formatMessage(messages.finalPremium)}</div>
          <div className={styles["totals-card"]}>
            <div className={styles["total-item"]}>
              <span className={styles["total-label"]}>{intl.formatMessage(messages.monthlyTotal)}</span>
              <span className={styles["total-amount"]}>
                ${premium.monthlyTotal.toFixed(2)}
                <span className={styles["total-unit"]}>{intl.formatMessage(messages.unitMo)}</span>
              </span>
            </div>
            <div className={styles["total-divider"]} />
            <div className={styles["total-item"]}>
              <span className={styles["total-label"]}>{intl.formatMessage(messages.annualTotal)}</span>
              <span className={styles["total-amount"]}>
                ${premium.annualTotal.toFixed(2)}
                <span className={styles["total-unit"]}>{intl.formatMessage(messages.unitYr)}</span>
              </span>
            </div>
          </div>
        </section>

      </div>
    </WizardPage>
  );
};

export default QuoteStep;
