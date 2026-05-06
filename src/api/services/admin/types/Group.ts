import { Base } from '../../../utils/types';
import { ProducerCode } from './ProducerCode';
import { Organization } from './Organization';

export interface Group extends Base {
  name: string;
  producerCodes: string[] | ProducerCode[]; 
  organizations: string[] | Organization[]; 
}