import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Header Component with navigation and theme toggle
 * @param {function} toggleTheme - Function to toggle theme
 * @param {string} theme - Current theme
 */
const Header = ({ toggleTheme, theme }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Job Tracker</span>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Dashboard
            </Link>
            <Link to="/jobs" className={`nav-link ${isActive('/jobs')}`}>
              All Jobs
            </Link>
            <Link to="/add" className={`nav-link ${isActive('/add')}`}>
              Add Job
            </Link>
          </nav>

          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;