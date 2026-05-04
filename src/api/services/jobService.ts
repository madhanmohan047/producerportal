import axiosInstance from '../axiosInstance';

export interface JobType {
  code: string;
  name: string;
}

export interface Driver {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseState: string;
  licenseStatus: string;
}

export interface Vehicle {
  _id?: string;
  make: string;
  model: string;
  year: number;
  vin: string;
}

export interface UpdateJobPayload {
  jobType: JobType;
  drivers: Driver[];
  vehicles: Vehicle[];
}

export interface Job {
  id: string;
  jobId?: string;
  jobType?: JobType;
  drivers?: Driver[];
  vehicles?: Vehicle[];
  [key: string]: any;
}

export interface Coverage {
  id?: string;
  [key: string]: any;
}

class JobService {
  /**
   * Retrieve all jobs
   * GET /api/jobs
   */
  getAllJobs() {
    return axiosInstance.get<Job[]>('/api/jobs');
  }

  /**
   * Retrieve Job by ID
   * GET /api/jobs/{id}
   */
  getJobById(id: string) {
    return axiosInstance.get<Job>(`/api/jobs/${id}`);
  }

  /**
   * Update Job, Drivers, and Vehicles using Job ID
   * PUT /api/jobs/{jobId}
   */
  updateJob(jobId: string, jobData: UpdateJobPayload) {
    return axiosInstance.put<Job>(`/api/jobs/${jobId}`, jobData);
  }

  /**
   * Add a driver directly to a job by Job ID
   * POST /api/jobs/{jobId}/drivers
   */
  addDriverToJob(jobId: string, driverData: Driver) {
    return axiosInstance.post<Driver>(
      `/api/jobs/${jobId}/drivers`,
      driverData
    );
  }

  /**
   * Get all drivers for a specific job
   * GET /api/jobs/{jobId}/drivers
   */
  getJobDrivers(jobId: string) {
    return axiosInstance.get<Driver[]>(`/api/jobs/${jobId}/drivers`);
  }

  /**
   * Add a vehicle directly to a job by Job ID
   * POST /api/jobs/{jobId}/vehicles
   */
  addVehicleToJob(jobId: string, vehicleData: Vehicle) {
    return axiosInstance.post<Vehicle>(
      `/api/jobs/${jobId}/vehicles`,
      vehicleData
    );
  }

  /**
   * Get all vehicles for a specific job
   * GET /api/jobs/{jobId}/vehicles
   */
  getJobVehicles(jobId: string) {
    return axiosInstance.get<Vehicle[]>(`/api/jobs/${jobId}/vehicles`);
  }

  /**
   * Get all coverages and terms for a specific job
   * GET /api/jobs/{jobId}/coverages
   */
  getJobCoverages(jobId: string) {
    return axiosInstance.get<Coverage[]>(`/api/jobs/${jobId}/coverages`);
  }
}

const jobService = new JobService();
export default jobService;
