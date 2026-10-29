import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // SVG icon helper functions
    const renderIcon = (name) => {
        const svgProps = {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        };

        switch (name) {
            case 'Dashboard':
                return (
                    <svg {...svgProps}>
                        <rect x="3" y="3" width="7" height="9" />
                        <rect x="14" y="3" width="7" height="5" />
                        <rect x="14" y="12" width="7" height="9" />
                        <rect x="3" y="16" width="7" height="5" />
                    </svg>
                );
            case 'Policy Portfolio':
                return (
                    <svg {...svgProps}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                );
            case 'Appointments':
                return (
                    <svg {...svgProps}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                );
            case 'Notifications':
                return (
                    <svg {...svgProps}>
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                );
            case 'Plans & Guidelines':
                return (
                    <svg {...svgProps}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                );
            case 'Download Documents':
                return (
                    <svg {...svgProps}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                );
            case 'Advisor Directory':
                return (
                    <svg {...svgProps}>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Policy Portfolio', path: '/renew-policies' },
        { name: 'Appointments', path: '/appointments' },
        { name: 'Notifications', path: '/notifications' },
        { name: 'Plans & Guidelines', path: '/plan-information' },
        { name: 'Download Documents', path: '/download-documents' },
        { name: 'Advisor Directory', path: '/agent-management' }
    ];

    return (
        <aside className="app-sidebar" style={{
            width: '240px',
            backgroundColor: '#1e3a5f',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 12px',
            flexShrink: 0,
            borderRight: '1px solid #0f2a4a'
        }}>
            <div>
                <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#93c5fd',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    padding: '0 12px 14px'
                }}>
                    Operations Menu
                </div>
                <ul className="menu-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li
                                key={index}
                                onClick={() => navigate(item.path)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: isActive ? '#0ea5e9' : 'transparent',
                                    color: isActive ? '#ffffff' : '#cbd5e1',
                                    fontWeight: isActive ? '700' : '500',
                                    fontSize: '13.5px',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center' }}>{renderIcon(item.name)}</span>
                                <span>{item.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
