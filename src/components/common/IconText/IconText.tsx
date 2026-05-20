import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ComboboxOption } from "../Combobox/Combobox";
import styles from "./IconText.module.scss";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { DamageAreaOption } from "../../DamageComponent/DamageComponent";
type Props = {
  option: DamageAreaOption;
  onClick: () => void;
};

const IconText = ({ option, onClick }: Props) => {
  return (
    <>
      <button
        type="button"
        className={`${styles.tile} ${option.active ? styles.tileActive : ""}`}
        onClick={onClick}
        // disabled={readOnly}
        aria-pressed={option.active}
      >
        <FontAwesomeIcon icon={faCarSide} className={styles.tileIcon} />
        <span className={styles.tileLabel}>{option.label}</span>
      </button>
    </>
  );
};
export default IconText;
