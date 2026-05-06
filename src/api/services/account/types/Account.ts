import { Base, TypeKeyValue } from '../../../utils/types';
import { Organization, ProducerCode } from './../../admin/types';
import { Address } from "./Address";
import { Contact } from "./Contact";

export interface AccountHolder extends Contact {
}

export interface PrimaryLocation extends Address {
}

export interface Account extends Base {
  accountNumber?: string;
  accountHolder: AccountHolder; 
  primaryLocation: PrimaryLocation; 
  status: TypeKeyValue;
  organization: string | Organization; 
  producerCode: string | ProducerCode; 
  createdBy?: string;
}

