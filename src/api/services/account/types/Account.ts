import { Base, TypeKeyValue } from "../../../utils/types";
import { Organization, ProducerCode } from "./../../admin/types";
import { Address } from "./Address";
import { Contact } from "./Contact";

export interface AccountHolder extends Contact {}

export interface PrimaryLocation extends Address {}

export interface Account extends Base {
  _id: string;
  accountNumber?: string;
  accountHolder: AccountHolder;
  primaryLocation: PrimaryLocation;
  status: TypeKeyValue;
  organization: string | Organization;
  producerCode: string | ProducerCode;
  createdBy?: string;
}
