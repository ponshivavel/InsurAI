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
    const isSecondary = className.includes('btn-secondary');
    const isWarning = className.includes('btn-warning');

    const baseStyles = {
        padding: '10px 20px',
        border: isSecondary ? '1px solid #cbd5e1' : 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: '38px',
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: isSecondary ? '#ffffff' : isWarning ? '#f59e0b' : '#0f2a4a',
        color: isSecondary ? '#334155' : '#ffffff',
        boxShadow: isSecondary ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
        ...style
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={baseStyles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
