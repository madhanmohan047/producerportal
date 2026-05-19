import React, { useRef, useState } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { useFNOLContext } from "../../FNOLWizardContext";
import styles from "./DocumentStep.module.scss";
const DocumentStep = (wizardPageProps: WizardPageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { fnolFormData, setFnolFormData } = useFNOLContext();

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFnolFormData((formData) => ({
      ...formData,
      documentList: [...(formData.documentList || []), ...newFiles],
    }));
    console.log("docs", fnolFormData.documentList);
  };
  // const removeFile = (removeItemIndex: number) => {
  //   setFiles((prevList) =>
  //     prevList.filter(
  //       (currentItem, currentIndex) => currentIndex !== removeItemIndex,
  //     ),
  //   );
  // };
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
          <h2>Supporting Documents</h2>
          <p>
            Upload photos or reports. Providing these now reduces processing
            time by up to 48 hours.
          </p>
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
          ></i>
          <p className={styles["upload-container-label"]}>
            Click to upload or drag and drop
          </p>
          <p className={styles["upload-container-hint"]}>
            Maximum file size: 25MB (JPG, PNG, PDF)
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
          {fnolFormData.documentList?.map((file) => (
            <div className={styles["upload-list-item"]}>
              <i className="fa-solid fa-paperclip"></i>
              <span>{file.name}</span>
              <div className={styles["alignend"]}>
                <span className={styles["size"]}>{`${file.size} MB`}</span>
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WizardPage>
  );
};
export default DocumentStep;
