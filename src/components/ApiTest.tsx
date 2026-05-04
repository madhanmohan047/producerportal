import React from 'react';
import { accountService, jobService } from '../api/services';
import { CreateAccountPayload } from '../api/services/accountService';
import { UpdateJobPayload, Driver, Vehicle } from '../api/services/jobService';

const ApiTest: React.FC = () => {
  const testGetAllAccounts = async () => {
    try {
      console.log('Testing: GET /api/accounts');
      const response = await accountService.getAllAccounts();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testCreateAccount = async () => {
    try {
      console.log('Testing: POST /api/accounts');
      const accountData: CreateAccountPayload = {
        accountHolder: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
        },
        primaryLocation: {
          addressLine1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
        },
        producerCode: 'PROD001',
        type: 'Personal',
        organization: 'Dunder Mifflin',
      };
      const response = await accountService.createAccount(accountData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetAccountById = async () => {
    try {
      console.log('Testing: GET /api/accounts/{id}');
      const accountId = 'AC-f2609f5c';
      const response = await accountService.getAccountById(accountId);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testCreateSubmission = async () => {
    try {
      console.log('Testing: POST /api/accounts/{accountId}/submissions');
      const accountId = 'AC-f2609f5c';
      const response = await accountService.createSubmission(accountId, {
        lobCode: 'PA',
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetAllJobs = async () => {
    try {
      console.log('Testing: GET /api/jobs');
      const response = await jobService.getAllJobs();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetJobById = async () => {
    try {
      console.log('Testing: GET /api/jobs/{id}');
      const jobId = '69f4d21b18c91bb5666130af';
      const response = await jobService.getJobById(jobId);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testUpdateJob = async () => {
    try {
      console.log('Testing: PUT /api/jobs/{jobId}');
      const jobId = '69f4d21b18c91bb5666130af';
      const jobData: UpdateJobPayload = {
        jobType: {
          code: 'submission',
          name: 'New Business',
        },
        drivers: [
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '555-0199',
            licenseNumber: 'ABC12345',
            licenseState: 'NY',
            licenseStatus: 'Valid',
          },
        ],
        vehicles: [
          {
            make: 'Toyota',
            model: 'Camry',
            year: 2024,
            vin: '1NX...',
          },
        ],
      };
      const response = await jobService.updateJob(jobId, jobData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testAddDriverToJob = async () => {
    try {
      console.log('Testing: POST /api/jobs/{jobId}/drivers');
      const jobId = '69f4d21b18c91bb5666130af';
      const driverData: Driver = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-0199',
        licenseNumber: 'ABC12345',
        licenseState: 'NY',
        licenseStatus: 'Valid',
      };
      const response = await jobService.addDriverToJob(jobId, driverData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetJobDrivers = async () => {
    try {
      console.log('Testing: GET /api/jobs/{jobId}/drivers');
      const jobId = '69f4d21b18c91bb5666130af';
      const response = await jobService.getJobDrivers(jobId);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testAddVehicleToJob = async () => {
    try {
      console.log('Testing: POST /api/jobs/{jobId}/vehicles');
      const jobId = '69f4d21b18c91bb5666130af';
      const vehicleData: Vehicle = {
        make: 'Toyota',
        model: 'Camry',
        year: 2024,
        vin: '1NX...',
      };
      const response = await jobService.addVehicleToJob(jobId, vehicleData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetJobVehicles = async () => {
    try {
      console.log('Testing: GET /api/jobs/{jobId}/vehicles');
      const jobId = '69f4d21b18c91bb5666130af';
      const response = await jobService.getJobVehicles(jobId);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testGetJobCoverages = async () => {
    try {
      console.log('Testing: GET /api/jobs/{jobId}/coverages');
      const jobId = '69f4d21b18c91bb5666130af';
      const response = await jobService.getJobCoverages(jobId);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Console</h1>
      <p>
        Open the browser console (F12) to see the API responses. Click the buttons
        below to test different endpoints.
      </p>

      <h2>Account APIs</h2>
      <button onClick={testGetAllAccounts}>GET /api/accounts</button>
      <button onClick={testCreateAccount}>POST /api/accounts</button>
      <button onClick={testGetAccountById}>GET /api/accounts/{'{id}'}</button>
      <button onClick={testCreateSubmission}>
        POST /api/accounts/{'{accountId}'}/submissions
      </button>

      <h2>Job APIs</h2>
      <button onClick={testGetAllJobs}>GET /api/jobs</button>
      <button onClick={testGetJobById}>GET /api/jobs/{'{id}'}</button>
      <button onClick={testUpdateJob}>PUT /api/jobs/{'{jobId}'}</button>
      <button onClick={testAddDriverToJob}>POST /api/jobs/{'{jobId}'}/drivers</button>
      <button onClick={testGetJobDrivers}>GET /api/jobs/{'{jobId}'}/drivers</button>
      <button onClick={testAddVehicleToJob}>
        POST /api/jobs/{'{jobId}'}/vehicles
      </button>
      <button onClick={testGetJobVehicles}>GET /api/jobs/{'{jobId}'}/vehicles</button>
      <button onClick={testGetJobCoverages}>GET /api/jobs/{'{jobId}'}/coverages</button>

      <style>{`
        button {
          display: block;
          margin: 10px 0;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        button:hover {
          background-color: #0056b3;
        }
        h2 {
          margin-top: 30px;
          margin-bottom: 15px;
          border-bottom: 2px solid #007bff;
          padding-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ApiTest;
