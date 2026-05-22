import React, { createContext, useContext, useState } from "react";
import { Contact } from "../../api/services/account/types/Contact";
import { Address } from "../../api/services/account/types/Address";
import { Driver } from "../../api/services/job/types/Driver";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { TypeKeyValue } from "../../api/utils/types";
import { WizardSidebarProps } from "../../types/Wizardtype";

export type PACoverageOption = {
  id: string;
  name: string;
  description: string;
  monthlyPremium: number;
  required?: boolean;
};

export type PAPremiumEstimate = {
  baseMonthlyPremium: number;
  discountMonthly: number;
  estimatedMonthlyPremium: number;
  estimatedAnnualPremium: number;
  selectedCoverages: PACoverageOption[];
  liabilityLimits: string;
  comprehensiveDeductible: string;
  collisionDeductible: string;
};

export type PAFormData = {
  // Job
  jobId?: string;

  // Account & named insured
  accountId?: string;
  accountNumber?: string;
  organizationId?: string;
  producerCodeId?: string;
  primaryContact?: Contact;
  mailingAddress?: Address;

  // Policy / LOB
  effectiveDate?: string;
  expirationDate?: string;
  baseState?: TypeKeyValue;
  uwCompany?: TypeKeyValue;

  // Drivers & Vehicles
  drivers: Driver[];
  vehicles: Vehicle[];

  // Risk info
  coverageType?: string;
  deductible?: string;
  selectedCoverageIds?: string[];
  liabilityLimits?: string;
  comprehensiveDeductible?: string;
  collisionDeductible?: string;
  premiumEstimate?: PAPremiumEstimate;

  // Quote
  selectedQuote?: string;

  // Documents
  documents?: File[];

  // Confirmation
  policyNumber?: string;

  // Sidebar display
  sidebarProps?: WizardSidebarProps;
};

type PAContextType = {
  paFormData: PAFormData;
  setPAFormData: React.Dispatch<React.SetStateAction<PAFormData>>;
};

const PAWizardContext = createContext<PAContextType | undefined>(undefined);

type PAWizardProviderProps = {
  paFormData: PAFormData;
  children: React.ReactNode;
};

const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

export const PAWizardProvider = ({ paFormData, children }: PAWizardProviderProps) => {
  const [formData, setFormData] = useState<PAFormData>(paFormData);
  return (
    <PAWizardContext.Provider value={{ paFormData: formData, setPAFormData: setFormData }}>
      {children}
    </PAWizardContext.Provider>
  );
};

export const usePAContext = () => {
  const ctx = useContext(PAWizardContext);
  if (!ctx) throw new Error("usePAContext must be used within a PAWizardProvider");
  return ctx;
};

export const createInitialPAFormData = (): PAFormData => ({
  effectiveDate: formatDate(new Date()),
  drivers: [],
  vehicles: [],
});

export const initialPAFormData: PAFormData = createInitialPAFormData();
