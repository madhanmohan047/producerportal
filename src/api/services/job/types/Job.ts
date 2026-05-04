import type { JobType } from './JobType';
import type { Driver } from './Driver';
import type { Vehicle } from './Vehicle';

export interface Job {
  id: string;
  jobId?: string;
  jobType?: JobType;
  drivers?: Driver[];
  vehicles?: Vehicle[];
  [key: string]: any;
}
