import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{"email":"admin@admin.com","name":"Admin"}');

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await api.get(`/dashboard/user/${encodeURIComponent(user.email)}`);
            setDashboardData(response.data);
        } catch (err) {
            console.error('Failed to load dashboard:', err);
            setError('Could not load dashboard data from backend server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handlePay = async (method) => {
        setPaymentProcessing(true);
        setPaymentMessage('');
        try {
            const newTxn = {
                email: user.email,
                policyName: dashboardData?.policySummary?.coverage || 'Comprehensive Corporate Health',
                amount: 150.00,
                lateFee: 0.00,
                gst: 13.50,
                premiumMode: 'Monthly',
                paymentMethod: method,
                status: 'Completed',
                branchAgency: 'BR001-OnlinePortal'
            };

            await api.post('/transactions', newTxn);
            setPaymentMessage(`Payment of 150.00 via ${method} succeeded! Updated transaction ledger.`);
            await fetchDashboardData();
        } catch (err) {
            console.error('Payment error:', err);
            setPaymentMessage('Payment simulated failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setPaymentProcessing(false);
            setTimeout(() => setPaymentMessage(''), 5000);
        }
    };

    if (loading) {
        return (
            <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
                    <p style={{ color: '#475569', fontWeight: '500' }}>Connecting to InsurAI SQL Database...</p>
                </div>
            </div>
        );
    }

    if (error && !dashboardData) {
        return (
            <div className="main-content" style={{ padding: '32px' }}>
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                    <h3 style={{ color: '#b91c1c', marginTop: 0 }}>Connection Issue</h3>
                    <p style={{ color: '#7f1d1d' }}>{error}</p>
                    <button onClick={fetchDashboardData} className="btn-primary" style={{ padding: '10px 24px' }}>Retry Connection</button>
                </div>
            </div>
        );
    }

    const policySummary = dashboardData?.policySummary || {};
    const upcomingPayments = dashboardData?.upcomingPayments || [];
    const claimsStatus = dashboardData?.claimsStatus || [];
    const paymentHistory = dashboardData?.paymentHistory || [];

    return (
        <div className="dashboard-content" style={{ paddingBottom: '32px' }}>
            {/* Page Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Policyholder Dashboard
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Welcome back, <strong style={{ color: '#1e3a5f' }}>{user.name || user.email}</strong> &bull; Real-time SQL metrics
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => navigate('/appointments')}
                        className="btn-primary"
                        style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Book Consultation
                    </button>
                    <button
                        onClick={() => navigate('/plan-information')}
                        className="btn-secondary"
                        style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        Explore Plans
                    </button>
                </div>
            </div>

            {paymentMessage && (
                <div style={{
                    backgroundColor: paymentMessage.includes('failed') ? '#fef2f2' : '#ecfdf5',
                    color: paymentMessage.includes('failed') ? '#b91c1c' : '#047857',
                    border: '1px solid ' + (paymentMessage.includes('failed') ? '#fecaca' : '#a7f3d0'),
                    padding: '14px 18px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    fontWeight: '500'
                }}>
                    {paymentMessage}
                </div>
            )}

            {/* Quick Metrics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Active Policies</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f2a4a', marginTop: '8px' }}>
                        {policySummary.activePolicies ?? 0}
                    </div>
                    <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>Verified in database</div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Total Coverage</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f2a4a', marginTop: '8px' }}>
                        {policySummary.totalCoverage || '0.00'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Total insured sum</div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Next Expiry / Renewal</div>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#0f2a4a', marginTop: '12px' }}>
                        {policySummary.nextExpiry || 'N/A'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '6px' }}>Automatic reminder active</div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Total Payments Made</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f2a4a', marginTop: '8px' }}>
                        {paymentHistory.length}
                    </div>
                    <div style={{ fontSize: '12px', color: '#3b82f6', marginTop: '4px' }}>Transactions recorded</div>
                </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="dashboard-grid">
                {/* Policy Summary Card */}
                <Card>
                    <h3 className="card-title">Policy Portfolio</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                        <div className="policy-row">
                            <span style={{ color: '#64748b' }}>Primary Plan:</span>
                            <span className="policy-value" style={{ fontWeight: '600', color: '#0f172a' }}>{policySummary.coverage || 'None'}</span>
                        </div>
                        <div className="policy-row">
                            <span style={{ color: '#64748b' }}>Active Policies Count:</span>
                            <span className="policy-value">{policySummary.activePolicies ?? 0}</span>
                        </div>
                        <div className="policy-row">
                            <span style={{ color: '#64748b' }}>Renewal Due Date:</span>
                            <span className="policy-value">{policySummary.nextExpiry || 'N/A'}</span>
                        </div>
                        <button
                            onClick={() => navigate('/renew-policies')}
                            className="btn-secondary"
                            style={{ marginTop: '8px', padding: '8px 16px', fontSize: '13px' }}
                        >
                            Manage Renewals
                        </button>
                    </div>
                </Card>

                {/* Upcoming Payments Card */}
                <Card>
                    <h3 className="card-title">Upcoming Premium Payments</h3>
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {upcomingPayments.length > 0 ? (
                            upcomingPayments.map((p, idx) => (
                                <div key={idx} className="payment-row" style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{p.policyName || p.type}</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Due: {p.dueDate}</div>
                                    </div>
                                    <span className="payment-amount" style={{ fontWeight: '700', color: '#0f2a4a' }}>
                                        {p.amount}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#94a3b8', margin: '8px 0' }}>No pending upcoming payments.</p>
                        )}
                    </div>
                </Card>

                {/* Claims Status Card */}
                <Card>
                    <h3 className="card-title">Claims & Settlements</h3>
                    <div style={{ marginTop: '12px' }}>
                        {claimsStatus.length > 0 ? (
                            claimsStatus.map((c, idx) => (
                                <div key={idx} className="claim-row" style={{ padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{c.claimNumber}</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>{c.description}</div>
                                    </div>
                                    <span className={c.status === 'Approved' ? 'status-approved' : 'status-pending'} style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        backgroundColor: c.status === 'Approved' ? '#ecfdf5' : '#fffbeb',
                                        color: c.status === 'Approved' ? '#047857' : '#b45309'
                                    }}>
                                        {c.status} — {c.amount}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#94a3b8', margin: '8px 0' }}>No active claims submitted.</p>
                        )}
                        <button
                            onClick={() => navigate('/appointments')}
                            className="btn-secondary"
                            style={{ marginTop: '12px', width: '100%', fontSize: '13px', padding: '8px' }}
                        >
                            Schedule Claim Assessment
                        </button>
                    </div>
                </Card>

                {/* Quote Card */}
                <Card>
                    <div className="quote-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p className="quote-text" style={{ fontStyle: 'italic', color: '#1e3a5f', fontWeight: '500' }}>
                            "Plan today — because tomorrow your family and enterprise will breathe freely from it."
                        </p>
                        <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>InsurAI Corporate Security Promise</span>
                    </div>
                </Card>

                {/* Premium Payment Gateway Card */}
                <Card fullWidth={true}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <h3 className="card-title" style={{ margin: 0 }}>Instant Premium Payment Gateway</h3>
                            <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>
                                Real database transaction execution with secure settlement simulation
                            </p>
                        </div>
                        <div className="payment-buttons" style={{ display: 'flex', gap: '12px' }}>
                            <button
                                disabled={paymentProcessing}
                                onClick={() => handlePay('Card')}
                                className="payment-btn"
                                style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Pay via Card (150)
                            </button>
                            <button
                                disabled={paymentProcessing}
                                onClick={() => handlePay('UPI')}
                                className="payment-btn"
                                style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Pay via UPI (150)
                            </button>
                            <button
                                disabled={paymentProcessing}
                                onClick={() => handlePay('Net Banking')}
                                className="payment-btn"
                                style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Net Banking (150)
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Real Payment History Table */}
                <Card fullWidth={true}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                            <h3 className="card-title" style={{ margin: 0 }}>Verified Transaction History</h3>
                            <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>
                                Persisted records retrieved from SQL database for user: {user.email}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/download-documents')}
                            className="btn-secondary"
                            style={{ fontSize: '13px', padding: '6px 14px' }}
                        >
                            Download Statements
                        </button>
                    </div>

                    <div className="payment-history-card" style={{ overflowX: 'auto' }}>
                        <table className="payment-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '12px 14px' }}>Transaction ID</th>
                                    <th style={{ padding: '12px 14px' }}>Date & Time</th>
                                    <th style={{ padding: '12px 14px' }}>Policy Name</th>
                                    <th style={{ padding: '12px 14px' }}>Mode</th>
                                    <th style={{ padding: '12px 14px' }}>Method</th>
                                    <th style={{ padding: '12px 14px' }}>Amount</th>
                                    <th style={{ padding: '12px 14px' }}>GST</th>
                                    <th style={{ padding: '12px 14px' }}>Status</th>
                                    <th style={{ padding: '12px 14px' }}>Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentHistory.length > 0 ? (
                                    paymentHistory.map((row, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px 14px', fontWeight: '600', color: '#1e3a5f' }}>
                                                {row.transactionNo}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontSize: '13px', color: '#475569' }}>
                                                {row.transactionDate ? new Date(row.transactionDate).toLocaleString() : 'N/A'}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontWeight: '500' }}>
                                                {row.policyName}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontSize: '13px' }}>
                                                {row.premiumMode}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontSize: '13px' }}>
                                                {row.paymentMethod}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0f2a4a' }}>
                                                {row.amount}
                                            </td>
                                            <td style={{ padding: '12px 14px', fontSize: '13px', color: '#64748b' }}>
                                                {row.gst || '0.00'}
                                            </td>
                                            <td style={{ padding: '12px 14px' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    backgroundColor: row.status === 'Completed' ? '#ecfdf5' : '#fef2f2',
                                                    color: row.status === 'Completed' ? '#047857' : '#b91c1c'
                                                }}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 14px', fontSize: '13px', color: '#64748b' }}>
                                                {row.branchAgency || 'Online'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ textAlign: 'center', padding: '24px', color: '#94a3b8' }}>
                                            No payment records found. Use the payment gateway above to record a payment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
