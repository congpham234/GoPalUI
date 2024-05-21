// src/components/NavBar.js
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import './NavBar.scss';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="/images/GoPal-logo.svg" alt="GoPal logo" />
        </div>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <CustomButton customVariant="primary">Sign up</CustomButton>
          <CustomButton customVariant="secondary">Log in</CustomButton>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
