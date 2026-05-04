import { Address } from "./Address";
import { Contact } from "./Contact";

export interface AccountHolder extends Contact {}
export interface PrimaryLocation extends Address {}

export interface Account {
  id: string;
  accountHolder: AccountHolder;
  primaryLocation: PrimaryLocation;
  producerCode: string;
  type: string;
  organization: string;
}