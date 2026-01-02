import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Notifications = () => {
  const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            type: 'policy',
            title: 'Policy Renewal Reminder',
            message: 'Your Health Insurance policy expires in 30 days. Renew now to avoid coverage gaps.',
            date: '2024-11-15',
            time: '09:00 AM',
            read: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Successful',
            message: 'Your premium payment of $150 for Car Insurance has been processed successfully.',
            date: '2024-11-14',
            time: '02:30 PM',
            read: true,
            priority: 'normal'
        },
        {
            id: 3,
            type: 'claim',
            title: 'Claim Status Update',
            message: 'Your claim CLM001 has been approved. Payment will be processed within 3-5 business days.',
            date: '2024-11-13',
            time: '11:15 AM',
            read: true,
            priority: 'high'
        },
        {
            id: 4,
            type: 'appointment',
            title: 'Appointment Confirmation',
            message: 'Your appointment with Sarah Johnson is confirmed for November 20th at 2:00 PM.',
            date: '2024-11-12',
            time: '04:45 PM',
            read: true,
            priority: 'normal'
        },
        {
            id: 5,
            type: 'policy',
            title: 'New Coverage Available',
            message: 'We now offer enhanced COVID-19 coverage. Contact your agent to learn more.',
            date: '2024-11-10',
            time: '10:00 AM',
            read: false,
            priority: 'normal'
        }
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'policy': return '📋';
            case 'payment': return '💳';
            case 'claim': return '📄';
            case 'appointment': return '📅';
            default: return '🔔';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#EF4444';
            case 'normal': return '#F59E0B';
            default: return '#6B7280';
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
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#1A1A1A',
                                marginBottom: '8px'
                            }}
                        >
                            Notifications
                        </h1>
                        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                            Stay updated with your policy notifications
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

            <Card title="Recent Notifications">
                <div className="notifications-list">
                    {notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                padding: '20px',
                                borderBottom: '1px solid #E5E7EB',
                                backgroundColor: !notification.read ? '#F9FAFB' : 'white',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            <div
                                className="notification-icon"
                                style={{
                                    fontSize: '24px',
                                    flexShrink: 0
                                }}
                            >
                                {getNotificationIcon(notification.type)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div className="notification-header" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '8px'
                                }}>
                                    <h4 style={{
                                        margin: 0,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#1A1A1A'
                                    }}>
                                        {notification.title}
                                    </h4>

                                    {!notification.read && (
                                        <span
                                            className="unread-indicator"
                                            style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: '#244E6E',
                                                flexShrink: 0
                                            }}
                                        />
                                    )}

                                    <span
                                        className="priority-indicator"
                                        style={{
                                            fontSize: '12px',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            backgroundColor: getPriorityColor(notification.priority),
                                            color: 'white',
                                            fontWeight: '500',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {notification.priority}
                                    </span>
                                </div>

                                <p style={{
                                    margin: '0 0 12px 0',
                                    color: '#6B7280',
                                    lineHeight: '1.5'
                                }}>
                                    {notification.message}
                                </p>

                                <div className="notification-meta" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    fontSize: '14px',
                                    color: '#9CA3AF'
                                }}>
                                    <span>📅 {notification.date}</span>
                                    <span>🕐 {notification.time}</span>
                                    <span style={{
                                        textTransform: 'capitalize',
                                        color: getPriorityColor(notification.type === 'policy' ? 'high' : 'normal')
                                    }}>
                                        {notification.type}
                                    </span>
                                </div>
                            </div>

                            <div className="notification-actions" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                {!notification.read && (
                                    <button
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#244E6E',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Mark Read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Notifications;
