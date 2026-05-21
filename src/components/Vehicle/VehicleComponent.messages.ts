import { defineMessages } from "react-intl";

export default defineMessages({
  make: { id: "vehicle.make", defaultMessage: "Make *" },
  model: { id: "vehicle.model", defaultMessage: "Model *" },
  year: { id: "vehicle.year", defaultMessage: "Year *" },
  costNew: { id: "vehicle.costNew", defaultMessage: "Cost New ($)" },
  vin: { id: "vehicle.vin", defaultMessage: "VIN *" },
  color: { id: "vehicle.color", defaultMessage: "Color" },
  licensePlate: { id: "vehicle.licensePlate", defaultMessage: "License Plate" },
  annualMileage: { id: "vehicle.annualMileage", defaultMessage: "Annual Mileage" },
  bodyType: { id: "vehicle.bodyType", defaultMessage: "Body Type" },
  licenseState: { id: "vehicle.licenseState", defaultMessage: "License State" },
  addVehicle: { id: "vehicle.addVehicle", defaultMessage: "Add Vehicle" },
  saveChanges: { id: "vehicle.saveChanges", defaultMessage: "Save Changes" },
  saving: { id: "vehicle.saving", defaultMessage: "Saving..." },
  cancel: { id: "vehicle.cancel", defaultMessage: "Cancel" },
  errorMakeModel: { id: "vehicle.errorMakeModel", defaultMessage: "Make, model, and VIN are required." },
  errorYear: { id: "vehicle.errorYear", defaultMessage: "A valid year is required." },
  errorSave: { id: "vehicle.errorSave", defaultMessage: "Failed to save vehicle. Please try again." },
});
