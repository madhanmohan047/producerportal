import type { Driver } from "./Driver";
import type { Vehicle } from "./Vehicle";
import { Base } from "../../../utils/types";
import { Account } from "../../account/types/Account";
import { TypeKeyValue } from '../../../utils/types';
import { Contact } from "../../account/types/Contact";
import { Address } from "../../account/types/Address";
import { Coverage } from "./Coverage";
import { Organization, ProducerCode } from "../../admin/types";

export interface Job extends Base {
  account: string | Account; 
  jobNumber?: string;
  jobStatus: TypeKeyValue;
  jobType: TypeKeyValue;
  product: TypeKeyValue;
  baseState: TypeKeyValue;
  preferredCoverageCurrency: TypeKeyValue;
  uwCompany?: TypeKeyValue;
  createdDate?: Date | string;
  effectiveDate: Date | string;
  organization: string | Organization; 
  producerCode: string | ProducerCode; 
  policyAddress?: string | Address; 
  primaryInsured?: string | Contact; 
  drivers: string[] | Driver[]; 
  vehicles: string[] | Vehicle[]; 
  lineCoverages: string[] | Coverage[]; 
  isUnderUWReview: boolean;
}