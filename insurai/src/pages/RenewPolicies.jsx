import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const RenewPolicies = () => {
  const navigate = useNavigate();

    const policies = [
        {
            id: 'POL001',
            type: 'Health Insurance',
            expiryDate: '2024-12-31',
            premium: '$150/month',
            status: 'active',
            coverage: '$100,000'
        },
        {
            id: 'POL002',
            type: 'Car Insurance',
            expiryDate: '2024-11-15',
            premium: '$200/month',
            status: 'expiring',
            coverage: '$50,000'
        },
        {
            id: 'POL003',
            type: 'Life Insurance',
            expiryDate: '2025-01-15',
            premium: '$100/month',
            status: 'active',
            coverage: '$200,000'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#10B981';
            case 'expiring': return '#F59E0B';
            case 'expired': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'Active';
            case 'expiring': return 'Expiring Soon';
            case 'expired': return 'Expired';
            default: return 'Unknown';
        }
    };

    return (
        <div className="main-content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
            {/* PAGE HEADER */}
            <div style={{ marginBottom: '24px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}
                >
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h1
                            style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '8px'
                            }}
                        >
                            Policy Renewal Center
                        </h1>
                        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                            Keep your coverage active by renewing your policies on time
                        </p>
                    </div>

                    <Button
                        className="btn-secondary"
                        onClick={() => navigate('/')}
                        style={{ height: '48px', padding: '0 20px', whiteSpace: 'nowrap' }}
                    >
                        ← Return to Dashboard
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {policies.map(policy => (
                    <Card key={policy.id} title={`${policy.type} - ${policy.id}`}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                                        Expiry Date
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {policy.expiryDate}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                                        Premium
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {policy.premium}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                                        Coverage
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>
                                        {policy.coverage}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
                                        Status
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: getStatusColor(policy.status),
                                        textTransform: 'capitalize'
                                    }}>
                                        {getStatusText(policy.status)}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <Button
                                    style={{ flex: 1, height: '48px', fontSize: '16px' }}
                                    onClick={() => console.log(`Renewing policy ${policy.id}`)}
                                >
                                    Renew Now
                                </Button>
                                <Button
                                    className="btn-secondary"
                                    style={{ flex: 1, height: '48px', fontSize: '16px' }}
                                    onClick={() => navigate('/plan-information')}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card style={{ marginTop: '32px' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1A1A1A',
                        marginBottom: '12px'
                    }}>
                        Need Help with Renewal?
                    </h3>
                    <p style={{
                        color: '#6B7280',
                        marginBottom: '20px',
                        lineHeight: '1.5'
                    }}>
                        Our insurance experts are here to help you with policy renewals, coverage updates, and any questions you may have.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Button onClick={() => navigate('/appointments')}>
                            Schedule Consultation
                        </Button>
                        <Button
                            className="btn-secondary"
                            onClick={() => navigate('/agent-management')}
                        >
                            Contact Agent
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RenewPolicies;
