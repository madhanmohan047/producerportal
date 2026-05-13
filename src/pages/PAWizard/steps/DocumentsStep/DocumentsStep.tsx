import { WizardPageProps } from "../../../../types/Wizardtype";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import SideBar from "../../../../components/SideBar/SideBar";

const DocumentsStep = (props: WizardPageProps) => (
  <WizardPage
    step={props.step}
    location={props.location}
    handleNext={props.handleNext}
    handlePrevious={props.handlePrevious}
    sidebarContent={<SideBar />}
  >
    <h2>Documents</h2>
    <p>Upload and manage required policy documents.</p>
  </WizardPage>
);

export default DocumentsStep;
