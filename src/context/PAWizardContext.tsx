import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import type { Account } from "../api/services/account/types";

type PAWizardContextType = {
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account | null) => void;
  accountHolderName: string;
  lob: string;
  setLob: (lob: string) => void;
  effectiveDate: string;
  setEffectiveDate: (date: string) => void;
  totalPremium: number | null;
  setTotalPremium: (premium: number | null) => void;
  driverCount: number;
  setDriverCount: (count: number) => void;
  vehicleCount: number;
  setVehicleCount: (count: number) => void;
};

const PAWizardContext = createContext<PAWizardContextType | null>(null);

export const PAWizardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [lob, setLob] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [totalPremium, setTotalPremium] = useState<number | null>(null);
  const [driverCount, setDriverCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);

  const accountHolderName = useMemo(() => {
    if (!selectedAccount) return "";
    const holder = selectedAccount.accountHolder;
    if (!holder) return "";
    return (
      holder.companyName ||
      `${holder.firstName ?? ""} ${holder.lastName ?? ""}`.trim() ||
      ""
    );
  }, [selectedAccount]);

  return (
    <PAWizardContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
        accountHolderName,
        lob,
        setLob,
        effectiveDate,
        setEffectiveDate,
        totalPremium,
        setTotalPremium,
        driverCount,
        setDriverCount,
        vehicleCount,
        setVehicleCount,
      }}
    >
      {children}
    </PAWizardContext.Provider>
  );
};

export const usePAWizard = (): PAWizardContextType => {
  const ctx = useContext(PAWizardContext);
  if (!ctx) throw new Error("usePAWizard must be used within PAWizardProvider");
  return ctx;
};
