import React from 'react';
import './StatusBadge.css';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default' 
}) => {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
