import { Base } from '../../../utils/types';
import { Contact } from './../../account/types/Contact';

export interface Driver extends Base {
  contactId: string | Contact; 
  licenseNumber?: string;
  licenseState?: string;
  licenseStatus?: string;
  yearsOfExperience?: number;
  violations: string[];
}