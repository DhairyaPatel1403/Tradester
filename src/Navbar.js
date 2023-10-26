import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'; 
import { NavLink, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { changeUserName } from './storeAction'; 

const Navbar = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const nameofuser = useSelector((state) => state.user.name);

  const logout = async () => {
    dispatch(changeUserName(""));
  }

  const login = async () => {
    navigate("/login"); 
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Tradester</div>
      <ul className="navbar-menu">
        <li className="navbar-item">Home</li>
        {nameofuser !== 'robin' && nameofuser !== '' && (
          <li className="navbar-item">
            <Link to="/History" style={{ textDecoration: 'none', color: 'inherit' }}>History</Link>
          </li>
        )}
        <li className="navbar-item">
          <Link to="/Contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
        </li>
        {nameofuser === 'robin' || nameofuser === '' ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={logout}>Log Out - {nameofuser}</button>
        )}
      </ul>
    </nav>


  );
};

export default Navbar;