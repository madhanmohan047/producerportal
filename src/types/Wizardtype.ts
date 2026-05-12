type WizardStep = {
  id: string;
  type: string;
  route: string;
  component: React.ComponentType<any>;
  wizardPageConfig: WizardPageConfig;
};
type WizardPageConfig = {
  title: string;
  description: string;
  buttonProps: {
    next: {
      label: string;
    };
    previous: {
      label: string;
    };
  };
};
type WizardProps = {
  steps: WizardStep[];
  url: string;
  location: any;
};
type WizardPageProps = {
  step: WizardStep;
  location: any;
  handleNext?: () => void;
  handlePrevious?: () => void;
  children: React.ReactNode;
};
export type { WizardStep, WizardPageProps, WizardProps, WizardPageConfig };
