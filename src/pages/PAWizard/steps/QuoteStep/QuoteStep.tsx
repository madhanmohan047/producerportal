import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";

const QuoteStep = (wizardPageProps: WizardPageProps) => (
  <WizardPage
    step={wizardPageProps.step}
    location={wizardPageProps.location}
    handleNext={wizardPageProps.handleNext}
    handlePrevious={wizardPageProps.handlePrevious}
    SidebarComponent={wizardPageProps.SidebarComponent}
  >
    <h2>Select a Quote</h2>
    <p>Choose the coverage plan that best fits your needs.</p>
  </WizardPage>
);

export default QuoteStep;
