// src/App.js
import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './component/MainPage';
import Login from './component/Login/Login';
import AdminPage from './component/AdminPage/AdminPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Tiktok_Web/admin" element={<AdminPage user={user} />} />
          <Route path="/Tiktok_Web/login" element={<Login setUser={setUser} />} />
          <Route path="/Tiktok_Web" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
