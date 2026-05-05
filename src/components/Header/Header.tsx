import React from "react";
import styles from "./Header.module.scss";
import appfabs_logo from "../../assets/appfabs_logo.png"; // Guidewire logo
import SubHeader from "../SubHeader/SubHeader";
import { RouteConfig } from "../../api/utils/routeConfig";

const Header = ({
  showSubHeader,
  routes,
}: {
  showSubHeader: boolean;
  routes: RouteConfig[];
}) => {
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
      {showSubHeader && <SubHeader routes={routes} />}
    </>
  );
};

export default Header;
