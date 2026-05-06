import { Base } from '../../../utils/types';

export interface Vehicle extends Base {
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  color?: string;
  costNew?: number;
}