import type { JobType } from './JobType';
import type { Driver } from './Driver';
import type { Vehicle } from './Vehicle';

export interface UpdateJobPayload {
  jobType: JobType;
  drivers: Driver[];
  vehicles: Vehicle[];
}
