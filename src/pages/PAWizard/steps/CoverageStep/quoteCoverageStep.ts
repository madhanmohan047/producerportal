export type CoverageLineItem = {
  id: string;
  name: string;
  description: string;
  monthlyRate: number;
  required: boolean;
  selected: boolean;
};

export type DiscountItem = {
  id: string;
  name: string;
  annualValue: number;
};

export type PremiumSummary = {
  monthlySubtotal: number;
  annualSubtotal: number;
  totalDiscountAnnual: number;
  monthlyTotal: number;
  annualTotal: number;
};

export const DEFAULT_COVERAGES: CoverageLineItem[] = [
  { id: "liability",     name: "Liability BI/PD", description: "Required — 100/300/100 limit",    monthlyRate: 42, required: true,  selected: true  },
  { id: "pip",           name: "PIP",              description: "Required in TX — $2,500 medical", monthlyRate: 18, required: true,  selected: true  },
  { id: "umUim",         name: "UM/UIM",           description: "Uninsured Motorist coverage",     monthlyRate: 14, required: false, selected: true  },
  { id: "comprehensive", name: "Comprehensive",    description: "$500 deductible",                 monthlyRate: 28, required: false, selected: true  },
  { id: "collision",     name: "Collision",        description: "$500 deductible",                 monthlyRate: 54, required: false, selected: true  },
  { id: "rental",        name: "Rental",           description: "$40/day, 30 days max",            monthlyRate: 8,  required: false, selected: false },
  { id: "roadside",      name: "Roadside",         description: "Towing, battery, lockout",        monthlyRate: 6,  required: false, selected: false },
  { id: "gap",           name: "GAP",              description: "Loan / lease gap coverage",       monthlyRate: 12, required: false, selected: false },
];

export const DEFAULT_DISCOUNTS: DiscountItem[] = [
  { id: "multiPolicy", name: "Multi-Policy", annualValue: 18 },
  { id: "goodDriver",  name: "Good Driver",  annualValue: 22 },
  { id: "paidInFull",  name: "Paid-In-Full", annualValue: 15 },
];

export const COMP_DEDUCTIBLE_RATES: Record<string, number> = {
  "$250":  36,
  "$500":  28,
  "$1,000": 22,
  "$2,000": 14,
};

export const COLL_DEDUCTIBLE_RATES: Record<string, number> = {
  "$250":  66,
  "$500":  54,
  "$1,000": 44,
  "$2,000": 30,
};

export const LIABILITY_LIMIT_OPTIONS = ["50/100/50", "100/300/100", "250/500/250"];
export const DEDUCTIBLE_OPTIONS = ["$250", "$500", "$1,000", "$2,000"];

export const computePremium = (
  coverages: CoverageLineItem[],
  discounts: DiscountItem[]
): PremiumSummary => {
  const monthlySubtotal = coverages
    .filter((c) => c.selected)
    .reduce((sum, c) => sum + c.monthlyRate, 0);
  const annualSubtotal = monthlySubtotal * 12;
  const totalDiscountAnnual = discounts.reduce((sum, d) => sum + d.annualValue, 0);
  const annualTotal = annualSubtotal - totalDiscountAnnual;
  const monthlyTotal = annualTotal / 12;
  return { monthlySubtotal, annualSubtotal, totalDiscountAnnual, monthlyTotal, annualTotal };
};
