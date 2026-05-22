import { CoverageLineItem, DiscountItem, PremiumSummary } from "../CoverageStep/quoteCoverageStep";

interface QuoteTemplateData {
  insuredName: string;
  vehicleDesc: string;
  effectiveDate?: string;
  coverages: CoverageLineItem[];
  discounts: DiscountItem[];
  premium: PremiumSummary;
}

export function generateQuoteHTML(data: QuoteTemplateData): string {
  const { insuredName, vehicleDesc, effectiveDate, coverages, discounts, premium } = data;

  const selectedRows = coverages
    .filter((c) => c.selected)
    .map(
      (c) =>
        `<tr>
          <td>${c.name}${c.required ? ' <span class="badge">Required</span>' : ""}<br/><span class="desc">${c.description}</span></td>
          <td class="right blue">$${c.monthlyRate}/mo</td>
          <td class="right blue">$${c.monthlyRate * 12}/yr</td>
        </tr>`
    )
    .join("");

  const discountRows = discounts
    .map(
      (d) =>
        `<tr>
          <td>${d.name}</td>
          <td></td>
          <td class="right green">&#8722;$${d.annualValue}/yr</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><title>Quote Summary &#8211; ${insuredName}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; max-width: 660px; margin: 40px auto; color: #1e293b; font-size: 13px; }
  h1 { font-size: 20px; color: #1a2b45; border-bottom: 2px solid #1a2b45; padding-bottom: 10px; margin-bottom: 20px; }
  .meta { display: flex; gap: 28px; margin-bottom: 24px; flex-wrap: wrap; }
  .meta-item label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; display: block; margin-bottom: 2px; }
  .meta-item span { font-weight: 600; font-size: 13px; }
  h2 { font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: #94a3b8; margin: 24px 0 6px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 11px; color: #94a3b8; border-bottom: 1px solid #e2e8f0; padding: 6px 0; }
  td { padding: 9px 0; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  .right { text-align: right; white-space: nowrap; }
  .blue { color: #2563eb; font-weight: 600; }
  .green { color: #16a34a; font-weight: 600; }
  .desc { font-size: 11px; color: #94a3b8; }
  .badge { background: #dbeafe; color: #1d4ed8; font-size: 10px; padding: 1px 5px; border-radius: 3px; }
  .subtotal td { font-weight: 700; border-top: 1px solid #cbd5e1; border-bottom: 2px solid #cbd5e1; padding-top: 10px; }
  .totals-box { background: #1a2b45; color: #fff; border-radius: 8px; padding: 18px 24px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center; }
  .t-label { font-size: 11px; opacity: 0.65; margin-bottom: 4px; }
  .t-amount { font-size: 20px; font-weight: 700; }
</style></head><body>
<h1>Quote Summary</h1>
<div class="meta">
  <div class="meta-item"><label>Insured</label><span>${insuredName}</span></div>
  <div class="meta-item"><label>Vehicle</label><span>${vehicleDesc}</span></div>
  <div class="meta-item"><label>Effective Date</label><span>${effectiveDate ?? "—"}</span></div>
</div>
<h2>Coverage Breakdown</h2>
<table>
  <thead><tr><th>Coverage</th><th class="right">Monthly</th><th class="right">Annual</th></tr></thead>
  <tbody>
    ${selectedRows}
    <tr class="subtotal">
      <td>Subtotal</td>
      <td class="right blue">$${premium.monthlySubtotal}/mo</td>
      <td class="right blue">$${premium.annualSubtotal}/yr</td>
    </tr>
  </tbody>
</table>
<h2>Discounts Applied</h2>
<table>
  <thead><tr><th>Discount</th><th></th><th class="right">Annual Savings</th></tr></thead>
  <tbody>
    ${discountRows}
    <tr class="subtotal">
      <td>Total Discounts</td>
      <td></td>
      <td class="right green">&#8722;$${premium.totalDiscountAnnual}/yr</td>
    </tr>
  </tbody>
</table>
<div class="totals-box">
  <div><div class="t-label">Monthly Premium</div><div class="t-amount">$${premium.monthlyTotal.toFixed(2)}/mo</div></div>
  <div style="text-align:right"><div class="t-label">Annual Premium</div><div class="t-amount">$${premium.annualTotal.toFixed(2)}/yr</div></div>
</div>
</body></html>`;
}
