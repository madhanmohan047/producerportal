import { Coverage, Driver, Job, Vehicle } from "../../job/types";
import { Account, Address, Contact } from "../../account/types";
import { TypeKeyValue } from "../../../utils/types";

export interface Policy {
  _id: string;
  policyNumber?: string;
  jobs: Job[];
  policyStatus: TypeKeyValue;
  premiumAmount?: number;
  taxAmount?: number;
  totalAmount?: number;
  issuedDate?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  account: Account;
  product: TypeKeyValue;
  baseState: TypeKeyValue;
  preferredCoverageCurrency: TypeKeyValue;
  uwCompany?: TypeKeyValue;
  organization: string;
  producerCode: string;
  primaryAddress?: Address;
  primaryInsured?: Contact;
  drivers: Driver[];
  vehicles: Vehicle[];
  lineCoverages: Coverage[];
  effectiveDate: Date | string;
  expirationDate: Date | string;
}
