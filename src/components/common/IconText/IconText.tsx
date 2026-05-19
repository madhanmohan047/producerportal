import React from "react";

const IconText = (area: ) => {
  return (
    <div>
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
    </div>
  );
};
