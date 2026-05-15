import React, { useEffect, useState } from "react";
import { Button, FormInput } from "../common";
import AddressComponent from "../AddressComponent/AddressComponent";
import { Vehicle } from "../../api/services/job/types/Vehicle";
import { TypeKeyValue } from "../../api/utils/types";
import { Address } from "../../api/services/account/types/Address";
import styles from "./VehicleComponent.module.scss";
import { getTypeList } from "../../api/services/typelist/typelistApi";
import { TypeList } from "../../api/utils/types";
import Combobox from "../common/Combobox/Combobox";

import { useIntl } from "react-intl";
import messages from "./VehicleComponent.messages";
import { ComboboxOption } from "../common/Combobox/Combobox";
import { addVehicleToJob } from "../../api/services/job/jobApi";

type VehicleComponentProps = {
  onVehicleAdded?: (vehicle: Vehicle) => void;
};

const VehicleComponent: React.FC<VehicleComponentProps> = ({ onVehicleAdded }) => {
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
  const emptyVehicle = {
    make: "Toyota",
    model: "Camry",
    vin: "V4435GY",
    color: "RED",
    year: 0,
    licensePlate: "ONTTHS",
    annualMileage: 10000,
    costNew: 0,
    bodyType: { code: "", name: "" },
    licenseState: { code: "", name: "" },
    garageLocation: emptyAddress,
    vehicleDrivers: [],
  } as Vehicle;

  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [bodyTypes, setBodyTypes] = useState<TypeList[]>([]);
  const [states, setStates] = useState<TypeList[]>([]);

  const clearForm = () => {
    setIsReadOnly(true);
    setVehicle(emptyVehicle);
  };

  const handleSubmit = () => {
    console.log("Vehicle data submitted:", vehicle);
    onVehicleAdded?.(vehicle);
    addVehicleToJob("pc:437d8b43", vehicle)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log("Errror from api", e);
      });
    clearForm();
  };

  useEffect(() => {
    getTypeList("BodyType").then((response) => {
      setBodyTypes(response.data);
    });
    getTypeList("State").then((response) => {
      setStates(response.data);
    });
    setVehicle((prev) => ({
      ...prev,
      garageLocation: {
        ...prev?.garageLocation,
        country: {
          code: "CA",
          name: "Canada",
        },
      },
    }));
  }, []);

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
        {/* <FormInput
          label={intl.formatMessage(messages.year)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.year)}
          value={vehicle.year}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({ ...prev, year: e.target.value }))
          }
        /> */}
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
          label={intl.formatMessage(messages.costnew)}
          placeholder={isReadOnly ? "" : intl.formatMessage(messages.costnew)}
          value={vehicle.costNew}
          readOnly={isReadOnly}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              costNew: parseInt(e.target.value) || 0,
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

        <Combobox
          label={intl.formatMessage(messages.bodyType)}
          required
          options={bodyTypes}
          value={vehicle.bodyType}
          onChange={(option) =>
            setVehicle((prev) => ({
              ...prev,
              bodyType: option,
            }))
          }
          disabled={isReadOnly}
        />

        <Combobox
          label={intl.formatMessage(messages.licenseState)}
          placeholder={
            isReadOnly ? "" : intl.formatMessage(messages.licenseState)
          }
          options={states}
          value={vehicle.licenseState}
          disabled={isReadOnly}
          onChange={(option) =>
            setVehicle((prev) => ({
              ...prev,
              licenseState: option,
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
