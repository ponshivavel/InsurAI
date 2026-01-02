import React from 'react';

const Button = ({
    children,
    onClick,
    type = 'button',
    className = '',
    disabled = false,
    style = {},
    fullWidth = false,
    ...props
}) => {
    const baseStyles = {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: '48px',
        width: fullWidth ? '100%' : 'auto',
        ...style
    };

    const getButtonStyles = () => {
        if (className.includes('btn-secondary')) {
            return {
                ...baseStyles,
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: '1px solid #D1D5DB',
            };
        } else if (className.includes('btn-warning')) {
            return {
                ...baseStyles,
                backgroundColor: '#F59E0B',
                color: 'white',
            };
        } else {
            return {
                ...baseStyles,
                backgroundColor: '#244E6E',
                color: 'white',
            };
        }
    };

    const buttonStyles = getButtonStyles();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={buttonStyles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
