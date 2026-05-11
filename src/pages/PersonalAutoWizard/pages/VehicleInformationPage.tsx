import React from "react";
import PersonalAutoWizardLayout from "../PersonalAutoWizardLayout";
import VehicleInformationStep from "../steps/VehicleInformationStep";
import { usePersonalAutoState } from "../usePersonalAutoState";

const VehicleInformationPage: React.FC = () => {
  const { vehicles, setVehicles } = usePersonalAutoState();

  return (
    <PersonalAutoWizardLayout currentStep={2}>
      <VehicleInformationStep vehicles={vehicles} onChange={setVehicles} />
    </PersonalAutoWizardLayout>
  );
};

export default VehicleInformationPage;
