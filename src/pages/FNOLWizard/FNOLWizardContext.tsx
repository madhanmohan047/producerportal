import React, { useEffect, useState, createContext, useContext } from "react";
import { WizardSidebarProps, WizardStep } from "../../types/Wizardtype";
import { Location } from "react-router-dom";

import {
  DamageInfo,
  DamageAreaOption,
} from "../../components/DamageComponent/DamageComponent";
import { Vehicle } from "../../api/services";
import { Claim } from "../../api/services/claim/types/Claim";
import { ClaimContact } from "../../api/services/claim/types/ClaimContact";
import { ClaimDocument } from "../../api/services/claim/types/ClaimDocument";

export type formData = {
  currentStep: WizardStep;
  location: Location;
  accountNumber?: string;
  policyNumber?: string;
  lineOfBusiness?: string;
  dateOfLoss?: string;
  timeOfLoss?: string;
  causeOfLoss?: string;
  vehicleInvolved?: Vehicle[];
  selectedVehicle?: string;
  locationType?: string;
  lossAddress?: any;
  injured?: boolean | null;
  policeReport?: boolean | null;
  description?: string;
  damagedAreas?: DamageAreaOption[];
  documentList?: ClaimDocument[];
  primaryClaimant?: ClaimContact;
  contacts?: ClaimContact[];
  damage?: DamageInfo;
  claimNumber?: string;
  submittedDate?: string;
  emailAddress?: string;
  sidebarProps?: WizardSidebarProps;
  currentClaim?: Claim;
};
type FNOLContextType = {
  fnolFormData: formData;
  setFnolFormData: React.Dispatch<React.SetStateAction<formData>>;
};
const FNOLWizardContext = createContext<FNOLContextType | undefined>(undefined);

type WizardProviderProps = {
  fnolFormData: formData;
  children: React.ReactNode;
};
export const FNOLWizardprovider = ({
  fnolFormData,
  children,
}: WizardProviderProps) => {
  const [formData, setFormData] = useState(fnolFormData);
  return (
    <FNOLWizardContext.Provider
      value={{ fnolFormData: formData, setFnolFormData: setFormData }}
    >
      {children}
    </FNOLWizardContext.Provider>
  );
};
export const useFNOLContext = () => {
  const fnolContext = useContext(FNOLWizardContext);
  if (!fnolContext) {
    throw new Error("Wrong FNOL context, try again!");
  }
  return fnolContext;
};
