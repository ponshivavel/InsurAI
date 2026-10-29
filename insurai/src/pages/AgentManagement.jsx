import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const AgentManagement = () => {
    const navigate = useNavigate();
    const [selectedAgent, setSelectedAgent] = useState(null);

    const agents = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Senior Corporate Insurance Advisor',
            experience: '8 years',
            specialization: 'Corporate Health & Executive Benefits',
            rating: 4.9,
            availability: 'Available',
            email: 'sarah.johnson@insurai.com',
            phone: '+1 (555) 123-4567',
            location: 'Downtown Headquarters'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Property & Fleet Insurance Specialist',
            experience: '6 years',
            specialization: 'Commercial Auto & Property Risk',
            rating: 4.8,
            availability: 'Available',
            email: 'michael.chen@insurai.com',
            phone: '+1 (555) 234-5678',
            location: 'Financial District Branch'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Senior Claims Settlement Officer',
            experience: '5 years',
            specialization: 'Claims Adjudication & Compliance',
            rating: 4.7,
            availability: 'In Consultation',
            email: 'emily.rodriguez@insurai.com',
            phone: '+1 (555) 345-6789',
            location: 'National Claims Center'
        }
    ];

    return (
        <div className="main-content" style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Advisor Directory & Support
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Connect with certified underwriting advisors and dedicated claims specialists
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {agents.map(agent => (
                    <Card key={agent.id}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f2a4a' }}>
                                        {agent.name}
                                    </h3>
                                    <div style={{ fontSize: '13px', color: '#0284c7', fontWeight: '600', marginTop: '2px' }}>
                                        {agent.role}
                                    </div>
                                </div>
                                <span style={{
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    backgroundColor: agent.availability === 'Available' ? '#ecfdf5' : '#fffbeb',
                                    color: agent.availability === 'Available' ? '#047857' : '#b45309'
                                }}>
                                    {agent.availability}
                                </span>
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div><strong style={{ color: '#475569' }}>Specialization:</strong> {agent.specialization}</div>
                                <div><strong style={{ color: '#475569' }}>Experience:</strong> {agent.experience}</div>
                                <div><strong style={{ color: '#475569' }}>Location:</strong> {agent.location}</div>
                                <div><strong style={{ color: '#475569' }}>Rating:</strong> {agent.rating} / 5.0</div>
                                <div><strong style={{ color: '#475569' }}>Email:</strong> {agent.email}</div>
                                <div><strong style={{ color: '#475569' }}>Phone:</strong> {agent.phone}</div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                                <button
                                    onClick={() => navigate('/appointments')}
                                    className="btn-primary"
                                    style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '600' }}
                                >
                                    Book Meeting
                                </button>
                                <button
                                    onClick={() => alert(`Direct email consultation opened for ${agent.email}`)}
                                    className="btn-secondary"
                                    style={{ padding: '10px 14px', fontSize: '13px' }}
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AgentManagement;
