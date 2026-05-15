import { transport} from "../../utils/TransportService";
import type {
  Organization,
  Group,
  ProducerCode,
  User,
} from "./types";

const { api } = transport;

/**
 * Retrieve all organizations
 * GET /api/organizations
 */
export const getAllOrganizations = () => {
  return api.get<Organization[]>("/admin/organizations");
};

/**
 * Create an organization with address and contact
 * POST /api/organizations
 */
export const createOrganization = (organizationData: Organization) => {
  return api.post<Organization>("/admin/organizations", organizationData);
};

/**
 * Get organization by ID
 * GET /api/organizations/{id}
 */
export const getOrganizationById = (id: string) => {
  return api.get<Organization>(`/admin/organizations/${id}`);
};

/**
 * Update organization
 * PUT /api/organizations/{id}
 */
export const updateOrganization = (id: string, organizationData: Organization) => {
  return api.put<Organization>(`/admin/organizations/${id}`, organizationData);
};

/**
 * Delete organization and clean references
 * DELETE /api/organizations/{id}
 */
export const deleteOrganization = (id: string) => {
  return api.delete<void>(`/admin/organizations/${id}`);
};

/**
 * Retrieve all groups
 * GET /api/groups
 */
export const getAllGroups = () => {
  return api.get<Group[]>("/admin/groups");
};

/**
 * Create a group
 * POST /api/groups
 */
export const createGroup = (groupData: Group) => {
  return api.post<Group>("/admin/groups", groupData);
};

/**
 * Get group by ID
 * GET /api/groups/{id}
 */
export const getGroupById = (id: string) => {
  return api.get<Group>(`/admin/groups/${id}`);
};

/**
 * Update group and sync organizations
 * PUT /api/groups/{id}
 */
export const updateGroup = (id: string, groupData: Group) => {
  return api.put<Group>(`/admin/groups/${id}`, groupData);
};

/**
 * Delete group and clean org references
 * DELETE /api/groups/{id}
 */
export const deleteGroup = (id: string) => {
  return api.delete<void>(`/admin/groups/${id}`);
};

/**
 * Retrieve all producer codes
 * GET /api/producercodes
 */
export const getAllProducerCodes = () => {
  return api.get<ProducerCode[]>("/admin/producercodes");
};

/**
 * Create producer code and link to organization
 * POST /api/producercodes
 */
export const createProducerCode = (producerCodeData: ProducerCode) => {
  return api.post<ProducerCode>("/admin/producercodes", producerCodeData);
};

/**
 * Update producer code and sync organization
 * PUT /api/producercodes/{id}
 */
export const updateProducerCode = (id: string, producerCodeData: ProducerCode) => {
  return api.put<ProducerCode>(`/admin/producercodes/${id}`, producerCodeData);
};

/**
 * Delete producer code and clean references
 * DELETE /api/producercodes/{id}
 */
export const deleteProducerCode = (id: string) => {
  return api.delete<void>(`/admin/producercodes/${id}`);
};

/**
 * Retrieve all users
 * GET /api/users
 */
export const getAllUsers = () => {
  return api.get<User[]>("/admin/users");
};

/**
 * Retrieve current user
 * GET /api/user
 */
export const getUser = () => {
  return api.get<User[]>("/admin/user");
};

/**
 * Create a user
 * POST /api/users
 */
export const createUser = (userData: User) => {
  return api.post<User>("/admin/users", userData);
};

/**
 * Update user
 * PUT /api/users/{id}
 */
export const updateUser = (id: string, userData: User) => {
  return api.put<User>(`/admin/users/${id}`, userData);
};

/**
 * Delete user
 * DELETE /api/users/{id}
 */
export const deleteUser = (id: string) => {
  return api.delete<void>(`/admin/users/${id}`);
};
