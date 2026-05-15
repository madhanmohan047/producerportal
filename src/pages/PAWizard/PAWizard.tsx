import { Wizard } from "../../components/Wizard/BaseWizard";
import { PASteps } from "./steps/PASteps";
import { useLocation } from "react-router-dom";
import { PAWizardProvider } from "../../context/PAWizardContext";

export const PAWizard = () => {
  const location = useLocation();
  return (
    <PAWizardProvider>
      <Wizard steps={PASteps} location={location} url={"/pa-wizard/"} />
    </PAWizardProvider>
  );
};
