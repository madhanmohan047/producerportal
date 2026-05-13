import { transport} from "../../utils/TransportService";
import type { Job, Driver, Vehicle, Coverage } from "./types";

const { api } = transport;

/**
 * Retrieve all jobs
 * GET /api/jobs
 */
export const getAllJobs = () => {
  return api.get<Array<Job>>("/jobs");
};

/**
 * Retrieve Job by ID
 * GET /api/jobs/{id}
 */
export const getJobById = (id: string) => {
  return api.get<Job>(`/jobs/${id}`);
};

/**
 * Update Job, Drivers, and Vehicles using Job ID
 * PUT /api/jobs/{jobId}
 */
export const updateJob = (jobId: string, jobData: Job) => {
  return api.put<Job>(`/jobs/${jobId}`, jobData);
};

/**
 * Add a driver directly to a job by Job ID
 * POST /api/jobs/{jobId}/drivers
 */
export const addDriverToJob = (jobId: string, driverData: Driver) => {
  return api.post<Driver>(`/jobs/${jobId}/drivers`, driverData);
};

/**
 * Get all drivers for a specific job
 * GET /api/jobs/{jobId}/drivers
 */
export const getJobDrivers = (jobId: string) => {
  return api.get<Driver[]>(`/jobs/${jobId}/drivers`);
};

/**
 * Add a vehicle directly to a job by Job ID
 * POST /api/jobs/{jobId}/vehicles
 */
export const addVehicleToJob = (jobId: string, vehicleData: Vehicle) => {
  return api.post<Vehicle>(`/jobs/${jobId}/vehicles`, vehicleData);
};

/**
 * Get all vehicles for a specific job
 * GET /api/jobs/{jobId}/vehicles
 */
export const getJobVehicles = (jobId: string) => {
  return api.get<Vehicle[]>(`/jobs/${jobId}/vehicles`);
};

/**
 * Get all coverages and terms for a specific job
 * GET /api/jobs/{jobId}/coverages
 */
export const getJobCoverages = (jobId: string) => {
  return api.get<Coverage[]>(`/jobs/${jobId}/coverages`);
};
