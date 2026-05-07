import axiosInstance from "../../utils/axiosInstance";
import type {
  Organization,
  Group,
  ProducerCode,
  User,
} from "./types";

/**
 * Retrieve all organizations
 * GET /api/organizations
 */
export const getAllOrganizations = () => {
  return axiosInstance.get<Organization[]>("/admin/organizations");
};

/**
 * Create an organization with address and contact
 * POST /api/organizations
 */
export const createOrganization = (organizationData: Organization) => {
  return axiosInstance.post<Organization>("/admin/organizations", organizationData);
};

/**
 * Get organization by ID
 * GET /api/organizations/{id}
 */
export const getOrganizationById = (id: string) => {
  return axiosInstance.get<Organization>(`/admin/organizations/${id}`);
};

/**
 * Update organization
 * PUT /api/organizations/{id}
 */
export const updateOrganization = (id: string, organizationData: Organization) => {
  return axiosInstance.put<Organization>(`/admin/organizations/${id}`, organizationData);
};

/**
 * Delete organization and clean references
 * DELETE /api/organizations/{id}
 */
export const deleteOrganization = (id: string) => {
  return axiosInstance.delete<void>(`/admin/organizations/${id}`);
};

/**
 * Retrieve all groups
 * GET /api/groups
 */
export const getAllGroups = () => {
  return axiosInstance.get<Group[]>("/admin/groups");
};

/**
 * Create a group
 * POST /api/groups
 */
export const createGroup = (groupData: Group) => {
  return axiosInstance.post<Group>("/admin/groups", groupData);
};

/**
 * Get group by ID
 * GET /api/groups/{id}
 */
export const getGroupById = (id: string) => {
  return axiosInstance.get<Group>(`/admin/groups/${id}`);
};

/**
 * Update group and sync organizations
 * PUT /api/groups/{id}
 */
export const updateGroup = (id: string, groupData: Group) => {
  return axiosInstance.put<Group>(`/admin/groups/${id}`, groupData);
};

/**
 * Delete group and clean org references
 * DELETE /api/groups/{id}
 */
export const deleteGroup = (id: string) => {
  return axiosInstance.delete<void>(`/admin/groups/${id}`);
};

/**
 * Retrieve all producer codes
 * GET /api/producercodes
 */
export const getAllProducerCodes = () => {
  return axiosInstance.get<ProducerCode[]>("/admin/producercodes");
};

/**
 * Create producer code and link to organization
 * POST /api/producercodes
 */
export const createProducerCode = (producerCodeData: ProducerCode) => {
  return axiosInstance.post<ProducerCode>("/admin/producercodes", producerCodeData);
};

/**
 * Update producer code and sync organization
 * PUT /api/producercodes/{id}
 */
export const updateProducerCode = (id: string, producerCodeData: ProducerCode) => {
  return axiosInstance.put<ProducerCode>(`/admin/producercodes/${id}`, producerCodeData);
};

/**
 * Delete producer code and clean references
 * DELETE /api/producercodes/{id}
 */
export const deleteProducerCode = (id: string) => {
  return axiosInstance.delete<void>(`/admin/producercodes/${id}`);
};

/**
 * Retrieve all users
 * GET /api/users
 */
export const getAllUsers = () => {
  return axiosInstance.get<User[]>("/admin/users");
};

/**
 * Create a user
 * POST /api/users
 */
export const createUser = (userData: User) => {
  return axiosInstance.post<User>("/admin/users", userData);
};

/**
 * Update user
 * PUT /api/users/{id}
 */
export const updateUser = (id: string, userData: User) => {
  return axiosInstance.put<User>(`/admin/users/${id}`, userData);
};

/**
 * Delete user
 * DELETE /api/users/{id}
 */
export const deleteUser = (id: string) => {
  return axiosInstance.delete<void>(`/admin/users/${id}`);
};
