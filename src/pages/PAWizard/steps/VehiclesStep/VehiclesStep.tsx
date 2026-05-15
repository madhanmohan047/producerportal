import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/BaseWizardPage/BaseWizardpage";
import SideBar from "../../../../components/SideBar/SideBar";
import VehicleComponent from "../../../../components/Vehicle/VehicleComponent";

const VehiclesStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <VehicleComponent />
  </WizardPage>
);

export default VehiclesStep;
