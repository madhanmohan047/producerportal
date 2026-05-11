import { useEffect, useState } from "react";
import {
  PersonalInformation,
  emptyPersonalInfo,
} from "./steps/PersonalInformationStep";
import { DriverRecord } from "./steps/DriverInformationStep";
import { VehicleRecord } from "./steps/VehicleInformationStep";

const STORAGE_KEY = "personalAutoWizard.state";

interface PersonalAutoState {
  personalInfo: PersonalInformation;
  drivers: DriverRecord[];
  vehicles: VehicleRecord[];
}

const initialState: PersonalAutoState = {
  personalInfo: emptyPersonalInfo,
  drivers: [],
  vehicles: [],
};

const load = (): PersonalAutoState => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
};

export const usePersonalAutoState = () => {
  const [state, setState] = useState<PersonalAutoState>(load);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setPersonalInfo = (personalInfo: PersonalInformation) =>
    setState((prev) => ({ ...prev, personalInfo }));
  const setDrivers = (drivers: DriverRecord[]) =>
    setState((prev) => ({ ...prev, drivers }));
  const setVehicles = (vehicles: VehicleRecord[]) =>
    setState((prev) => ({ ...prev, vehicles }));

  return {
    personalInfo: state.personalInfo,
    drivers: state.drivers,
    vehicles: state.vehicles,
    setPersonalInfo,
    setDrivers,
    setVehicles,
  };
};
