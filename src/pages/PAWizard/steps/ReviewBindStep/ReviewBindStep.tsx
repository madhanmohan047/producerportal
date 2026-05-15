import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const ReviewBindStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    handleNext={wizardPageProps.handleNext}
    handlePrevious={wizardPageProps.handlePrevious}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Review &amp; Bind Policy</h2>
    <p>Please review all information before binding.</p>
  </WizardPage>
);

export default ReviewBindStep;
