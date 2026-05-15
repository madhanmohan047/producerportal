import React, { useEffect, useState, createContext, useContext } from "react";
import { WizardSidebarProps, WizardStep } from "../../types/Wizardtype";
import { Location } from "react-router-dom";
import { DamageAreaOption } from "../../components/DamageComponent/DamageComponent";

export type formData = {
  currentStep: WizardStep;
  location: Location;
  accountNumber?: string;
  policyNumber?: string;
  lineOfBusiness?: string;
  dateOfLoss?: string;
  timeOfLoss?: string;
  causeOfLoss?: string;
  vehicleInvolved?: string;
  locationType?: string;
  lossAddress?: any;
  injured?: boolean | null;
  policeReport?: boolean | null;
  description?: string;
  damagedAreas?: DamageAreaOption[];
  documentList?: File[];
  sidebarProps?: WizardSidebarProps;
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
