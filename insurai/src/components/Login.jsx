import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import ai from '../ai.png';
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: 'admin@admin.com',
        password: 'admin'
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
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { token, message } = response.data;
            const user = { id: 1, name: 'Admin User', email: formData.email };
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <img src={logo} alt="InsurAI Logo" className="logo" />
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="sign-up-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <div className="login-text">
                    <p>Don't have an account? <a href="#" onClick={() => navigate('/register')}>Sign Up</a></p>
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
                <p className="company-context">InsurAI - Your AI-Powered Insurance Partner - Protecting Businesses Worldwide</p>
            </div>
        </div>
    );
};

export default Login;
