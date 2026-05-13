import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import SideBar from "../../../../components/SideBar/SideBar";

const ConfirmationStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <h2>Confirmation</h2>
    <p>Your policy has been submitted successfully.</p>
  </WizardPage>
);

export default ConfirmationStep;
