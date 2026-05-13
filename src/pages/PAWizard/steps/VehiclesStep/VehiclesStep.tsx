import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import SideBar from "../../../../components/SideBar/SideBar";

const VehiclesStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <h2>Vehicles</h2>
    <p>Add and manage vehicles covered under this policy.</p>
  </WizardPage>
);

export default VehiclesStep;
