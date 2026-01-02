import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles.css';

const PlanInformationManagement = ({ onNavigateToDashboard }) => {
    const plans = [
        {
            title: '🚗 Car Insurance',
            description: 'Comprehensive coverage for your vehicle including accident, theft, and damage protection.',
            features: ['Accident Coverage', 'Theft Protection', 'Third Party Liability', '24/7 Roadside Assistance'],
            price: '$150/month'
        },
        {
            title: '🏥 Health Insurance',
            description: 'Complete medical coverage for you and your family with hospitalization and outpatient benefits.',
            features: ['Hospitalization Coverage', 'Outpatient Care', 'Dental & Vision', 'Maternity Benefits'],
            price: '$200/month'
        },
        {
            title: '💝 Life Insurance',
            description: 'Secure your family\'s future with comprehensive life insurance coverage.',
            features: ['Death Benefit', 'Critical Illness Coverage', 'Accidental Death', 'Term Life Options'],
            price: '$100/month'
        },
        {
            title: '🏠 Home Insurance',
            description: 'Protect your home and belongings from damage, theft, and natural disasters.',
            features: ['Property Damage', 'Personal Belongings', 'Liability Coverage', 'Natural Disaster Protection'],
            price: '$120/month'
        },
        {
            title: '✈️ Travel Insurance',
            description: 'Travel with peace of mind with comprehensive coverage for trips worldwide.',
            features: ['Trip Cancellation', 'Medical Emergency', 'Lost Luggage', 'Travel Delay Coverage'],
            price: '$50/month'
        },
        {
            title: '🏢 Business Insurance',
            description: 'Protect your business assets, operations, and liability with comprehensive coverage.',
            features: ['Property Insurance', 'Business Interruption', 'Liability Coverage', 'Employee Protection'],
            price: '$300/month'
        }
    ];

    return (
        <div>
            <Header />
            <Sidebar onNavigateTo={onNavigateTo} />
            <div className="plan-page">
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#234f73' }}>
                    Insurance Plan Information
                </h2>

                {plans.map((plan, index) => (
                    <div key={index} className="plan-card">
                        <h3 style={{ color: '#234f73', marginBottom: '15px' }}>{plan.title}</h3>
                        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{plan.description}</p>

                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: '#234f73', marginBottom: '10px' }}>Key Features:</h4>
                            <ul style={{ paddingLeft: '20px' }}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} style={{ marginBottom: '5px' }}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e8b57' }}>
                                {plan.price}
                            </span>
                            <div className="plan-actions">
                                <button
                                    style={{ background: '#3a97d4' }}
                                    onClick={() => onNavigateTo('insurance-selection')}
                                >
                                    Get Quote
                                </button>
                                <button
                                    style={{ background: '#28a745' }}
                                    onClick={() => onNavigateTo('insurance-selection')}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                        onClick={() => { console.log('Back to dashboard clicked'); onNavigateToDashboard(); }}
                        style={{
                            padding: '12px 24px',
                            background: '#234f73',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanInformationManagement;
