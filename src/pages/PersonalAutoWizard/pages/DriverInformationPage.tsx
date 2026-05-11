import React from "react";
import PersonalAutoWizardLayout from "../PersonalAutoWizardLayout";
import DriverInformationStep from "../steps/DriverInformationStep";
import { usePersonalAutoState } from "../usePersonalAutoState";

const DriverInformationPage: React.FC = () => {
  const { drivers, setDrivers } = usePersonalAutoState();

  return (
    <PersonalAutoWizardLayout currentStep={1}>
      <DriverInformationStep drivers={drivers} onChange={setDrivers} />
    </PersonalAutoWizardLayout>
  );
};

export default DriverInformationPage;
