import React from "react";
import { WizardPageProps } from "../../types/WizardTypes";
import { Button } from "../common";

export const WizardPage: React.FC<WizardPageProps> = ({ ...props }) => {
  const { step, location, handleNext, handlePrevious, children } = props;
  const onNext = () => {
    if (handleNext) {
      handleNext();
    }
  };
  const onPrevious = () => {
    if (handlePrevious) {
      handlePrevious();
    }
  };

  return (
    <div>
      {children}
      <div>
        <Button onClick={onNext}>Next</Button>
        <Button onClick={onPrevious}>Back</Button>
      </div>
    </div>
  );
};
