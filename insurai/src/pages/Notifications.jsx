import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const Notifications = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{"email":"admin@admin.com"}');

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/notifications/user/${encodeURIComponent(user.email)}`);
            setNotifications(response.data || []);
        } catch (err) {
            console.error('Failed to load notifications:', err);
            setError('Could not load notifications from server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error('Error deleting notification:', err);
        }
    };

    const renderTypeBadge = (type) => {
        return (
            <span style={{
                backgroundColor: '#e2e8f0',
                color: '#334155',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
            }}>
                {type || 'Alert'}
            </span>
        );
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
            {/* Header */}
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        Notifications & Alerts
                    </h1>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                        Policy updates, transaction alerts, and renewal notices stored in database
                    </p>
                </div>

                <Button
                    className="btn-secondary"
                    onClick={() => navigate('/dashboard')}
                    style={{ height: '38px', padding: '0 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
                >
                    Back to Dashboard
                </Button>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
                    {error}
                </div>
            )}

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 className="card-title" style={{ margin: 0 }}>Recent Activity</h3>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                        {notifications.filter(n => !n.isRead).length} Unread
                    </span>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                        Loading notifications...
                    </div>
                ) : notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                        No notifications currently in your feed.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px 20px',
                                    borderRadius: '10px',
                                    border: '1px solid ' + (notif.isRead ? '#e2e8f0' : '#bae6fd'),
                                    backgroundColor: notif.isRead ? '#ffffff' : '#f0f9ff',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: 0, marginRight: '16px' }}>
                                    {renderTypeBadge(notif.type)}
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f2a4a' }}>
                                                {notif.title}
                                            </h4>
                                            {!notif.isRead && (
                                                <span style={{ backgroundColor: '#0284c7', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ margin: '4px 0 2px', fontSize: '13px', color: '#334155', lineHeight: '1.4' }}>
                                            {notif.message}
                                        </p>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                            {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Just now'} &bull; {notif.type}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                                    {!notif.isRead && (
                                        <button
                                            onClick={() => handleMarkAsRead(notif.id)}
                                            style={{
                                                padding: '7px 14px',
                                                border: '1px solid #0284c7',
                                                backgroundColor: '#ffffff',
                                                color: '#0284c7',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                                transition: 'all 0.15s ease'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; e.currentTarget.style.color = '#ffffff'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#0284c7'; }}
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notif.id)}
                                        style={{
                                            padding: '7px 14px',
                                            border: '1px solid #fecaca',
                                            backgroundColor: '#fef2f2',
                                            color: '#dc2626',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.15s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; e.currentTarget.style.color = '#ffffff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Notifications;
