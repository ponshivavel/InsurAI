import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const RenewPolicies = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{"email":"admin@admin.com"}');

    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [renewingId, setRenewingId] = useState(null);
    const [message, setMessage] = useState('');

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/policies/user/${encodeURIComponent(user.email)}`);
            setPolicies(response.data || []);
        } catch (err) {
            console.error('Error fetching policies:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, []);

    const handleRenew = async (policy) => {
        setRenewingId(policy.id);
        setMessage('');
        try {
            // Update policy renewal date by 1 year
            const currentRenewal = policy.renewalDate ? new Date(policy.renewalDate) : new Date();
            currentRenewal.setFullYear(currentRenewal.getFullYear() + 1);
            const newRenewalDate = currentRenewal.toISOString().split('T')[0];

            const updatedPolicy = {
                ...policy,
                renewalDate: newRenewalDate,
                status: 'Active'
            };

            await api.put(`/policies/${policy.id}`, updatedPolicy);

            // Create renewal transaction record
            await api.post('/transactions', {
                email: user.email,
                policyName: policy.name,
                amount: policy.premium || 150.00,
                lateFee: 0.00,
                gst: 13.50,
                premiumMode: 'Annual Renewal',
                paymentMethod: 'Auto Debit Mandate',
                status: 'Completed',
                branchAgency: 'Renewal-Center'
            });

            // Post notification
            await api.post('/notifications', {
                email: user.email,
                title: 'Policy Renewed Successfully',
                message: `Your policy ${policy.name} (${policy.policyNumber}) has been renewed through ${newRenewalDate}.`,
                type: 'Policy'
            });

            setMessage(`Policy ${policy.policyNumber} renewed successfully until ${newRenewalDate}.`);
            await fetchPolicies();
        } catch (err) {
            console.error('Renewal failed:', err);
            setMessage('Renewal failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setRenewingId(null);
            setTimeout(() => setMessage(''), 6000);
        }
    };

    return (
        <div className="main-content" style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Policy Portfolio & Renewal Center
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Manage corporate policy terms, coverage tiers, and extend coverage directly in the database
                    </p>
                </div>

                <Button
                    className="btn-secondary"
                    onClick={() => navigate('/dashboard')}
                    style={{ height: '42px', padding: '0 18px', whiteSpace: 'nowrap' }}
                >
                    Back to Dashboard
                </Button>
            </div>

            {message && (
                <div style={{
                    backgroundColor: message.includes('failed') ? '#fef2f2' : '#ecfdf5',
                    color: message.includes('failed') ? '#b91c1c' : '#047857',
                    border: '1px solid ' + (message.includes('failed') ? '#fecaca' : '#a7f3d0'),
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontWeight: '600'
                }}>
                    {message}
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    Loading policies from database...
                </div>
            ) : policies.length === 0 ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: '32px' }}>
                        <h3>No policies assigned to {user.email}</h3>
                        <p style={{ color: '#64748b' }}>Explore our plans catalog to enroll in your first policy.</p>
                        <Button onClick={() => navigate('/plan-information')}>View Available Plans</Button>
                    </div>
                </Card>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                    {policies.map(p => (
                        <Card key={p.id}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '3px 8px', borderRadius: '4px' }}>
                                            {p.type}
                                        </span>
                                        <h3 style={{ margin: '8px 0 0', fontSize: '17px', fontWeight: '700', color: '#0f2a4a' }}>
                                            {p.name}
                                        </h3>
                                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{p.policyNumber}</span>
                                    </div>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        backgroundColor: p.status === 'Active' ? '#ecfdf5' : '#fef2f2',
                                        color: p.status === 'Active' ? '#047857' : '#b91c1c'
                                    }}>
                                        {p.status}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
                                    <div>
                                        <span style={{ color: '#64748b', fontSize: '12px' }}>Coverage Sum:</span>
                                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{Number(p.coverage).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <span style={{ color: '#64748b', fontSize: '12px' }}>Monthly Premium:</span>
                                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{p.premium}</div>
                                    </div>
                                    <div>
                                        <span style={{ color: '#64748b', fontSize: '12px' }}>Start Date:</span>
                                        <div style={{ color: '#334155' }}>{p.startDate}</div>
                                    </div>
                                    <div>
                                        <span style={{ color: '#64748b', fontSize: '12px' }}>Renewal Due:</span>
                                        <div style={{ fontWeight: '600', color: '#d97706' }}>{p.renewalDate}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                                    <button
                                        disabled={renewingId === p.id}
                                        onClick={() => handleRenew(p)}
                                        className="btn-primary"
                                        style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '600' }}
                                    >
                                        {renewingId === p.id ? 'Processing Renewal...' : 'Renew Coverage (1 Year)'}
                                    </button>
                                    <button
                                        onClick={() => navigate('/download-documents')}
                                        className="btn-secondary"
                                        style={{ padding: '10px 14px', fontSize: '13px' }}
                                    >
                                        Schedule PDF
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RenewPolicies;
