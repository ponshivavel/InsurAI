import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

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
        <div className="container">
            <div className="left">
                <img src={logo} alt="InsurAI Logo" className="logo" />
                <h1>Sign Up</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" className="sign-up-btn" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="login-text">
                    <p>Already have an account? <a href="#" onClick={() => navigate('/login')}>Log In</a></p>
                </div>
            </div>
            <div className="right">
                <h2>Welcome to InsurAI</h2>
                <h3>ABOUT US</h3>
                <p>Welcome to InsureAI, your trusted partner for comprehensive insurance solutions in the digital age...</p>
                <h4>Our Insurance Offerings:</h4>
                <div className="coverage-list">
                    <div className="coverage-item">✓ Health Insurance    ✓ Corporate Solutions</div>
                    <div className="coverage-item">✓ Life Insurance    ✓ Auto Insurance</div>
                    <div className="coverage-item">✓ Home Insurance    ✓ Business Insurance</div>
                    <div className="coverage-item">✓ Vehicle Insurance ✓ Property Insurance</div>
                    <div className="coverage-item">✓ Liability Insurance ✓ Travel Insurance</div>
                </div>
                <p className="company-context">InsurAI Corporate Policy - Protecting Businesses Worldwide</p>
            </div>
        </div>
    );
};

export default Register;
