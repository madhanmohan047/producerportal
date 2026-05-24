import React, { useRef } from "react";

import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";

import styles from "./DocumentStep.module.scss";
import MESSAGES from "./DocumentStep.messages";

const DocumentStep = (wizardPageProps: WizardPageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { fnolFormData, setFnolFormData } = useFNOLContext();
  const converttoClaimDocument = (file: File) => ({
    refId: file.name,
    name: file.name,
    security: { code: "low", name: "Low" },
  });
  const addFiles = (fileList: FileList) => {
    setFnolFormData((prev) => {
      const existing = prev.currentClaim?.documents || [];
      const existingKeys = new Set(existing.map((d) => d.refId + d.name));

      const newDocs = Array.from(fileList)
        .filter((f) => !existingKeys.has(f.name + f.size + f.lastModified))
        .map(converttoClaimDocument);

      return {
        ...prev,
        currentClaim: {
          ...prev.currentClaim,
          documents: [...existing, ...newDocs],
        },
      };
    });
  };

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      showPageheader={false}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      wizardSidebarprops={wizardPageProps.wizardSidebarprops}
    >
      <div className={styles["container"]}>
        <div className={styles["step-header"]}>
          <h2>{MESSAGES.title.defaultMessage}</h2>

          <p>{MESSAGES.subtitle.defaultMessage}</p>
        </div>

        <div
          className={styles["upload-container"]}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: "pointer" }}
        >
          <i
            className="fa-solid fa-cloud-arrow-up"
            style={{
              fontSize: "40px",
              display: "block",
              marginBottom: "10px",
            }}
          />

          <p className={styles["upload-container-label"]}>
            {MESSAGES.uploadLabel.defaultMessage}
          </p>

          <p className={styles["upload-container-hint"]}>
            {MESSAGES.uploadHint.defaultMessage}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className={styles["uploadedList"]}>
          {fnolFormData.currentClaim?.documents?.map((file) => (
            <div
              key={file.name + file.size}
              className={styles["upload-list-item"]}
            >
              <i className="fa-solid fa-paperclip" />
              <span>{file.name}</span>

              <div className={styles["alignend"]}>
                <span className={styles["size"]}>{file.size} MB</span>
                <i className="fa-solid fa-check" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WizardPage>
  );
};

export default DocumentStep;
