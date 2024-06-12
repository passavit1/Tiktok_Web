import React, { useState } from 'react';
import { auth, provider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import userService from '../../services/userService';

const Login = () => {
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("handleLogin called");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if UID exists in Firestore
      console.log("Checking if UID exists in Firestore...");
      const response = await userService.getUserByUid(user.uid);
      console.log("API response:", response);

      if (response.data && response.data.user) {
        // UID exists, proceed to admin page
        console.log("User found:", response.data.user);
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/open_link_solmoom/admin');
      } else {
        // UID does not exist
        console.log("User not found in Firestore.");
        setError('User is not authenticated. Please create a new user.');
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Request data:", error.request);
        setError('Error: No response from the server.');
      } else {
        console.error("Error message:", error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  const handleCreateUser = async () => {
    try {
      console.log("handleCreateUser called");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        isSuperadmin: false,
      };

      const response = await userService.createUser(newUser);
      console.log("New user created:", response.data);

      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/open_link_solmoom/admin');
    } catch (error) {
      console.error("Error creating new user with Google:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Request data:", error.request);
        setError('Error: No response from the server.');
      } else {
        console.error("Error message:", error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login with Google</button>
      <button onClick={handleCreateUser}>Create New User with Google</button>
    </div>
  );
};

export default Login;
