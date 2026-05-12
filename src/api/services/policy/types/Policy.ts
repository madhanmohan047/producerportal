import { Job } from "../../job/types";
import { Account, Contact } from "../../account/types";

export interface PolicyJob extends Job {}

export interface Policy {
  _id: string;
  jobNumber?: string;
  jobStatus?: { code: string; name: string };
  jobType?: { code: string; name: string };
  policyStatus?: { code: string; name: string };
  product?: { code: string; name: string };
  primaryInsured?: Contact;
  account?: Account;
  createdDate?: string;
  effectiveDate?: string;
  expirationDate?: string;
  premiumAmount?: number;
  vehicles?: string[];
  drivers?: string[];
  lineCoverages?: string[];
  baseState: { code: string; name: string };
  preferredCoverageCurrency: { code: string; name: string };
  jobs: PolicyJob[];
  totalAmount?: number;
  taxAmount?: number;
  status: { code: string; name: string };
  uwCompany?: { code: string; name: string };
  issuedDate?: string;
}