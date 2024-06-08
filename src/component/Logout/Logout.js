// src/component/Logout/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); 
    navigate('/Tiktok_Web/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
