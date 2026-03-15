import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="modern-header">
      <Link to="/" className="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        Twtcher
      </Link>
      <nav className="nav-links">
        <NavLink exact="true" className="nav-item" to="/">Home</NavLink>
        <NavLink className="nav-item" to="/browse">Browse</NavLink>
        <NavLink className="nav-item" to="/clips">Clips</NavLink>
      </nav>
    </header>
  );
};

export default Header;