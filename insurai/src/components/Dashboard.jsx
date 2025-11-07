import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoup from '../assets/logoup.png';
import '../App.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/api/dashboard/user/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDashboardData(response.data);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-fullscreen">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-fullscreen">
                <div className="error-message">{error}</div>
                <button onClick={fetchDashboardData} className="retry-btn">Retry</button>
            </div>
        );
    }

    return (
        <div className="dashboard-fullscreen">
            <div className="dashboard-header">
                <img src={logoup} alt="InsurAI Logo" className="logo" />
                <h1>WELCOME TO INSURAI INSURANCE<pre>get insurance and protect your family</pre></h1>
                <div className="profile-menu">
                    <button
                        className="profile-btn"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        👤 ≡
                    </button>
                    {isProfileMenuOpen && (
                        <div className="profile-dropdown">
                            <button onClick={() => navigate('/profile')}>Profile</button>
                            <button onClick={() => navigate('/payments')}>Payment Bill</button>
                            <button onClick={() => navigate('/settings')}>Settings</button>
                            <button onClick={() => navigate('/support')}>Support</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-section">
                    <h3>Policy Summary</h3>
                    <div className="policy-card">
                        <p><strong>Active Policies:</strong> {dashboardData?.policySummary?.activePolicies || 0}</p>
                        <p><strong>Next Expiry:</strong> {dashboardData?.policySummary?.nextExpiry || 'N/A'}</p>
                        <p><strong>Coverage:</strong> {dashboardData?.policySummary?.coverage || 'None'}</p>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>Upcoming Payments</h3>
                    <div className="payment-reminder">
                        {dashboardData?.upcomingPayments?.length > 0 ? (
                            dashboardData.upcomingPayments.map((payment, index) => (
                                <p key={index}><strong>{payment.type}:</strong> Due {payment.dueDate} - {payment.amount}</p>
                            ))
                        ) : (
                            <p>No upcoming payments</p>
                        )}
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>Claims Status</h3>
                    <div className="claim-status">
                        {dashboardData?.claimsStatus?.length > 0 ? (
                            dashboardData.claimsStatus.map((claim, index) => (
                                <p key={index}><strong>{claim.claimNumber}:</strong> {claim.status} - {claim.amount}</p>
                            ))
                        ) : (
                            <p>No claims found</p>
                        )}
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>Payments</h3>
                    <div className="payment-section">
                        <h4>Premium Payment Gateway</h4>
                        <div className="payment-options">
                            <button onClick={() => alert('Redirecting to card payment... (Simulated)')} className="payment-btn">Pay via Card</button>
                            <button onClick={() => alert('Redirecting to UPI payment... (Simulated)')} className="payment-btn">Pay via UPI</button>
                            <button onClick={() => alert('Redirecting to net banking... (Simulated)')} className="payment-btn">Pay via Net Banking</button>
                        </div>
                        <h4>Payment History</h4>
                        <div className="payment-history">
                            {dashboardData?.paymentHistory?.length > 0 ? (
                                dashboardData.paymentHistory.map((payment, index) => (
                                    <p key={index}><strong>{payment.date}:</strong> {payment.description} - {payment.amount} - {payment.status}</p>
                                ))
                            ) : (
                                <p>No payment history</p>
                            )}
                            <button onClick={() => alert('Downloading receipt... (Simulated download)')} className="download-btn">Download Receipt</button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>Policy Management</h3>
                    <div className="policy-actions">
                        <button onClick={() => alert('Coverage: Comprehensive health coverage including hospitalization, outpatient care, and preventive services.\n\nTerms and Conditions: Policy is valid for 1 year, subject to renewal. Exclusions apply for pre-existing conditions.')} className="action-btn">View Policy Details</button>
                        <button onClick={() => alert('Downloading policy documents... (Simulated download)')} className="action-btn">Download Documents</button>
                        <button onClick={() => alert('Redirecting to payment for renewal... (Simulated renewal)')} className="action-btn">Renew Policies</button>
                    </div>
                </div>

                <button onClick={() => navigate('/insurance')} className="sign-up-btn">Manage Policies</button>
            </div>
        </div>
    );
};

export default Dashboard;
