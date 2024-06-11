// src/App.js
import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './component/MainPage';
import Login from './component/Login/Login';
import AdminPage from './component/AdminPage/AdminPage';
import { UserProvider } from './Context/UserContext'; 
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/Tiktok_Web/admin" element={<AdminPage />} />
            <Route path="/Tiktok_Web/login" element={<Login />} />
            <Route path="/Tiktok_Web" element={<MainPage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;