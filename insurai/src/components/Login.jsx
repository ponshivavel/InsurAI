import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logo.png';
import './Login.css';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: 'admin@admin.com',
        password: 'admin',
        mode: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email: formData.email.trim(),
                password: formData.password
            });

            const { token } = response.data;
            const user = {
                name: formData.email.split('@')[0],
                email: formData.email.trim(),
                mode: formData.mode
            };

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');

            if (onLogin) {
                onLogin();
            }
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            const msg = err.response?.data?.message || err.response?.data || 'Invalid email or password';
            setError(typeof msg === 'string' ? msg : 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-left">
                    <img src={logo} alt="InsurAI Logo" className="login-logo" />
                    <h1 className="login-heading">Sign In</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '18px' }}>
                        Access your InsurAI corporate policies and services
                    </p>

                    {error && <div className="login-error" style={{ marginBottom: '16px' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@admin.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="login-input"
                            required
                        />

                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="login-input"
                            required
                        />

                        <div className="mode-selection" style={{ margin: '10px 0' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="user"
                                    checked={formData.mode === 'user'}
                                    onChange={handleInputChange}
                                />
                                Corporate Client
                            </label>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="admin"
                                    checked={formData.mode === 'admin'}
                                    onChange={handleInputChange}
                                />
                                Policy Administrator
                            </label>
                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Sign In to InsurAI'}
                        </button>
                    </form>

                    <div className="login-signup-link">
                        <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register here</a></p>
                    </div>
                </div>

                <div className="login-right">
                    <h2 className="welcome-heading">InsurAI Enterprise</h2>
                    <h3 className="about-subheading">INTELLIGENT RISK MANAGEMENT</h3>
                    <p className="about-paragraph">
                        Welcome to InsurAI, your next-generation platform for digital insurance portfolio management.
                        We streamline policy administration, automated renewal scheduling, cashless claim assistance,
                        and intelligent voice-driven navigation for modern businesses and individuals.
                    </p>
                    <div className="insurance-offerings">
                        <div className="offering-item">✓ Corporate Health Shield</div>
                        <div className="offering-item">✓ Executive Vehicle & Fleet</div>
                        <div className="offering-item">✓ Commercial Cyber Liability</div>
                        <div className="offering-item">✓ Business Continuity Insurance</div>
                        <div className="offering-item">✓ Instant Cashless Claims Dispatch</div>
                        <div className="offering-item">✓ Integrated Speech Navigation</div>
                    </div>
                    <p className="footer-text">
                        <em>InsurAI — Secure &bull; Reliable &bull; AI-Powered</em>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
