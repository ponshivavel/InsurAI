import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        // Mock registration for testing
        setTimeout(() => {
            // Mock successful registration
            navigate('/login');
        }, 1000); // Simulate API delay
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-left">
                    <img src={logo} alt="InsurAI Logo" className="register-logo" />
                    <h1 className="register-heading">Sign Up</h1>
                    {error && <p className="register-error">{error}</p>}
                    <form onSubmit={handleSubmit} className="register-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="register-input"
                            required
                        />
                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="register-login-link">
                        <p>Already have an account? <a href="#" onClick={() => navigate('/login')}>Log In</a></p>
                    </div>
                </div>
                <div className="register-right">
                    <h2 className="register-welcome-heading">Welcome to InsurAI</h2>
                    <h3 className="register-about-subheading">ABOUT US</h3>
                    <p className="register-about-paragraph">Welcome to InsureAI, your trusted partner for comprehensive insurance solutions in the digital age...</p>
                    <h4>Our Insurance Offerings:</h4>
                    <div className="register-coverage-list">
                        <div className="register-coverage-item">✓ Health Insurance    ✓ Corporate Solutions</div>
                        <div className="register-coverage-item">✓ Life Insurance    ✓ Auto Insurance</div>
                        <div className="register-coverage-item">✓ Home Insurance    ✓ Business Insurance</div>
                        <div className="register-coverage-item">✓ Vehicle Insurance ✓ Property Insurance</div>
                        <div className="register-coverage-item">✓ Liability Insurance ✓ Travel Insurance</div>
                    </div>
                    <p className="register-company-context">InsurAI Corporate Policy - Protecting Businesses Worldwide</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
