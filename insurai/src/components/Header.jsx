import React from 'react';
import logoup from '../assets/logoup.png';
const Header = ({ onLogout }) => {
    return (
        <header className="app-header">
            <div className="header-left">
                
                <div className="logo-text">
                    <span className="logo-main">InsurAI</span>
                    <span className="logo-sub">Insurance Company</span>
                </div>
            </div>
            <div className="header-center">
                <h1 className="header-title">Welcome to InsurAI Insurance</h1>
            </div>
            <div className="header-right">
                <button className="header-icon" onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>Logout</button>
                <div className="header-icon">☰</div>
            </div>
        </header>
    );
};

export default Header;
