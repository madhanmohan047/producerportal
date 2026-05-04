import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApiTestPage from './components/ApiTestPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
              <nav className="top-nav">
                <Link to="/api-test" className="nav-link">API Test</Link>
              </nav>
            </>
          } />
          <Route path="/api-test" element={<ApiTestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
