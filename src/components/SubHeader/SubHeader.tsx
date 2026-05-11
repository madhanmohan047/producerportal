import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SubHeader.module.scss";
import { RouteConfig } from "../../api/utils/routeConfig";

const SubHeader = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <div className={styles.subheader}>
      {routes.map((route) =>
        route.showNavbar ? (
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
        ) : null,
      )}
    </div>
  );
};

export default SubHeader;
