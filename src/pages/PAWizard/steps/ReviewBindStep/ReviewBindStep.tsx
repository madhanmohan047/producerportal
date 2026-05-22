import { useIntl } from "react-intl";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import messages from "./ReviewBindStep.messages";

const ReviewBindStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <h2>{intl.formatMessage(messages.heading)}</h2>
      <p>{intl.formatMessage(messages.description)}</p>
    </WizardPage>
  );
};

export default ReviewBindStep;
