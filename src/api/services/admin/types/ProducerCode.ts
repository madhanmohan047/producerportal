import { Base } from '../../../utils/types';
import { Organization } from './Organization';

export interface ProducerCode extends Base {
  code: string;
  name: string;
  organization: string | Organization; 
}