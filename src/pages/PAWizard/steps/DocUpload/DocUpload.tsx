import { DragEvent, KeyboardEvent, useRef } from "react";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { usePAContext } from "../../PAWizardContext";
import styles from "./DocUpload.module.scss";

const ACCEPTED_DOCUMENT_TYPES = ".jpg,.jpeg,.png,.pdf";

const formatFileSize = (sizeInBytes: number) =>
  `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;

const PADocUploadStep = ({
  step,
  location,
  handleNext,
  handlePrevious,
  SidebarComponent,
}: WizardPageProps) => {
  const paFileInputRef = useRef<HTMLInputElement | null>(null);
  const { paFormData, setPAFormData } = usePAContext();

  const openFilePicker = () => {
    paFileInputRef.current?.click();
  };

  const addPADocumentFiles = (uploadedFileList: FileList | File[]) => {
    const newDocumentFiles = Array.from(uploadedFileList);

    if (!newDocumentFiles.length) {
      return;
    }

    setPAFormData((formData) => ({
      ...formData,
      documents: [...(formData.documents || []), ...newDocumentFiles],
      sidebarProps: {
        title: "Documents",
        sidebaritems: [
          {
            transformationKey: "Uploaded",
            transformationLabel: `${
              (formData.documents?.length ?? 0) + newDocumentFiles.length
            } file(s)`,
          },
        ],
      },
    }));
  };

  const handleUploadKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    addPADocumentFiles(event.dataTransfer.files);
  };

  return (
    <WizardPage
      step={step}
      location={location}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      SidebarComponent={SidebarComponent}
    >
      <div className={styles.container}>
        <div className={styles.stepHeader}>
          <h2>Policy Documents</h2>
          <p>Upload required documents such as ID, prior policy, or forms.</p>
        </div>

        <div
          className={styles.uploadContainer}
          onClick={openFilePicker}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={handleUploadKeyDown}
        >
          <i className={`fa-solid fa-cloud-arrow-up ${styles.uploadIcon}`} />
          <p className={styles.uploadContainerLabel}>
            Click to upload or drag and drop
          </p>
          <p className={styles.uploadContainerHint}>
            Maximum file size: 25MB (JPG, PNG, PDF)
          </p>
          <input
            ref={paFileInputRef}
            type="file"
            multiple
            className={styles.fileInput}
            accept={ACCEPTED_DOCUMENT_TYPES}
            onChange={(event) => {
              if (event.target.files?.length) {
                addPADocumentFiles(event.target.files);
              }
              event.target.value = "";
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>

        <div className={styles.uploadedList}>
          {paFormData.documents?.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className={styles.uploadListItem}
            >
              <i className="fa-solid fa-paperclip" />
              <span className={styles.fileName}>{file.name}</span>
              <div className={styles.fileStatus}>
                <span className={styles.size}>{formatFileSize(file.size)}</span>
                <i className="fa-solid fa-check" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WizardPage>
  );
};

export default PADocUploadStep;
