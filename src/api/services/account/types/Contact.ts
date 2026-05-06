import { Base, TypeKeyValue } from '../../../utils/types';

export interface Contact extends Base {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  dob?: Date | string;
  phone?: string;
  type: TypeKeyValue;
  roles: TypeKeyValue[];
  email?: string;
}