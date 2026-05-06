import { Base, TypeKeyValue } from '../../../utils/types';

export interface Address extends Base {
  addressLine1: string;
    addressLine2: string;
    city: string;
    county: string;
    state: string;
    postalCode: string;
    country: string;
    addressType: string;
}