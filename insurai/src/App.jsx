import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PlanInformation from './pages/PlanInformation';
import Appointments from './pages/Appointments';
import Notifications from './pages/Notifications';
import AgentManagement from './pages/AgentManagement';
import DownloadDocuments from './pages/DownloadDocuments';
import RenewPolicies from './pages/RenewPolicies';
import AiAssistant from './components/AiAssistant';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always start with login page - clear any existing session
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Header onLogout={handleLogout} />
          <div className="app-main">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plan-information" element={<PlanInformation />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/agent-management" element={<AgentManagement />} />
                <Route path="/download-documents" element={<DownloadDocuments />} />
                <Route path="/renew-policies" element={<RenewPolicies />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
          <AiAssistant />
        </div>
      )}
    </Router>
  );
}

export default App;
