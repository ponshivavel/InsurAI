import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoup from '../assets/logoup.png';

const Header = ({ onLogout }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{"email":"admin@admin.com","name":"Admin"}');
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="app-header" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '70px',
            backgroundColor: '#0f2a4a',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                <img src={logoup} alt="InsurAI" style={{ height: '36px', width: 'auto' }} />
                <div className="logo-text">
                    <div style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px' }}>InsurAI</div>
                </div>
            </div>

            <div className="header-center" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            </div>

            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                <button
                    onClick={() => navigate('/notifications')}
                    style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="View Notifications"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>

                <div
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '13px'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span style={{ fontWeight: '600' }}>{user.name || user.email.split('@')[0]}</span>
                    <span style={{ fontSize: '10px' }}>▼</span>
                </div>

                {menuOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '50px',
                        right: 0,
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        borderRadius: '10px',
                        width: '200px',
                        padding: '8px 0',
                        zIndex: 200,
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f2a4a' }}>{user.name || 'User'}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{user.email}</div>
                        </div>
                        <button
                            onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => { setMenuOpen(false); navigate('/appointments'); }}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                            Consultations
                        </button>
                        <button
                            onClick={() => { setMenuOpen(false); navigate('/renew-policies'); }}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                            Policy Portfolio
                        </button>
                        <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }}></div>
                        <button
                            onClick={() => { setMenuOpen(false); onLogout(); }}
                            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', color: '#dc2626', fontWeight: '600' }}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
