import React, { useState } from 'react';
import { authAPI } from '../services/api';
import './Modal.css';

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister, showToast }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            // Handle both formats: direct user object or nested with token
            const user = response.data.patient || response.data;
            const token = response.data.token || 'temp-token'; // Fallback if backend doesn't return token yet

            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            onLogin(user);
        } catch (error) {
            showToast(error.response?.data?.message || 'Login failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Welcome Back</h2>
                <p className="modal-subtitle">Login to manage your appointments</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="modal-footer-text">
                        Don't have an account? <a href="#" onClick={onSwitchToRegister}>Register here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
