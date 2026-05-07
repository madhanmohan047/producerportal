import React, { useState } from "react";
import { Button, FormInput } from "../common";
import AddressComponent from "../AddressComponent/AddressComponent";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { TypeKeyValue } from "../../api/utils/types";
import { Address } from "../../api/services/account/types/Address";
import styles from "./VehicleComponent.module.scss";

import { useIntl } from "react-intl";
import messages from "./VehicleComponent.messages";

const VehicleComponent: React.FC = () => {
  const intl = useIntl();

  const emptyAddress: Address = {
    _id: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postalCode: "",
    state: { code: "", name: "" },
    country: { code: "", name: "" },
    addressType: { code: "", name: "" },
  } as Address;
  const emptyVehicle: Vehicle = {
    _id: "",
    make: "",
    model: "",
    year: 0,
    vin: "",
    color: "",
    licensePlate: "",
    annualMileage: 0,
    bodyType: { code: "", name: "" },
    licenseState: { code: "", name: "" },
    garageLocation: emptyAddress,
    driverList: [],
  } as Vehicle;

  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const clearForm = () => {
    setIsReadOnly(true);
    setVehicle(emptyVehicle);
  };

  const handleSubmit = () => {
    console.log("Vehicle data submitted:", vehicle);
    clearForm();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{intl.formatMessage(messages.title)}</h1>

      <div className={styles.formGrid}>
        <FormInput
          label={intl.formatMessage(messages.make)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.make)}
          value={vehicle.make}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({ ...prev, make: e.target.value }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.model)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.model)}
          value={vehicle.model}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({ ...prev, model: e.target.value }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.year)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.year)}
          value={vehicle.year}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              year: parseInt(e.target.value) || 0,
            }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.vin)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.vin)}
          readOnly={isReadOnly}
          value={vehicle.vin}
          onChange={(e) =>
            setVehicle((prev) => ({ ...prev, vin: e.target.value }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.color)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.color)}
          readOnly={isReadOnly}
          value={vehicle.color}
          onChange={(e) =>
            setVehicle((prev) => ({ ...prev, color: e.target.value }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.licensePlate)}
          placeholder={
            isReadOnly ? "" : intl.formatMessage(messages.licensePlate)
          }
          readOnly={isReadOnly}
          value={vehicle.licensePlate}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              licensePlate: e.target.value,
            }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.annualMileage)}
          placeholder={
            isReadOnly ? "" : intl.formatMessage(messages.annualMileage)
          }
          value={vehicle.annualMileage}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              annualMileage: parseInt(e.target.value) || 0,
            }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.bodyType)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.bodyType)}
          value={vehicle.bodyType.name}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              bodyType: { ...prev.bodyType, name: e.target.value },
            }))
          }
        />

        <FormInput
          label={intl.formatMessage(messages.licenseState)}
          placeholder={
            isReadOnly ? "" : intl.formatMessage(messages.licenseState)
          }
          value={vehicle.licenseState.name}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              licenseState: { ...prev.licenseState, name: e.target.value },
            }))
          }
        />
      </div>

      <span>{intl.formatMessage(messages.garageLocation)}</span>

      <div className={styles.addressSection}>
        <AddressComponent
          readOnly={isReadOnly}
          address={vehicle.garageLocation}
          onAddressChange={(updatedAddress) =>
            setVehicle((prev) => ({
              ...prev,
              garageLocation: updatedAddress,
            }))
          }
        />
      </div>

      <div className={styles.footer}>
        <Button onClick={handleSubmit}>
          {intl.formatMessage(messages.submit)}
        </Button>
      </div>
    </div>
  );
};

export default VehicleComponent;
