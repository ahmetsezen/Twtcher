import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="component-container" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="modern-card" style={{ textAlign: 'center', padding: '4rem', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#8b5cf6' }}>404</h1>
        <h2 style={{ marginBottom: '2rem', color: '#f8fafc' }}>Page Not Found</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" style={{ background: '#8b5cf6', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;