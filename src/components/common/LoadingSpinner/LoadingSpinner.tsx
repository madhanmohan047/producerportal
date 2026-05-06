import React from 'react';
import '../LoadingSpinner/LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  fullPage = false 
}) => {
  return (
    <div className={`loading-spinner ${fullPage ? 'full-page' : ''}`}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
