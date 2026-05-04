import React from "react";
import { NavLink } from "react-router-dom";
import config from "../../App.config";
import styles from "./SubHeader.module.scss";

const SubHeader = () => {
  return (
    <div className={styles.subheader}>
      {config.defaultRoutes.routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            isActive
              ? `${styles.subheaderLink} ${styles.active}`
              : styles.subheaderLink
          }
        >
          {route.title}
        </NavLink>
      ))}
    </div>
  );
};

export default SubHeader;
