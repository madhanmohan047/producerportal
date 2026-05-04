
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {DASHBOARD_MESSAGES} from "./dashboard.messages";
import styles from "../Dashboard/dashboard.module.scss";
import {Features} from "./DashboardFeatures";


export default function Dashboard(){
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            {/* <Header/> */}
            <section>
                <h2> {DASHBOARD_MESSAGES.DASHBOARDS_TITLE}</h2>
            </section>
             <div className={styles.featuresGrid}>
          {Features.map((f) => (
            <div key={f.title} className={styles.featureCard} onClick={() => navigate(f.path)}>
              <div className={styles[f.classname as keyof typeof styles]}><FontAwesomeIcon icon={f.icon} /> </div>
              <h3 className={styles.featureTitle}>{f.title}</h3> <h2>{f.number}</h2>
            </div>
            
          ))}
        </div>
        </div>
    );
}