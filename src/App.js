import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const API_URL = 'https://voxtext-backend-r6l8.onrender.com';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('voxtext_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('voxtext_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('voxtext_user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login onLogin={handleLogin} apiUrl={API_URL} />
        } />
        <Route path="/*" element={
          user ? <Dashboard user={user} onLogout={handleLogout} apiUrl={API_URL} />
               : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;