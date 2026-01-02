import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: 'admin@admin.com',
        password: '1234',
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

        // Check for default admin credentials
        if (formData.email === 'admin@admin.com' && formData.password === '1234') {
            const token = 'mock-jwt-token';
            const user = { id: 1, name: 'Admin User', email: formData.email };
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(); // Call the onLogin prop to update authentication state
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            const { token, message } = response.data;
            const user = { id: 1, name: 'Admin User', email: formData.email };
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(); // Call the onLogin prop to update authentication state
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-left">
                    <img src={logo} alt="InsurAI Logo" className="login-logo" />
                    <h1 className="login-heading">Login</h1>
                    {error && <p className="login-error">{error}</p>}
                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="login-input"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="login-input"
                            required
                        />
                        <div className="mode-selection">
                            <label>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="user"
                                    checked={formData.mode === 'user'}
                                    onChange={handleInputChange}
                                />
                                User Mode
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mode"
                                    value="admin"
                                    checked={formData.mode === 'admin'}
                                    onChange={handleInputChange}
                                />
                                Admin Mode
                            </label>
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    <div className="login-signup-link">
                        <p>Don't have an account? <a href="#" onClick={() => navigate('/register')}>Sign Up</a></p>
                    </div>
                </div>
                <div className="login-right">
                    <h2 className="welcome-heading">Welcome to InsurAI</h2>
                    <h3 className="about-subheading">ABOUT US</h3>
                    <p className="about-paragraph">
                        Welcome to InsurAI, your trusted partner for comprehensive insurance solutions in the digital age.
                        We leverage cutting-edge AI technology to provide personalized, efficient, and reliable insurance services
                        tailored to meet the unique needs of businesses and individuals worldwide.
                    </p>
                    <div className="insurance-offerings">
                        <div className="offering-item">✓ Health Insurance   ✓ Corporate Solutions</div>
                        <div className="offering-item">✓ Life Insurance     ✓ Auto Insurance</div>
                        <div className="offering-item">✓ Home Insurance     ✓ Business Insurance</div>
                        <div className="offering-item">✓ Vehicle Insurance  ✓ Property Insurance</div>
                        <div className="offering-item">✓ Liability Insurance ✓ Travel Insurance</div>
                    </div>
                    <p className="footer-text">
                        <em>InsurAI – Your AI-Powered Insurance Partner – Protecting Businesses Worldwide</em>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
