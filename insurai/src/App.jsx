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
import VoiceRecognition from './components/VoiceRecognition';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('authToken'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogin = () => {
        setToken(localStorage.getItem('authToken'));
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <Router>
            {!isAuthenticated ? (
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            ) : (
                <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                    <Header onLogout={handleLogout} />
                    <div className="app-main" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        <Sidebar />
                        <main className="main-content" style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
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
                        </main>
                    </div>
                    <VoiceRecognition />
                </div>
            )}
        </Router>
    );
}

export default App;
