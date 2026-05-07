import { Base, TypeKeyValue } from "../../../utils/types";
import { Address } from "../../account/types/Address";
import { Driver } from "./Driver";

export interface Vehicle extends Base {
  _id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  licensePlate: string;
  annualMileage: number;
  bodyType: TypeKeyValue;
  licenseState: TypeKeyValue;
  garageLocation: Address;
  driverList: Driver[];
}
