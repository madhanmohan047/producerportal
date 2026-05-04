import React from 'react';
import { Link } from 'react-router-dom';
import ApiTest from '../ApiTest';
import './ApiTestPage.css';

const ApiTestPage: React.FC = () => {
  return (
    <div className="api-test-page">
      <nav className="navbar">
        <h1 className="navbar-title">Producer Portal</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/api-test">API Test</Link>
          </li>
        </ul>
      </nav>
      <main className="page-content">
        <ApiTest />
      </main>
    </div>
  );
};

export default ApiTestPage;
