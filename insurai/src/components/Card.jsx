import React from 'react';

const Card = ({ children, fullWidth = false }) => {
    const cardClass = fullWidth ? 'card card-full-width' : 'card';
    return (
        <div className={cardClass}>
            {children}
        </div>
    );
};

export default Card;
