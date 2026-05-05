import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './DashboardTile.module.scss';

export interface TileData {
  icon: IconDefinition;
  title: React.ReactNode;
  path: string;
  classname: string;
  count: number;
}

const DashboardTile = ({ icon, title, path, classname, count }: TileData) => {
  const navigate = useNavigate();

  return (
    <div className={styles.featureCard} onClick={() => navigate(path)}>
      <div className={styles[classname as keyof typeof styles]}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <h2 className={styles.featureCount}>{count}</h2>
    </div>
  );
};

export default DashboardTile;
