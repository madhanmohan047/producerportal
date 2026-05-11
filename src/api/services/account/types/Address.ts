import { Base, TypeKeyValue } from "../../../utils/types";

export interface Address extends Base {
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  state: TypeKeyValue;
  postalCode: string;
  country: TypeKeyValue;
  addressType: TypeKeyValue;
}
