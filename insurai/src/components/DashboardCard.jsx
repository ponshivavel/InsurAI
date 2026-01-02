import React from 'react';

const DashboardCard = ({ children, fullWidth = false }) => {
    return (
        <div className={`card ${fullWidth ? 'card-full-width' : ''}`}>
            {children}
        </div>
    );
};

export default DashboardCard;
