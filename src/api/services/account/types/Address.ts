import { Base, TypeKeyValue } from '../../../utils/types';

export interface Address extends Base {
  addressLine1: string;
  city: string;
  state: TypeKeyValue;
  postalCode: string;
  country: TypeKeyValue;
}