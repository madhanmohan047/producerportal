import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPolicyById, PolicyApiJob } from "../../api/services/policy/policyApi";
import { getAccountById } from "../../api/services/account/accountApi";
import type { AccountHolder } from "../../api/services/account/types";
import type { TypeKeyValue } from "../../api/utils/types";

export interface Policy {
  _id: string;
  policyStatus: TypeKeyValue;
  product: TypeKeyValue;
  baseState: TypeKeyValue;
  preferredCoverageCurrency: TypeKeyValue;
  uwCompany?: TypeKeyValue;
  effectiveDate?: string;
  expirationDate?: string;
  issuedDate?: string;
  premiumAmount?: number;
  taxAmount?: number;
  totalAmount?: number;
  drivers: string[];
  vehicles: string[];
  lineCoverages: string[];
  jobs: PolicyApiJob[];
  account: { _id: string; accountNumber: string; status: TypeKeyValue } | null;
  primaryInsured: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    type?: string;
  } | null;
}

export const fmt = (val?: string) => (val ? new Date(val).toLocaleDateString() : "—");
export const money = (val?: number) =>
  val != null ? `$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "—";

export function usePolicySummary() {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No policy ID provided.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const policyRes = await getPolicyById(id);
        const raw = (policyRes.data as any)?.data ?? policyRes.data;
        const found = Array.isArray(raw) ? raw[0] : raw;
        if (!found) {
          setError("Policy not found.");
          return;
        }

        let holderObj: AccountHolder | null = null;
        let accountView: Policy["account"] = null;

        const accountId =
          typeof found.account === "string" ? found.account : found.account?._id;
        if (accountId) {
          try {
            const accRes = await getAccountById(accountId);
            const accRaw = (accRes.data as any)?.data ?? accRes.data;
            const account = Array.isArray(accRaw) ? accRaw[0] : accRaw;
            if (account) {
              accountView = {
                _id: account._id,
                accountNumber: account.accountNumber,
                status: account.status,
              };
              if (account.accountHolder && typeof account.accountHolder !== "string") {
                holderObj = account.accountHolder as AccountHolder;
              }
            }
          } catch {
            // account fetch failed — continue without it
          }
        }

        setPolicy({
          _id: found._id,
          policyStatus: found.policyStatus,
          product: found.product,
          baseState: found.baseState,
          preferredCoverageCurrency: found.preferredCoverageCurrency,
          uwCompany: found.uwCompany,
          effectiveDate: found.effectiveDate,
          expirationDate: found.expirationDate,
          issuedDate: found.issuedDate,
          premiumAmount: found.premiumAmount,
          taxAmount: found.taxAmount,
          totalAmount: found.totalAmount,
          drivers: found.drivers ?? [],
          vehicles: found.vehicles ?? [],
          lineCoverages: found.lineCoverages ?? [],
          jobs: found.jobs ?? [],
          account: accountView,
          primaryInsured: holderObj
            ? {
                firstName: holderObj.firstName,
                lastName: holderObj.lastName,
                email: holderObj?.emailAddress,
                phone: holderObj?.workPhone ?? holderObj.homePhone ?? holderObj.cellPhone,
                type: holderObj.type?.name,
              }
            : null,
        });
      } catch {
        setError("Failed to load policy.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { policy, loading, error };
}
