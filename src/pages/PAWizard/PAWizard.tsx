import { useEffect } from "react";
import { Wizard } from "../../components/Wizard/Wizard";
import { PASteps } from "./steps/PASteps";
import { useLocation, useNavigate } from "react-router-dom";
import { PAWizardProvider, initialPAFormData } from "./PAWizardContext";
import PAWizardSidebar from "../../components/Wizard/WizardSidebar/PAWizardSidebar";

export const PAWizard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/pawizard") {
      navigate("/pawizard/account", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <PAWizardProvider paFormData={initialPAFormData}>
      <Wizard
        steps={PASteps}
        location={location}
        url={"/pawizard/"}
        header={"New Personal Auto Policy"}
        SidebarComponent={PAWizardSidebar}
      />
    </PAWizardProvider>
  );
};
