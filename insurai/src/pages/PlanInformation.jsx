import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const PlanInformation = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'car',
      icon: '🚗',
      title: 'Car Insurance',
      description:
        'Comprehensive coverage for your vehicle including accident, theft, and natural disaster protection.',
      features: [
        'Accident Coverage',
        'Theft Protection',
        'Natural Disaster Coverage',
        '24/7 Roadside Assistance'
      ],
      price: '$150/month'
    },
    {
      id: 'health',
      icon: '🏥',
      title: 'Health Insurance',
      description:
        'Complete medical coverage for you and your family with access to premium healthcare facilities.',
      features: [
        'Hospital Coverage',
        'Doctor Consultations',
        'Prescription Drugs',
        'Emergency Care'
      ],
      price: '$200/month'
    },
    {
      id: 'life',
      icon: '💝',
      title: 'Life Insurance',
      description:
        "Secure your family's future with comprehensive life insurance coverage and investment options.",
      features: [
        'Death Benefit',
        'Investment Options',
        'Critical Illness Coverage',
        'Disability Income'
      ],
      price: '$100/month'
    },
    {
      id: 'home',
      icon: '🏠',
      title: 'Home Insurance',
      description:
        'Protect your home and belongings from fire, flood, theft, and other unforeseen events.',
      features: [
        'Property Damage',
        'Personal Belongings',
        'Liability Coverage',
        'Additional Living Expenses'
      ],
      price: '$120/month'
    },
    {
      id: 'travel',
      icon: '✈️',
      title: 'Travel Insurance',
      description:
        "Travel with peace of mind knowing you're covered for trip cancellations, medical emergencies, and more.",
      features: [
        'Trip Cancellation',
        'Medical Emergency',
        'Lost Luggage',
        'Travel Delay Coverage'
      ],
      price: '$50/month'
    },
    {
      id: 'business',
      icon: '🏢',
      title: 'Business Insurance',
      description:
        'Comprehensive business protection including property, liability, and employee coverage.',
      features: [
        'Property Insurance',
        'Business Interruption',
        'Liability Coverage',
        'Employee Benefits'
      ],
      price: '$300/month'
    }
  ];

  return (
    <div className="main-content">
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
                fontSize: '28px',
                fontWeight: '700',
                color: '#1A1A1A',
                marginBottom: '8px'
              }}
            >
              Insurance Plans
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
              Choose the perfect insurance plan for your needs
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

      {/* PLANS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '12px',
          paddingBottom: '20px'
        }}
      >
        {plans.map(plan => (
          <Card key={plan.id} className="plan-card">
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                {plan.icon}
              </div>

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}
              >
                {plan.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '16px'
                }}
              >
                {plan.description}
              </p>

              <div
                style={{
                  backgroundColor: '#F9FAFB',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px'
                }}
              >
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>
                  Key Features
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        marginBottom: '6px'
                      }}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#244E6E',
                  marginBottom: '16px'
                }}
              >
                {plan.price}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button style={{ height: '40px' }}>View Details</Button>
                <Button className="btn-secondary" style={{ height: '40px' }}>
                  Renew
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanInformation;
