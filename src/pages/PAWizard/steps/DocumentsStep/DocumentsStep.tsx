import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const DocumentsStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    handleNext={wizardPageProps.handleNext}
    handlePrevious={wizardPageProps.handlePrevious}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Policy Documents</h2>
    <p>Upload any required documents (ID, prior policy, etc.).</p>
  </WizardPage>
);

export default DocumentsStep;
