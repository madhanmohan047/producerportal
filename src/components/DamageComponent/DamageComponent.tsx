import React, { useCallback } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../common/FormInput/FormInput";
import YesNoToggle from "../common/YesNoToggle/YesNoToggle";
import { DAMAGE_MESSAGES } from "./DamageComponent.messages";
import styles from "./DamageComponent.module.scss";

export type LineOfBusiness = "auto" | "property";

export type DamageInfo = {
  damageAreas: string[];
  estimatedAmount?: number;
  safetyConcerns: boolean;
};

type DamageAreaOption = {
  code: string;
  label: MessageDescriptor;
};

type DamageProps = {
  value?: DamageInfo;
  onValueChange: (value: any, path: string) => void;
  lineOfBusiness?: LineOfBusiness;
  damageAreaOptions?: DamageAreaOption[];
  readOnly?: boolean;
};

export const AUTO_DAMAGE_AREAS: DamageAreaOption[] = [
  { code: "FRONT_BUMPER", label: DAMAGE_MESSAGES.areaFrontBumper },
  { code: "HOOD", label: DAMAGE_MESSAGES.areaHood },
  { code: "WINDSHIELD", label: DAMAGE_MESSAGES.areaWindshield },
  { code: "DRIVER_DOOR", label: DAMAGE_MESSAGES.areaDriverDoor },
  { code: "PASSENGER_DOOR", label: DAMAGE_MESSAGES.areaPassengerDoor },
  { code: "REAR_BUMPER", label: DAMAGE_MESSAGES.areaRearBumper },
  { code: "ROOF", label: DAMAGE_MESSAGES.areaRoof },
  { code: "TRUNK", label: DAMAGE_MESSAGES.areaTrunk },
  { code: "UNDERBODY", label: DAMAGE_MESSAGES.areaUnderbody },
  { code: "TIRES", label: DAMAGE_MESSAGES.areaTires },
];

export const PROPERTY_DAMAGE_AREAS: DamageAreaOption[] = [
  { code: "ROOF", label: DAMAGE_MESSAGES.areaRoof },
  { code: "PLUMBING", label: DAMAGE_MESSAGES.areaPlumbing },
  { code: "HVAC", label: DAMAGE_MESSAGES.areaHvac },
  { code: "ELECTRICAL", label: DAMAGE_MESSAGES.areaElectrical },
  { code: "WALLS", label: DAMAGE_MESSAGES.areaWalls },
  { code: "FLOORING", label: DAMAGE_MESSAGES.areaFlooring },
  { code: "FOUNDATION", label: DAMAGE_MESSAGES.areaFoundation },
  { code: "WINDOWS", label: DAMAGE_MESSAGES.areaWindows },
];

export const DamageComponent = ({
  value,
  onValueChange,
  lineOfBusiness = "auto",
  damageAreaOptions,
  readOnly,
}: DamageProps) => {
  const intl = useIntl();
  const selectedAreas = value?.damageAreas ?? [];
  const areas =
    damageAreaOptions ??
    (lineOfBusiness === "property" ? PROPERTY_DAMAGE_AREAS : AUTO_DAMAGE_AREAS);

  const toggleArea = useCallback(
    (code: string) => {
      if (readOnly) return;
      const next = selectedAreas.includes(code)
        ? selectedAreas.filter((a) => a !== code)
        : [...selectedAreas, code];
      onValueChange(next, "damageAreas");
    },
    [readOnly, selectedAreas, onValueChange],
  );

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      onValueChange(raw === "" ? undefined : Number(raw), "estimatedAmount");
    },
    [onValueChange],
  );

  const handleSafetyToggle = useCallback(
    (next: boolean) => {
      if (readOnly) return;
      onValueChange(next, "safetyConcerns");
    },
    [readOnly, onValueChange],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {intl.formatMessage(DAMAGE_MESSAGES.title)}
        </h1>
        <p className={styles.subtitle}>
          {intl.formatMessage(DAMAGE_MESSAGES.subtitle)}
        </p>
      </header>

      <section>
        <div className={styles.sectionLabel}>
          {intl.formatMessage(DAMAGE_MESSAGES.affectedAreasLabel)}
        </div>
        <div className={styles.tileGrid}>
          {areas.map((area) => {
            const selected = selectedAreas.includes(area.code);
            return (
              <button
                key={area.code}
                type="button"
                className={`${styles.tile} ${selected ? styles.tileActive : ""}`}
                onClick={() => toggleArea(area.code)}
                disabled={readOnly}
                aria-pressed={selected}
              >
                <FontAwesomeIcon icon={faCarSide} className={styles.tileIcon} />
                <span className={styles.tileLabel}>
                  {intl.formatMessage(area.label)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.bottomRow}>
        <FormInput
          label={`${intl.formatMessage(
            DAMAGE_MESSAGES.estimatedLossAmountLabel,
          )} (USD)`}
          type="number"
          min={0}
          step="0.01"
          placeholder={intl.formatMessage(
            DAMAGE_MESSAGES.estimatedLossAmountPlaceholder,
          )}
          value={value?.estimatedAmount ?? ""}
          onChange={handleAmountChange}
          disabled={readOnly}
        />

        <YesNoToggle
          label={intl.formatMessage(DAMAGE_MESSAGES.safetyConcernLabel)}
          value={value?.safetyConcerns === true}
          onChange={handleSafetyToggle}
          disabled={readOnly}
          yesLabel={intl.formatMessage(DAMAGE_MESSAGES.yes)}
          noLabel={intl.formatMessage(DAMAGE_MESSAGES.no)}
          variant="primary"
          size="medium"
          fullWidth
        />
      </section>
    </div>
  );
};
