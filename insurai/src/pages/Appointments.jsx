import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const Appointments = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{"email":"admin@admin.com"}');

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        appointmentType: 'Policy Consultation',
        date: '',
        time: '',
        location: 'Main Corporate Branch',
        notes: ''
    });

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/appointments/user/${encodeURIComponent(user.email)}`);
            setAppointments(response.data || []);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setErrorMessage('Failed to load appointments from server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, date: today, time: '10:00' }));
        fetchAppointments();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage('');

        if (!formData.date || !formData.time) {
            setErrorMessage('Please specify date and time');
            return;
        }

        const dateTimeStr = `${formData.date}T${formData.time}:00`;

        setSubmitting(true);
        try {
            const payload = {
                email: user.email,
                type: formData.appointmentType,
                dateTime: dateTimeStr,
                notes: `[Location: ${formData.location}] ${formData.notes || ''}`.trim(),
                status: 'Confirmed'
            };

            await api.post('/appointments', payload);
            setMessage('Appointment successfully scheduled and persisted.');
            setFormData(prev => ({ ...prev, notes: '' }));
            await fetchAppointments();
        } catch (err) {
            console.error('Failed to book appointment:', err);
            setErrorMessage('Failed to schedule appointment. Please check input.');
        } finally {
            setSubmitting(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            await api.delete(`/appointments/${id}`);
            setMessage('Appointment cancelled.');
            fetchAppointments();
        } catch (err) {
            console.error('Error deleting appointment:', err);
            setErrorMessage('Could not cancel appointment.');
        }
    };

    return (
        <div className="main-content" style={{ overflowY: 'auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Appointment Management
                    </h1>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        Book and manage consultations with your InsurAI insurance advisors
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
                <div style={{ backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
                    {message}
                </div>
            )}
            {errorMessage && (
                <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
                    {errorMessage}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
                {/* Schedule Form */}
                <Card title="Schedule New Consultation">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Appointment Type</label>
                            <select
                                className="form-select"
                                name="appointmentType"
                                value={formData.appointmentType}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                                <option value="Policy Consultation">Policy Consultation & Advisory</option>
                                <option value="Claim Review">Claim Review & Diagnostic Assessment</option>
                                <option value="Renewal Assistance">Annual Policy Renewal Assistance</option>
                                <option value="Commercial Risk Audit">Enterprise Risk Assessment Audit</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Time</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Location / Format</label>
                            <select
                                className="form-select"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                                <option value="Virtual Video Conference">Virtual Video Conference (Secure Zoom)</option>
                                <option value="Main Corporate Branch">Main Corporate Headquarters</option>
                                <option value="Financial District Center">Financial District Client Suite</option>
                                <option value="On-site Enterprise Office">On-site Enterprise Office Visit</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: '600', fontSize: '13px', color: '#334155' }}>Additional Notes / Agenda</label>
                            <textarea
                                className="form-textarea"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Describe policies to review or topics for the advisor..."
                                style={{ width: '100%', padding: '10px', minHeight: '80px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                            />
                        </div>

                        <Button type="submit" disabled={submitting} className="btn-full-width" style={{ padding: '12px', fontWeight: '700' }}>
                            {submitting ? 'Confirming with Calendar...' : 'Schedule Appointment'}
                        </Button>
                    </form>
                </Card>

                {/* Existing Appointments List */}
                <Card title="Your Confirmed Appointments">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>Loading appointments from database...</div>
                    ) : appointments.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                            No upcoming appointments found. Use the form to book your first consultation.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '480px', overflowY: 'auto' }}>
                            {appointments.map(apt => (
                                <div key={apt.id} style={{
                                    padding: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f2a4a' }}>
                                            {apt.type}
                                        </h4>
                                        <span style={{
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            backgroundColor: apt.status === 'Confirmed' ? '#ecfdf5' : '#fffbeb',
                                            color: apt.status === 'Confirmed' ? '#047857' : '#b45309'
                                        }}>
                                            {apt.status}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                                        <div><strong>Date & Time:</strong> {apt.dateTime ? new Date(apt.dateTime).toLocaleString() : 'N/A'}</div>
                                        {apt.notes && <div><strong>Details:</strong> {apt.notes}</div>}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <button
                                            onClick={() => handleCancel(apt.id)}
                                            style={{
                                                padding: '6px 12px',
                                                border: '1px solid #fecaca',
                                                backgroundColor: '#fef2f2',
                                                color: '#b91c1c',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Appointments;
