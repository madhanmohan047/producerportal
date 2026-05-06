import { Base } from '../../../utils/types';

export interface Term extends Base {
  name?: string;
  covTermType?: string;
  choiceValue?: any;
  booleanValue?: boolean;
  stringValue?: string;
  directValue?: string;
  dateValue?: string;
  createdBy?: string;
}

export interface Coverage extends Base {
  category?: string;
  selected: boolean;
  terms: string[] | Term[]; 
  createdBy?: string;
}