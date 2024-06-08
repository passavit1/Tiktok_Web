// src/component/Header/Header.js
import React from 'react';
import './Header.css';

const Header = ({ profileImage, profileName }) => {
  return (
    <header className="header">
      <img src={profileImage} alt="Profile" className="profile-pic" />
      <h1>{profileName}</h1>
    </header>
  );
};

export default Header;
