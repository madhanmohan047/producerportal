import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import appfabs_logo from "../../assets/images/appfabs_logo.png"; 
import SubHeader from "../SubHeader/SubHeader";
import { RouteConfig } from "../../api/utils/routeConfig";
import { useAuth } from "../../context/AuthContext";

const Header = ({
  showSubHeader,
  routes,
}: {
  showSubHeader: boolean;
  routes: RouteConfig[];
}) => {
  const { user, userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <div className={styles.header}>
        <img src={appfabs_logo} alt="Logo" className={styles.gwlogo} />

        <div className={styles.userMenuContainer} ref={menuRef}>
          <div 
            className={styles.avatar} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {getInitials()}
          </div>
          {isMenuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.userProfile}>
                <p className={styles.userName}>{user?.name || "User"}</p>
                <p className={styles.userEmail}>{user?.email}</p>
                <span className={styles.roleBadge}>{userRole}</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <button className={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {showSubHeader && <SubHeader routes={routes} />}
    </>
  );
};

export default Header;
