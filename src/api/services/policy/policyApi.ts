import axiosInstance from "../../utils/axiosInstance";
import type { TypeKeyValue, ApiListResponse } from "../../utils/types";

export interface PolicyListItem {
  _id: string;
  jobNumber?: string;
  jobStatus?: { code: string; name: string };
  jobType?: { code: string; name: string };
  policyStatus?: { code: string; name: string };
  product?: { code: string; name: string };
  primaryInsured?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  account?: { _id?: string; accountNumber?: string; status?: { code: string; name: string } } | string;
  createdDate?: string;
  effectiveDate?: string;
  expirationDate?: string;
  premiumAmount?: number;
  vehicles?: string[];
  drivers?: string[];
  lineCoverages?: string[];
}

export interface PolicyApiJob {
  _id: string;
  jobNumber?: string;
  jobType?: TypeKeyValue;
  jobStatus?: TypeKeyValue;
  product?: TypeKeyValue;
  baseState?: TypeKeyValue;
  effectiveDate?: string;
}

export const getAllPolicies = () =>
  axiosInstance.get<ApiListResponse<PolicyListItem>>("/policies");

export const getPolicyById = (id: string) =>
  axiosInstance.get<{ success: boolean; data: any }>(`/policies/${id}`);
