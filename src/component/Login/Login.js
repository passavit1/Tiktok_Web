// src/component/Login/Login.js
import React from 'react';
import { auth, provider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Correctly get the user object
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user)); // Store user in sessionStorage
      navigate('/Tiktok_Web/admin'); 
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
