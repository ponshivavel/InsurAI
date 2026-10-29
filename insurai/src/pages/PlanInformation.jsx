import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const PlanInformation = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [guidelines, setGuidelines] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [plansRes, guidelinesRes] = await Promise.all([
                api.get('/plans'),
                api.get('/guidelines')
            ]);
            setPlans(plansRes.data || []);
            setGuidelines(guidelinesRes.data || []);
        } catch (err) {
            console.error('Error fetching plans/guidelines:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPlans = selectedCategory === 'ALL'
        ? plans
        : plans.filter(p => p.category?.toUpperCase() === selectedCategory);

    return (
        <div className="main-content" style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Policy Plans & Regulatory Guidelines
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Transparent commercial policy structures and compliance guidelines loaded from SQL database
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

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['ALL', 'HEALTH', 'AUTO', 'BUSINESS'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid ' + (selectedCategory === cat ? '#0f2a4a' : '#cbd5e1'),
                            backgroundColor: selectedCategory === cat ? '#0f2a4a' : '#ffffff',
                            color: selectedCategory === cat ? '#ffffff' : '#475569',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Plans Section */}
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f2a4a', marginBottom: '16px' }}>
                Available Enterprise Policy Plans
            </h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>Loading plans catalog...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '36px' }}>
                    {filteredPlans.map(plan => (
                        <Card key={plan.id}>
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                        <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                                            {plan.category}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{plan.planCode}</span>
                                    </div>

                                    <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#0f2a4a' }}>
                                        {plan.name}
                                    </h3>

                                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '14px' }}>
                                        {plan.description}
                                    </p>

                                    <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '14px', fontSize: '12px', color: '#334155' }}>
                                        <div><strong>Coverage Range:</strong> {plan.minCoverage?.toLocaleString()} - {plan.maxCoverage?.toLocaleString()}</div>
                                        <div style={{ marginTop: '4px' }}><strong>Base Monthly Premium:</strong> {plan.baseMonthlyPremium}</div>
                                        <div style={{ marginTop: '4px' }}><strong>Eligibility:</strong> {plan.eligibility}</div>
                                    </div>

                                    <div style={{ fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                                        <strong>Key Benefits:</strong> {plan.keyFeatures}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => navigate('/appointments')}
                                        className="btn-primary"
                                        style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '600' }}
                                    >
                                        Inquire / Enroll
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Regulatory Guidelines Section */}
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f2a4a', marginBottom: '16px' }}>
                Operational & Regulatory Guidelines
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {guidelines.map(g => (
                    <Card key={g.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f2a4a' }}>
                                {g.title}
                            </h4>
                            <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                                {g.category}
                            </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: '0 0 10px' }}>
                            {g.summary}
                        </p>
                        <div style={{ fontSize: '12px', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '8px 12px', borderRadius: '6px' }}>
                            <strong>Compliance Standard:</strong> {g.complianceNotes}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PlanInformation;
