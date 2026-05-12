import axiosInstance from "../../utils/axiosInstance";


import type {
  Job,
  Driver,
  Vehicle,
  Coverage,
} from "./types";
import type { ApiListResponse } from "../../utils/types";


/**
 * Retrieve all jobs
 * GET /api/jobs
 */
export const getAllJobs = () => {
  return axiosInstance.get<ApiListResponse<Job>>("/jobs");
};

/**
 * Retrieve Job by ID
 * GET /api/jobs/{id}
 */
export const getJobById = (id: string) => {
  return axiosInstance.get<Job>(`/jobs/${id}`);
};

/**
 * Update Job, Drivers, and Vehicles using Job ID
 * PUT /api/jobs/{jobId}
 */
export const updateJob = (jobId: string, jobData: Job) => {
  return axiosInstance.put<Job>(`/jobs/${jobId}`, jobData);
};

/**
 * Add a driver directly to a job by Job ID
 * POST /api/jobs/{jobId}/drivers
 */
export const addDriverToJob = (jobId: string, driverData: Driver) => {
  return axiosInstance.post<Driver>(`/jobs/${jobId}/drivers`, driverData);
};

/**
 * Get all drivers for a specific job
 * GET /api/jobs/{jobId}/drivers
 */
export const getJobDrivers = (jobId: string) => {
  return axiosInstance.get<Driver[]>(`/jobs/${jobId}/drivers`);
};

/**
 * Add a vehicle directly to a job by Job ID
 * POST /api/jobs/{jobId}/vehicles
 */
export const addVehicleToJob = (jobId: string, vehicleData: Vehicle) => {
  return axiosInstance.post<Vehicle>(`/jobs/${jobId}/vehicles`, vehicleData);
};

/**
 * Get all vehicles for a specific job
 * GET /api/jobs/{jobId}/vehicles
 */
export const getJobVehicles = (jobId: string) => {
  return axiosInstance.get<Vehicle[]>(`/jobs/${jobId}/vehicles`);
};

/**
 * Get all coverages and terms for a specific job
 * GET /api/jobs/{jobId}/coverages
 */
export const getJobCoverages = (jobId: string) => {
  return axiosInstance.get<Coverage[]>(`/jobs/${jobId}/coverages`);
};
