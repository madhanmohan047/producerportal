import React from "react";
import styles from "./Header.module.scss";
import appfabs_logo from "../../assets/appfabs_logo.png"; // Guidewire logo
import SubHeader from "../SubHeader/SubHeader";

const Header = ({ showSubHeader }: { showSubHeader: boolean }) => {
  return (
    <>
      <div className={styles.header}>
        <img
          src={appfabs_logo}
          alt="Guidewire Logo"
          className={styles.gwlogo}
        />
        <div className={styles.userlogo}>Admin</div>{" "}
      </div>
      {showSubHeader && <SubHeader />}
    </>
  );
};

export default Header;
