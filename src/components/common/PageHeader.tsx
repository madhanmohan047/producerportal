import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  backLink?: {
    label?: string;
    to: string;
  };
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  backLink,
  actions 
}) => {
  return (
    <div className="page-header">
      <div className="page-header__title-section">
        {backLink && (
          <Link to={backLink.to} className="page-header__back-link">
            ← {backLink.label || 'Back'}
          </Link>
        )}
        <h1 className="page-header__title">{title}</h1>
      </div>
      {actions && (
        <div className="page-header__actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
