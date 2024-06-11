// src/component/Logout/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';

const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); 
    navigate('/Tiktok_Web');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
