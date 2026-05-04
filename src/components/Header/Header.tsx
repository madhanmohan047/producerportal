import React from "react";
import styles from "./Header.module.scss";
import gwLogo from "../../assets/gw_logo.png"; // Guidewire logo

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={gwLogo} alt="Guidewire Logo" className={styles.gwlogo} />
      <div className={styles.userlogo}>Admin</div>{" "}
    </header>
  );
};

export default Header;
