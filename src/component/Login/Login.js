// src/components/Login.js
import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
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
