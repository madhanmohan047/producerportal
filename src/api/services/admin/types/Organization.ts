import { Base } from '../../../utils/types';
import { Contact } from './../../account/types/Contact';
import { Address } from './../../account/types/Address';
import { Group } from './Group';
import { ProducerCode } from './ProducerCode';

export interface Organization extends Base {
  name: string;
  contact?: string | Contact; 
  address?: string | Address; 
  groups: string[] | Group[]; 
  producerCodes: string[] | ProducerCode[]; 
}

