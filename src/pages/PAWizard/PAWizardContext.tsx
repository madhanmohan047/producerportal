import React, { createContext, useContext, useState } from "react";
import { Contact } from "../../api/services/account/types/Contact";
import { Address } from "../../api/services/account/types/Address";
import { Driver } from "../../api/services/job/types/Driver";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { TypeKeyValue } from "../../api/utils/types";
import { WizardSidebarProps } from "../../types/Wizardtype";

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

export const initialPAFormData: PAFormData = {
  drivers: [],
  vehicles: [],
};
