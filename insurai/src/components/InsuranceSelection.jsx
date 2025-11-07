import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoup from '../assets/logoup.png';
import '../App.css';

const InsuranceSelection = () => {
    const [selectedInsurance, setSelectedInsurance] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInsuranceSubmit = async (e) => {
        e.preventDefault();
        if (!selectedInsurance) {
            setError('Please select an insurance type');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await axios.post('http://localhost:8080/api/dashboard/insurance', {
                email: user.email,
                type: selectedInsurance
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to select insurance type. Please try again.');
            console.error('Insurance selection error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <img src={logoup} alt="InsurAI Logo" className="logoup" />
                <h1>Select Insurance Type</h1>
                <p>Choose the insurance that best fits your needs. Our AI-powered system will provide personalized coverage options.</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleInsuranceSubmit}>
                    <select
                        value={selectedInsurance}
                        onChange={(e) => setSelectedInsurance(e.target.value)}
                        required
                        disabled={loading}
                    >
                        <option value="">Choose Insurance Type</option>
                        <option value="health">Health Insurance</option>
                        <option value="life">Life Insurance</option>
                        <option value="auto">Auto Insurance</option>
                        <option value="home">Home Insurance</option>
                        <option value="travel">Travel Insurance</option>
                        <option value="business">Business Insurance</option>
                        <option value="vehicle">Vehicle Insurance</option>
                        <option value="property">Property Insurance</option>
                        <option value="liability">Liability Insurance</option>
                    </select>
                    <button type="submit" className="sign-up-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Selection'}
                    </button>
                </form>
            </div>
            <div className="right">
                <h2>Why Choose InsurAI?</h2>
                <p>Get the best insurance coverage tailored for you. Our corporate solutions are designed for businesses of all sizes.</p>
                <div className="coverage-list">
                    <div className="coverage-item">✓ Comprehensive Coverage</div>
                    <div className="coverage-item">✓ Affordable Rates</div>
                    <div className="coverage-item">✓ 24/7 Support</div>
                    <div className="coverage-item">✓ Quick Claims</div>
                    <div className="coverage-item">✓ AI-Powered Risk Assessment</div>
                    <div className="coverage-item">✓ Corporate Solutions</div>
                    <div className="coverage-item">✓ Business Continuity Planning</div>
                    <div className="coverage-item">✓ Regulatory Compliance</div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceSelection;
