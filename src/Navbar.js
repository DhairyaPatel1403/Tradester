import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'; 


const Navbar = () => {



  return (
    <nav className="navbar">
      <div className="navbar-brand">Tradester</div>
      <ul className="navbar-menu">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">
        <Link to="/History" style={{ textDecoration: 'none', color: 'inherit' }}>History</Link>
        </li>
        <li className="navbar-item">
        <Link to="/Contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;