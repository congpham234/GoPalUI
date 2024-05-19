// src/components/NavBar.js
import React, { useState } from 'react';
import './NavBar.scss';
import { FiMenu } from 'react-icons/fi';
import CustomButton from './CustomButton';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src="/images/GoPal-logo.svg" alt="GoPal Logo" /></div>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <CustomButton customVariant="secondary">Log in</CustomButton>
        <CustomButton customVariant="primary">Sign up</CustomButton>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <FiMenu/>
      </div>
    </nav>
  );
};

export default NavBar;
