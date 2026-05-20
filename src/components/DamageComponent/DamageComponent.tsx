import React, { useCallback } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import FormInput from "../common/FormInput/FormInput";
import YesNoToggle from "../common/YesNoToggle/YesNoToggle";
import { DAMAGE_MESSAGES } from "./DamageComponent.messages";
import styles from "./DamageComponent.module.scss";
import { CombinedCodeActions } from "typescript";
import { ComboboxOption } from "../common/Combobox/Combobox";
import IconText from "../common/IconText/IconText";

export type LineOfBusiness = "auto" | "property";

export type DamageInfo = {
  damageAreas: string[];
  estimatedAmount?: number;
  safetyConcerns: boolean;
};

export type DamageAreaOption = {
  code: string;
  label: string;
  img: string;
  active: boolean;
};

type DamageProps = {
  value?: DamageInfo;
  onValueChange: (value: any, path: string) => void;
  lineOfBusiness?: LineOfBusiness;
  damageAreaOptions?: DamageAreaOption[];
  readOnly?: boolean;
};

export const DamageComponent = ({
  value,
  onValueChange,
  lineOfBusiness = "auto",
  damageAreaOptions,
  readOnly,
}: DamageProps) => {
  const intl = useIntl();
  const selectedAreas = value?.damageAreas ?? [];

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
  const handleAreaToggle = useCallback(
    (code: string) => {
      if (readOnly) return;

      const updatedAreas = selectedAreas.includes(code)
        ? selectedAreas.filter((item) => item !== code)
        : [...selectedAreas, code];

      onValueChange(updatedAreas, "damageAreas");
    },
    [selectedAreas, onValueChange, readOnly],
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
          {damageAreaOptions?.map((area) => (
            <IconText
              option={{
                ...area,
                active: selectedAreas.includes(area.code),
              }}
              onClick={() => handleAreaToggle(area.code)}
            />
          ))}
        </div>
      </section>

      <section className={styles.bottomRow}>
        <FormInput
          label={`${intl.formatMessage(
            DAMAGE_MESSAGES.estimatedLossAmountLabel,
          )} (USD)`}
          type="number"
          min={0}
          step="1.00"
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
