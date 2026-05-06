import { Base, TypeKeyValue } from '../../../utils/types';
import { Organization } from './Organization';
import { ProducerCode } from './ProducerCode';

export interface User extends Base {
  userName?: string;
  password?: string;
  firstName: string;
  lastName: string;
  type: TypeKeyValue;
  status: TypeKeyValue;
  organization?: string | Organization; 
  producerCode?: string | ProducerCode; 
  createdBy?: string | User; 
}