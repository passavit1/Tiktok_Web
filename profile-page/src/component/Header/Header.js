import React from "react";
import "./Header.css";

import profilePic from "../../Images/profile.png";
const Header = () => {
  return (
    <header className="header">
      <img src={profilePic} alt="profile" className="profile-pic" />
      <h1>Solmoon12</h1>
      <p>Hello World</p>
    </header>
  );
};

export default Header;
