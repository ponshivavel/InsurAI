import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import AiAssistant from '../components/AiAssistant';

const AgentManagement = ({ onNavigateTo }) => {
    const [selectedAgent, setSelectedAgent] = useState(null);

    const agents = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Senior Insurance Advisor',
            experience: '8 years',
            specialization: 'Life & Health Insurance',
            rating: 4.9,
            availability: 'Available',
            email: 'sarah.johnson@insurai.com',
            phone: '+1 (555) 123-4567',
            location: 'Downtown Branch',
            image: '👩‍💼'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Property Insurance Specialist',
            experience: '6 years',
            specialization: 'Home & Auto Insurance',
            rating: 4.8,
            availability: 'Available',
            email: 'michael.chen@insurai.com',
            phone: '+1 (555) 234-5678',
            location: 'North Branch',
            image: '👨‍💼'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Claims Specialist',
            experience: '5 years',
            specialization: 'Claims Processing',
            rating: 4.7,
            availability: 'Busy',
            email: 'emily.rodriguez@insurai.com',
            phone: '+1 (555) 345-6789',
            location: 'Main Office',
            image: '👩‍💻'
        }
    ];

    const handleContactAgent = (agent) => {
        setSelectedAgent(agent);
    };

    const handleBookMeeting = (agent) => {
        // Navigate to appointments page with pre-selected agent
        onNavigateTo('appointments');
    };

    return (
        <main className="app-main">
            <div className="main-content">
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                            <h1 style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '8px'
                            }}>
                                Agent Management
                            </h1>
                            <p style={{
                                fontSize: '16px',
                                color: '#6B7280',
                                margin: 0
                            }}>
                                Connect with our expert insurance agents
                            </p>
                        </div>
                        <Button
                            className="btn-secondary"
                            onClick={() => onNavigateTo('dashboard')}
                            style={{ height: '48px', padding: '0 24px' }}
                        >
                            ← Return to Dashboard
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3">
                    {/* Agent Directory */}
                    <div style={{ flex: 2 }}>
                        <Card title="Our Insurance Agents">
                            <div className="agents-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '16px'
                            }}>
                                {agents.map(agent => (
                                    <div key={agent.id} className="agent-card" style={{
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div className="agent-header" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '16px'
                                        }}>
                                            <div className="agent-avatar" style={{
                                                fontSize: '48px',
                                                marginRight: '16px'
                                            }}>
                                                {agent.image}
                                            </div>
                                            <div>
                                                <h3 style={{
                                                    margin: '0 0 4px 0',
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    color: '#1F2937'
                                                }}>
                                                    {agent.name}
                                                </h3>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '14px',
                                                    color: '#6B7280'
                                                }}>
                                                    {agent.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="agent-details" style={{
                                            marginBottom: '16px'
                                        }}>
                                            <div className="detail-row" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    Experience:
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                                    {agent.experience}
                                                </span>
                                            </div>
                                            <div className="detail-row" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    Specialization:
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                                    {agent.specialization}
                                                </span>
                                            </div>
                                            <div className="detail-row" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    Rating:
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                                    ⭐ {agent.rating}/5.0
                                                </span>
                                            </div>
                                            <div className="detail-row" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '8px'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    Location:
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                                                    {agent.location}
                                                </span>
                                            </div>
                                            <div className="detail-row" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                    Status:
                                                </span>
                                                <span style={{
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: agent.availability === 'Available' ? '#10B981' : '#F59E0B'
                                                }}>
                                                    {agent.availability}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="agent-actions" style={{
                                            display: 'flex',
                                            gap: '8px'
                                        }}>
                                            <Button
                                                onClick={() => handleContactAgent(agent)}
                                                className="btn-secondary"
                                                style={{ flex: 1 }}
                                            >
                                                Contact
                                            </Button>
                                            <Button
                                                onClick={() => handleBookMeeting(agent)}
                                                style={{ flex: 1 }}
                                            >
                                                Book Meeting
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div style={{ flex: 1 }}>
                        <Card title="Contact Information">
                            {selectedAgent ? (
                                <div className="contact-details">
                                    <div className="contact-header" style={{
                                        textAlign: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                                            {selectedAgent.image}
                                        </div>
                                        <h3 style={{
                                            margin: '0 0 4px 0',
                                            fontSize: '20px',
                                            fontWeight: '600'
                                        }}>
                                            {selectedAgent.name}
                                        </h3>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#6B7280'
                                        }}>
                                            {selectedAgent.role}
                                        </p>
                                    </div>

                                    <div className="contact-info">
                                        <div className="contact-item" style={{
                                            marginBottom: '16px'
                                        }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#374151',
                                                marginBottom: '4px'
                                            }}>
                                                Email
                                            </label>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#6B7280'
                                            }}>
                                                {selectedAgent.email}
                                            </p>
                                        </div>

                                        <div className="contact-item" style={{
                                            marginBottom: '16px'
                                        }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#374151',
                                                marginBottom: '4px'
                                            }}>
                                                Phone
                                            </label>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#6B7280'
                                            }}>
                                                {selectedAgent.phone}
                                            </p>
                                        </div>

                                        <div className="contact-item" style={{
                                            marginBottom: '16px'
                                        }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#374151',
                                                marginBottom: '4px'
                                            }}>
                                                Location
                                            </label>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#6B7280'
                                            }}>
                                                {selectedAgent.location}
                                            </p>
                                        </div>

                                        <div className="contact-item">
                                            <label style={{
                                                display: 'block',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#374151',
                                                marginBottom: '4px'
                                            }}>
                                                Specialization
                                            </label>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                color: '#6B7280'
                                            }}>
                                                {selectedAgent.specialization}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    color: '#6B7280'
                                }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                                        👥
                                    </div>
                                    <p>Select an agent to view their contact information</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AgentManagement;
