import React from 'react';
import './Toast.css';

const Toast = ({ show, message, type }) => {
    if (!show) return null;

    const icon = type === 'success' ? 'check-circle' :
        type === 'error' ? 'exclamation-circle' :
            'info-circle';

    const color = type === 'success' ? 'var(--success)' :
        type === 'error' ? 'var(--error)' :
            'var(--info)';

    return (
        <div className={`toast ${type}`}>
            <i className={`fas fa-${icon}`} style={{ fontSize: '1.5rem', color }}></i>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
