import React, { useState } from "react";
import { Button, FormInput } from "../../components/common";
import AddressComponent from "../../components/AddressComponent/AddressComponent";

const Vehicle: React.FC = () => {
  const [vehicle, setVehicle] = useState({});
  const handleSubmit = () => {
    // Handle form submission, e.g., send data to API
    console.log("Vehicle data submitted:", vehicle);
  };
  return (
    <div>
      <h1> Enter Vehicle Details</h1>
      <div>
        <FormInput
          label="Make"
          placeholder="Make"
          onChange={(value) => setVehicle({ ...vehicle, make: value })}
        />
      </div>
      <div>
        <FormInput
          label="Model"
          placeholder="Model"
          onChange={(value) => setVehicle({ ...vehicle, model: value })}
        />
      </div>
      <div>
        <FormInput
          label="Year"
          placeholder="Year"
          onChange={(value) => setVehicle({ ...vehicle, year: value })}
        />
      </div>
      <div>
        <FormInput
          label="VIN"
          placeholder="VIN"
          onChange={(value) => setVehicle({ ...vehicle, vin: value })}
        />
      </div>
      <div>
        <FormInput
          label="Color"
          placeholder="Color"
          onChange={(value) => setVehicle({ ...vehicle, color: value })}
        />
      </div>
      <div>
        <FormInput
          label="License Plate"
          placeholder="License Plate"
          onChange={(value) => setVehicle({ ...vehicle, licensePlate: value })}
        />
      </div>
      <div>
        <FormInput
          label="Annual Mileage"
          placeholder="Annual Mileage"
          onChange={(value) => setVehicle({ ...vehicle, annualMileage: value })}
        />
      </div>
      <div>
        <FormInput
          label="Body Type"
          placeholder="Body Type"
          onChange={(value) => setVehicle({ ...vehicle, bodyType: value })}
        />
      </div>
      <div>
        <FormInput
          label="License State"
          placeholder="License State"
          onChange={(value) => setVehicle({ ...vehicle, licenseState: value })}
        />
      </div>
      <div>
        <AddressComponent
          readOnly={false}
          onAddressChange={(address) =>
            setVehicle({ ...vehicle, garageLocation: address })
          }
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Vehicle;
