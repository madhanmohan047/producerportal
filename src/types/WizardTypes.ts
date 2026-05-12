type WizardStep = {
  id: string;
  type: string;
  route: string;
  component: React.ComponentType<any>;
  WizardPageProps: {
    title: string;
    description: string;
    buttonProps: {
      next: { label: string };
      previous: { label: string };
    };
  };
};

type WizardProps = {
  steps: WizardStep[];
  location: {
    pathname: string;
  };
};

type WizardPageProps = {
  step: WizardStep;
  location: any;
  handleNext: () => void;
  handlePrevious: () => void;
  children: React.ReactNode;
};

export type { WizardStep, WizardProps, WizardPageProps };
