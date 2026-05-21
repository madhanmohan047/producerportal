import { useIntl } from "react-intl";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import messages from "./ConfirmationStep.messages";

const ConfirmationStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <h2>{intl.formatMessage(messages.heading)}</h2>
      <p>{intl.formatMessage(messages.description)}</p>
    </WizardPage>
  );
};

export default ConfirmationStep;
