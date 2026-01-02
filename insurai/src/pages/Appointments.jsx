import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Appointments = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        appointmentType: '',
        date: '',
        time: '',
        location: '',
        notes: ''
    });

    const existingAppointments = [
        {
            id: 'APT001',
            type: 'Policy Consultation',
            date: '2024-11-20',
            time: '2:00 PM',
            location: 'Downtown Branch',
            status: 'confirmed'
        },
        {
            id: 'APT002',
            type: 'Claim Review',
            date: '2024-11-25',
            time: '10:00 AM',
            location: 'Main Office',
            status: 'pending'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Scheduling appointment:', formData);
        // Reset form
        setFormData({
            appointmentType: '',
            date: '',
            time: '',
            location: '',
            notes: ''
        });
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
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '8px'
                            }}
                        >
                            Appointments
                        </h1>
                        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                            Schedule and manage your appointments
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Schedule New Appointment */}
                <Card title="Schedule New Appointment">
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Appointment Type</label>
                                <select
                                    className="form-select"
                                    name="appointmentType"
                                    value={formData.appointmentType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select appointment type</option>
                                    <option value="policy-consultation">Policy Consultation</option>
                                    <option value="claim-review">Claim Review</option>
                                    <option value="renewal-assistance">Renewal Assistance</option>
                                    <option value="general-inquiry">General Inquiry</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Time</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <select
                                    className="form-select"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select location</option>
                                    <option value="downtown-branch">Downtown Branch</option>
                                    <option value="main-office">Main Office</option>
                                    <option value="north-branch">North Branch</option>
                                    <option value="south-branch">South Branch</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Notes (Optional)</label>
                            <textarea
                                className="form-textarea"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Any additional information..."
                                style={{ width: '100%', minHeight: '80px' }}
                            />
                        </div>

                        <Button type="submit" className="btn-full-width">
                            Schedule Appointment
                        </Button>
                    </form>
                </Card>

                {/* Existing Appointments */}
                <Card title="Your Appointments">
                    <div className="appointments-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {existingAppointments.map(appointment => (
                            <div key={appointment.id} className="appointment-item" style={{
                                padding: '16px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                backgroundColor: 'white'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                                        {appointment.type}
                                    </h4>
                                    <span className={`status-${appointment.status}`} style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        textTransform: 'capitalize',
                                        backgroundColor: appointment.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7',
                                        color: appointment.status === 'confirmed' ? '#065F46' : '#92400E'
                                    }}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="appointment-details" style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <span>📅</span>
                                        <span>{appointment.date} at {appointment.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>📍</span>
                                        <span>{appointment.location}</span>
                                    </div>
                                </div>

                                <div className="appointment-actions" style={{ display: 'flex', gap: '8px' }}>
                                    <Button className="btn-secondary" style={{ flex: 1, height: '36px', fontSize: '14px' }}>
                                        Reschedule
                                    </Button>
                                    <Button className="btn-warning" style={{ flex: 1, height: '36px', fontSize: '14px' }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Appointments;
