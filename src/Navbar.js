import React from 'react';
import './style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Tradester</div>
      <ul className="navbar-menu">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">Portfolio</li>
        <li className="navbar-item">History</li>
        <li className="navbar-item">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;