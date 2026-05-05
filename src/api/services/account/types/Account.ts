import { Address } from "./Address";
import { Contact } from "./Contact";

export interface AccountHolder extends Contact {
  _id: string;
  roles: string[];
  phone?: string;
}

export interface PrimaryLocation extends Address {
  _id: string;
}

export interface Account {
  _id: string;
  accountNumber: string;
  accountHolderId: AccountHolder;
  primaryLocationId: PrimaryLocation;
  producerCode: string;
  type: string;
  status: string;
  organization: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}