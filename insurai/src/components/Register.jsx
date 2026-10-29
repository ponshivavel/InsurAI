import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logo.png';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        setSuccess('');

        if (formData.password.length < 4) {
            setError('Password must be at least 4 characters long');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await api.post('/auth/register', {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } catch (err) {
            console.error('Registration error:', err);
            const msg = err.response?.data?.message || err.response?.data || 'Registration failed. Email might already exist.';
            setError(typeof msg === 'string' ? msg : 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-left">
                    <img src={logo} alt="InsurAI Logo" className="register-logo" />
                    <h1 className="register-heading">Create Account</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '18px' }}>
                        Register to manage your insurance policies and claims
                    </p>

                    {error && <div className="register-error" style={{ marginBottom: '16px' }}>{error}</div>}
                    {success && (
                        <div style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />

                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Work Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />

                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />

                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'left' }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />

                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Register Account'}
                        </button>
                    </form>

                    <div className="register-login-link">
                        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign In</a></p>
                    </div>
                </div>

                <div className="register-right">
                    <h2 className="register-welcome-heading">Why Choose InsurAI?</h2>
                    <h3 className="register-about-subheading">COMPLETE RISK COVERAGE</h3>
                    <p className="register-about-paragraph">
                        Join hundreds of enterprises and policyholders who trust InsurAI for transparent premium tracking,
                        fast claim settlements, and unified policy documentation.
                    </p>
                    <div className="register-coverage-list">
                        <div className="register-coverage-item">✓ Instant digital onboarding</div>
                        <div className="register-coverage-item">✓ Real-time claims approval tracking</div>
                        <div className="register-coverage-item">✓ Integrated appointment scheduling</div>
                        <div className="register-coverage-item">✓ Verified payment history & receipts</div>
                        <div className="register-coverage-item">✓ Enterprise-grade data protection</div>
                    </div>
                    <p className="register-company-context">InsurAI — Intelligent Protection for What Matters Most</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
