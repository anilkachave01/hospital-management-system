import React, { useState } from 'react';
import { authAPI } from '../services/api';
import './Modal.css';

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin, showToast }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        gender: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authAPI.register(formData);
            if (response.data === 'Email already registered') {
                showToast('Email already registered', 'error');
                return;
            }
            onRegister();
        } catch (error) {
            showToast(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Create Account</h2>
                <p className="modal-subtitle">Join us for better healthcare</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter your phone number" required />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
                    </div>
                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                    <p className="modal-footer-text">
                        Already have an account? <a href="#" onClick={onSwitchToLogin}>Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
