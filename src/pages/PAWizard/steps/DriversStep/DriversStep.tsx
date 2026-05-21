import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleInfo, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import WizardPage from "../../../../components/Wizard/WizardPage/Wizardpage";
import { WizardPageProps } from "../../../../types/Wizardtype";
import { Driver } from "../../../../api/services/job/types/Driver";
import { DriverComponent, DriverSavedExtras } from "../../../../components/DriverComponent/DriverComponent";
import { getJobDrivers } from "../../../../api/services/job/jobApi";
import { usePAContext } from "../../PAWizardContext";
import messages from "./DriversStep.messages";
import styles from "./DriversStep.module.scss";

type Relation = "Named Insured" | "Spouse" | "Child" | "Other";

const ADDITIONAL_RELATIONS: Relation[] = ["Spouse", "Child", "Other"];

type DriverCard = {
  id?: string;
  personId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relation: Relation;
  licenseNumber: string;
  licenseState: string;
  licenseYear: number | "";
  numViolations: number | "";
  numAccidents: number | "";
  yearsOfExperience: number | "";
  isNamedInsured: boolean;
};

const formatDob = (dob: Date | string | undefined): string => {
  if (!dob) return "";
  const s = typeof dob === "string" ? dob : dob.toISOString();
  return s.slice(0, 10);
};

const displayDob = (dob: string): string => {
  if (!dob) return "—";
  const dateOnly = dob.includes("T") ? dob.slice(0, 10) : dob;
  const [y, m, d] = dateOnly.split("-");
  if (!y || !m || !d) return "—";
  return `${m}/${d}/${y}`;
};

const formatLicense = (num: string, state: string) =>
  num ? (state ? `${state.toUpperCase()}-${num}` : num) : "";

const toInitialValues = (card: DriverCard) => ({
  personMode: card.personId ? ("existing" as const) : ("new" as const),
  personId: card.personId ?? "",
  firstName: card.firstName,
  lastName: card.lastName,
  dateOfBirth: card.dateOfBirth,
  licenseNumber: card.licenseNumber,
  licenseState: card.licenseState
    ? { code: card.licenseState, name: card.licenseState }
    : undefined,
  licenseYear: card.licenseYear,
  numViolations: card.numViolations,
  numAccidents: card.numAccidents,
  yearsOfExperience: card.yearsOfExperience,
});

const fromSaved = (
  saved: Driver,
  extras: DriverSavedExtras,
  relation: Relation,
  isNamedInsured = false
): DriverCard => {
  const person = typeof saved.person === "object" ? saved.person : null;
  const personId = typeof saved.person === "string" ? saved.person : person?._id;
  return {
    id: saved._id,
    personId,
    firstName: person?.firstName ?? "",
    lastName: person?.lastName ?? "",
    dateOfBirth: extras.dateOfBirth,
    relation,
    licenseNumber: saved.licenseNumber ?? "",
    licenseState: saved.licenseState ?? "",
    licenseYear: saved.licenseYear ?? "",
    numViolations: saved.numViolations ?? "",
    numAccidents: saved.numAccidents ?? "",
    yearsOfExperience: saved.yearsOfExperience ?? "",
    isNamedInsured,
  };
};

const DriversStep = (wizardPageProps: WizardPageProps) => {
  const intl = useIntl();
  const { paFormData, setPAFormData } = usePAContext();
  const contact = paFormData.primaryContact;

  const [driverCards, setDriverCards] = useState<DriverCard[]>(() => {
    const namedInsured: DriverCard = {
      personId: contact?._id,
      firstName: contact?.firstName ?? "",
      lastName: contact?.lastName ?? "",
      dateOfBirth: formatDob(contact?.dateOfBirth),
      relation: "Named Insured",
      licenseNumber: "",
      licenseState: "",
      licenseYear: "",
      numViolations: "",
      numAccidents: "",
      yearsOfExperience: "",
      isNamedInsured: true,
    };

    const additional: DriverCard[] = (paFormData.drivers ?? []).map((d) => {
      const person = typeof d.person === "object" ? d.person : null;
      const personId = typeof d.person === "string" ? d.person : person?._id;
      return {
        id: d._id,
        personId,
        firstName: person?.firstName ?? "",
        lastName: person?.lastName ?? "",
        dateOfBirth: "",
        relation: "Other" as Relation,
        licenseNumber: d.licenseNumber ?? "",
        licenseState: d.licenseState ?? "",
        licenseYear: d.licenseYear ?? "",
        numViolations: d.numViolations ?? "",
        numAccidents: d.numAccidents ?? "",
        yearsOfExperience: d.yearsOfExperience ?? "",
        isNamedInsured: false,
      };
    });

    return [namedInsured, ...additional];
  });

  const [activeTab, setActiveTab] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDriverRelation, setNewDriverRelation] = useState<Relation>("Spouse");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editCardRelation, setEditCardRelation] = useState<Relation>("Spouse");
  const [primaryIdx, setPrimaryIdx] = useState(0);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);

  useEffect(() => {
    const apiDrivers = driverCards
      .filter((c) => !c.isNamedInsured && c.id)
      .map((c) => ({
        _id: c.id,
        person: c.personId ?? c.firstName,
        licenseNumber: c.licenseNumber,
        licenseState: c.licenseState,
        licenseYear: c.licenseYear === "" ? undefined : c.licenseYear,
        numViolations: c.numViolations === "" ? undefined : c.numViolations,
        numAccidents: c.numAccidents === "" ? undefined : c.numAccidents,
        yearsOfExperience: c.yearsOfExperience === "" ? undefined : c.yearsOfExperience,
      } as Driver));
    setPAFormData((prev) => ({ ...prev, drivers: apiDrivers }));
  }, [driverCards]);

  useEffect(() => {
    if (!paFormData.jobId) return;
    setIsLoadingDrivers(true);
    getJobDrivers(paFormData.jobId)
      .then((res) => {
        const raw = res.data as any;
        const drivers: Driver[] = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
        if (drivers.length === 0) return;
        const fetched: DriverCard[] = drivers.map((d) => {
          const person = typeof d.person === "object" ? d.person : null;
          const personId = typeof d.person === "string" ? d.person : person?._id;
          return {
            id: d._id,
            personId,
            firstName: person?.firstName ?? "",
            lastName: person?.lastName ?? "",
            dateOfBirth: formatDob((person as any)?.dateOfBirth),
            relation: "Other" as Relation,
            licenseNumber: d.licenseNumber ?? "",
            licenseState: d.licenseState ?? "",
            licenseYear: d.licenseYear ?? "",
            numViolations: d.numViolations ?? "",
            numAccidents: d.numAccidents ?? "",
            yearsOfExperience: d.yearsOfExperience ?? "",
            isNamedInsured: false,
          };
        });
        setDriverCards((prev) => {
          const namedInsuredPersonId = prev[0]?.personId;
          const additional = fetched.filter((f) => f.personId !== namedInsuredPersonId);
          return [prev[0], ...additional];
        });
      })
      .finally(() => setIsLoadingDrivers(false));
  }, [paFormData.jobId]);

  const switchToTab = (idx: number) => {
    setActiveTab(idx);
    setShowAddForm(false);
    setEditingIdx(null);
  };

  const startEdit = (idx: number) => {
    setShowAddForm(false);
    setEditCardRelation(
      driverCards[idx].isNamedInsured ? "Named Insured" : (driverCards[idx].relation as Relation)
    );
    setEditingIdx(idx);
  };

  const handleEditSaved = (idx: number, saved: Driver, extras: DriverSavedExtras) => {
    const relation = driverCards[idx].isNamedInsured ? "Named Insured" : editCardRelation;
    setDriverCards((prev) =>
      prev.map((card, i) => {
        if (i !== idx) return card;
        return {
          ...card,
          relation,
          dateOfBirth: extras.dateOfBirth || card.dateOfBirth,
          licenseNumber: saved.licenseNumber ?? card.licenseNumber,
          licenseState: saved.licenseState ?? card.licenseState,
          licenseYear: saved.licenseYear !== undefined ? saved.licenseYear : card.licenseYear,
          numViolations: saved.numViolations !== undefined ? saved.numViolations : card.numViolations,
          numAccidents: saved.numAccidents !== undefined ? saved.numAccidents : card.numAccidents,
          yearsOfExperience: saved.yearsOfExperience !== undefined ? saved.yearsOfExperience : card.yearsOfExperience,
        };
      })
    );
    setEditingIdx(null);
  };

  const handleDriverAdded = (saved: Driver, extras: DriverSavedExtras) => {
    setDriverCards((prev) => {
      const newCards = [...prev, fromSaved(saved, extras, newDriverRelation)];
      setActiveTab(newCards.length - 1);
      return newCards;
    });
    setNewDriverRelation("Spouse");
    setShowAddForm(false);
  };

  const removeDriver = (idx: number) => {
    setDriverCards((prev) => prev.filter((_, i) => i !== idx));
    if (primaryIdx === idx) setPrimaryIdx(0);
    else if (primaryIdx > idx) setPrimaryIdx((p) => p - 1);
    if (editingIdx === idx) setEditingIdx(null);
    setActiveTab((prev) => (prev >= idx ? Math.max(0, prev - 1) : prev));
  };

  const getRelationLabel = (relation: Relation): string => {
    if (relation === "Named Insured") return intl.formatMessage(messages.namedInsured);
    if (relation === "Spouse") return intl.formatMessage(messages.spouse);
    if (relation === "Child") return intl.formatMessage(messages.child);
    return intl.formatMessage(messages.other);
  };

  const card = driverCards[activeTab];
  const isEditing = editingIdx === activeTab;
  const isPrimary = activeTab === primaryIdx;
  const showPrimaryToggle = driverCards.length > 1 && !isPrimary;

  return (
    <WizardPage
      step={wizardPageProps.step}
      location={wizardPageProps.location}
      handleNext={wizardPageProps.handleNext}
      handlePrevious={wizardPageProps.handlePrevious}
      SidebarComponent={wizardPageProps.SidebarComponent}
    >
      <div className={styles["drivers-container"]}>

        {contact && (
          <div className={styles["account-banner"]}>
            <span className={styles["account-label"]}>{intl.formatMessage(messages.accountLabel)}</span>
            {[contact.firstName, contact.lastName].filter(Boolean).join(" ")}
          </div>
        )}

        {!paFormData.jobId && (
          <div className={styles["no-job-banner"]}>
            {intl.formatMessage(messages.noJobBanner)}
          </div>
        )}

        {isLoadingDrivers && (
          <p className={styles["loading-text"]}>{intl.formatMessage(messages.loadingDrivers)}</p>
        )}

        <div className={styles.tabs}>
          {driverCards.map((c, idx) => {
            const label =
              [c.firstName, c.lastName].filter(Boolean).join(" ") ||
              intl.formatMessage(messages.driverNum, { num: idx + 1 });
            return (
              <button
                key={idx}
                className={`${styles.tab} ${!showAddForm && activeTab === idx ? styles["tab-active"] : ""}`}
                onClick={() => switchToTab(idx)}
              >
                {label}
                {idx === primaryIdx && " ★"}
              </button>
            );
          })}
        </div>

        {showAddForm && (
          <div className={styles["driver-panel"]}>
            <div className={styles["driver-card-header"]}>
              <div className={styles["driver-name-row"]}>
                <span className={styles["driver-name"]}>{intl.formatMessage(messages.newDriver)}</span>
                <select
                  className={styles["relation-select"]}
                  value={newDriverRelation}
                  onChange={(e) => setNewDriverRelation(e.target.value as Relation)}
                >
                  {ADDITIONAL_RELATIONS.map((r) => (
                    <option key={r} value={r}>{getRelationLabel(r)}</option>
                  ))}
                </select>
              </div>
            </div>
            <DriverComponent
              jobId={paFormData.jobId ?? ""}
              mode="add"
              onSaved={handleDriverAdded}
              onCancel={() => {
                setShowAddForm(false);
                setNewDriverRelation("Spouse");
              }}
            />
          </div>
        )}

        {!showAddForm && card && (
          <div className={styles["driver-panel"]}>
            <div className={styles["driver-card-header"]}>
              <div className={styles["driver-name-row"]}>
                <span className={styles["driver-name"]}>
                  {[card.firstName, card.lastName].filter(Boolean).join(" ") ||
                    intl.formatMessage(messages.driverNum, { num: activeTab + 1 })}
                </span>
                {!card.isNamedInsured && isEditing ? (
                  <select
                    className={styles["relation-select"]}
                    value={editCardRelation}
                    onChange={(e) => setEditCardRelation(e.target.value as Relation)}
                  >
                    {ADDITIONAL_RELATIONS.map((r) => (
                      <option key={r} value={r}>{getRelationLabel(r)}</option>
                    ))}
                  </select>
                ) : (
                  <span className={styles["relation-badge"]}>{getRelationLabel(card.relation)}</span>
                )}
                {isPrimary && (
                  <span className={styles["primary-badge"]}>
                    {intl.formatMessage(messages.primary)}
                  </span>
                )}
              </div>
              <div className={styles["card-actions"]}>
                {showPrimaryToggle && !isEditing && (
                  <button className={styles["primary-btn"]} onClick={() => setPrimaryIdx(activeTab)}>
                    {intl.formatMessage(messages.setAsPrimary)}
                  </button>
                )}
                {!isEditing && (
                  <button className={styles["edit-btn"]} onClick={() => startEdit(activeTab)}>
                    <FontAwesomeIcon icon={faPen} />
                    {intl.formatMessage(messages.edit)}
                  </button>
                )}
                {!card.isNamedInsured && !isEditing && (
                  <button className={styles["remove-btn"]} onClick={() => removeDriver(activeTab)}>
                    <FontAwesomeIcon icon={faTrash} />
                    {intl.formatMessage(messages.remove)}
                  </button>
                )}
              </div>
            </div>

            {isEditing ? (
              <DriverComponent
                jobId={paFormData.jobId ?? ""}
                mode="edit"
                initialValues={toInitialValues(card)}
                onSaved={(saved, extras) => handleEditSaved(activeTab, saved, extras)}
                onCancel={() => setEditingIdx(null)}
              />
            ) : (
              <div className={styles["driver-fields"]}>
                <div className={styles["driver-field"]}>
                  <label>{intl.formatMessage(messages.dob)}</label>
                  <input readOnly value={displayDob(card.dateOfBirth)} />
                </div>
                <div className={styles["driver-field"]}>
                  <label>{intl.formatMessage(messages.licenseNumber)}</label>
                  <input
                    readOnly
                    value={formatLicense(card.licenseNumber, card.licenseState)}
                    placeholder="—"
                  />
                </div>
                <div className={styles["driver-field"]}>
                  <label>{intl.formatMessage(messages.violations)}</label>
                  <input
                    readOnly
                    value={
                      card.numViolations === "" || card.numViolations === 0
                        ? intl.formatMessage(messages.none)
                        : String(card.numViolations)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!showAddForm && (
          <button
            className={styles["add-btn"]}
            disabled={!paFormData.jobId}
            style={!paFormData.jobId ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
            onClick={() => { if (paFormData.jobId) { setShowAddForm(true); setEditingIdx(null); } }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {intl.formatMessage(messages.addAnotherDriver)}
          </button>
        )}

        <div className={styles["info-banner"]}>
          <FontAwesomeIcon icon={faCircleInfo} className={styles["info-icon"]} />
          {intl.formatMessage(messages.mvrNote)}
        </div>
      </div>
    </WizardPage>
  );
};

export default DriversStep;
