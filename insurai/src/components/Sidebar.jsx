import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Plan Information', path: '/plan-information', icon: '📋' },
        { name: 'Appointments', path: '/appointments', icon: '📅' },
        { name: 'Notifications', path: '/notifications', icon: '🔔' },
        { name: 'Agent Management', path: '/agent-management', icon: '👥' },
        { name: 'Download Documents', path: '/download-documents', icon: '📄' },
        { name: 'Renew Policies', path: '/renew-policies', icon: '🔄' }
    ];

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <aside className="app-sidebar">
            <h2 className="sidebar-title">Policy Management</h2>
            <ul className="menu-list">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="menu-item"
                        onClick={() => handleMenuClick(item.path)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="menu-icon">{item.icon}</span>
                        <span className="menu-text">{item.name}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
