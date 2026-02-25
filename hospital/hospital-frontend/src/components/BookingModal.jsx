import React, { useState } from 'react';
import { appointmentsAPI } from '../services/api';
import './Modal.css';

const BookingModal = ({ isOpen, onClose, doctor, patient, onSuccess, showToast }) => {
    const [formData, setFormData] = useState({
        appointmentDate: '',
        timeSlot: '',
        visitReason: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const appointmentData = {
                doctor: { id: doctor.id },
                patient: { id: patient.id },
                appointmentDate: new Date(formData.appointmentDate),
                timeSlot: formData.timeSlot,
                consultationFee: doctor.consultationFee,
                feesPaid: false,
                status: 'Pending'
            };

            await appointmentsAPI.book(appointmentData);
            onSuccess();
            setFormData({ appointmentDate: '', timeSlot: '', visitReason: '' });
        } catch (error) {
            showToast(error.response?.data?.message || 'Booking failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !doctor) return null;

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Book Appointment</h2>
                <p className="modal-subtitle">Schedule your consultation</p>

                <div className="doctor-details-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>
                            <i className="fas fa-user-md"></i>
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>{doctor.name}</h3>
                            <p style={{ color: 'var(--primary-color)', margin: 0, fontWeight: 600 }}>{doctor.specialization}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)' }}>
                        <div>
                            <p style={{ margin: 0, color: 'var(--gray-600)', fontSize: '0.875rem' }}>Experience</p>
                            <p style={{ margin: 0, fontWeight: 600 }}>{doctor.experience} years</p>
                        </div>
                        <div>
                            <p style={{ margin: 0, color: 'var(--gray-600)', fontSize: '0.875rem' }}>Consultation Fee</p>
                            <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary-color)' }}>${doctor.consultationFee}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select Date</label>
                        <input
                            type="date"
                            value={formData.appointmentDate}
                            min={today}
                            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Select Time Slot</label>
                        <select
                            value={formData.timeSlot}
                            onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                            required
                        >
                            <option value="">Choose a time slot</option>
                            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                            <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                            <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Reason for Visit (Optional)</label>
                        <textarea
                            value={formData.visitReason}
                            onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                            rows="3"
                            placeholder="Describe your symptoms or reason for visit"
                        />
                    </div>
                    <button type="submit" className="btn-primary btn-block" disabled={loading}>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
