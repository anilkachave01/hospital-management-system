import React, { useState, useEffect } from 'react';
import { appointmentsAPI, getMockDoctors } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, showToast, onBookDoctor }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [appointments, setAppointments] = useState([]);
    const [doctors] = useState(getMockDoctors());

    useEffect(() => {
        if (user) {
            loadAppointments();
        }
    }, [user]);

    const loadAppointments = async () => {
        try {
            const response = await appointmentsAPI.getPatientAppointments(user.id);
            setAppointments(response.data);
        } catch (error) {
            // Fallback or empty if error
            setAppointments([]);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            await appointmentsAPI.cancel(appointmentId);
            showToast('Appointment cancelled successfully', 'success');
            loadAppointments();
        } catch (error) {
            showToast('Cancellation failed', 'error');
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>{appointments.length}</h3>
                                <p>Total Appointments</p>
                            </div>
                            <div className="stat-card" style={{ background: 'var(--gradient-secondary)' }}>
                                <h3>{appointments.filter(a => a.status === 'Confirmed' || a.status === 'BOOKED').length}</h3>
                                <p>Confirmed</p>
                            </div>
                            <div className="stat-card" style={{ background: 'var(--gradient-success)' }}>
                                <h3>{appointments.filter(a => a.status === 'Pending').length}</h3>
                                <p>Pending</p>
                            </div>
                        </div>
                        <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Upcoming Appointments</h3>
                        <div>
                            {appointments.length > 0 ?
                                appointments.slice(0, 3).map(apt => renderAppointmentCard(apt)) :
                                <p>No upcoming appointments</p>
                            }
                        </div>
                    </div>
                );

            case 'appointments':
                return (
                    <div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <button className="btn-primary" onClick={() => setActiveSection('bookNew')}>
                                <i className="fas fa-plus"></i> Book New Appointment
                            </button>
                        </div>
                        <div>
                            {appointments.length > 0 ?
                                appointments.map(apt => renderAppointmentCard(apt, true)) :
                                <p>No appointments found</p>
                            }
                        </div>
                    </div>
                );

            case 'bookNew':
                return (
                    <div>
                        <h3 style={{ marginBottom: '1.5rem' }}>Select a Doctor</h3>
                        <div className="doctors-grid">
                            {doctors.map(doctor => (
                                <div key={doctor.id} className="doctor-card">
                                    <div className="doctor-image">
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className="doctor-info">
                                        <h3>{doctor.name}</h3>
                                        <p className="doctor-specialization">{doctor.specialization}</p>
                                        <div className="doctor-details">
                                            <span><i className="fas fa-briefcase"></i> {doctor.experience} years</span>
                                        </div>
                                        <div className="doctor-fee">${doctor.consultationFee}</div>
                                        <button className="doctor-book-btn" onClick={() => onBookDoctor(doctor)}>
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ background: 'var(--gray-50)', padding: '2rem', borderRadius: 'var(--radius-xl)', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                <div style={{ width: '100px', height: '100px', background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                                    <i className="fas fa-user"></i>
                                </div>
                                <div>
                                    <h2 style={{ margin: 0 }}>{user.name}</h2>
                                    <p style={{ color: 'var(--gray-600)', margin: '0.5rem 0 0 0' }}>{user.email}</p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
                                    <span style={{ color: 'var(--gray-600)' }}>Contact</span>
                                    <span style={{ fontWeight: 600 }}>{user.contact || 'Not provided'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
                                    <span style={{ color: 'var(--gray-600)' }}>Joined</span>
                                    <span style={{ fontWeight: 600 }}>{user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : 'Recently'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
                                    <span style={{ color: 'var(--gray-600)' }}>Gender</span>
                                    <span style={{ fontWeight: 600 }}>{user.gender || 'Not provided'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                );

            default:
                return null;
        }
    };

    const renderAppointmentCard = (appointment, showActions = false) => {
        // Check if appointment object structure is valid
        if (!appointment || !appointment.doctor) return null;

        const date = new Date(appointment.appointmentDate);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return (
            <div key={appointment.appointmentId || appointment.id} className="appointment-card">
                <div className="appointment-header">
                    <div>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{appointment.doctor.name}</h4>
                        <p style={{ color: 'var(--primary-color)', margin: 0, fontWeight: 600 }}>{appointment.doctor.specialization}</p>
                    </div>
                    <span className={`appointment-status status-${(appointment.status || 'pending').toLowerCase()}`}>
                        {appointment.status || 'Pending'}
                    </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <p style={{ color: 'var(--gray-600)', margin: 0, fontSize: '0.875rem' }}>Date</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600 }}>{formattedDate}</p>
                    </div>
                    <div>
                        <p style={{ color: 'var(--gray-600)', margin: 0, fontSize: '0.875rem' }}>Time</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600 }}>{appointment.timeSlot}</p>
                    </div>
                </div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: 'var(--gray-600)', margin: 0, fontSize: '0.875rem' }}>Consultation Fee</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>${appointment.consultationFee}</p>
                    </div>
                    {showActions && appointment.status !== 'CANCELLED' && (
                        <button
                            onClick={() => cancelAppointment(appointment.appointmentId)}
                            style={{ padding: '0.5rem 1rem', background: 'var(--error)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="dashboard">
            <div className="dashboard-sidebar">
                <div className="logo">
                    <i className="fas fa-heartbeat"></i>
                    <span>HealthCare<span className="plus">Plus</span></span>
                </div>
                <nav className="dashboard-nav">
                    <a
                        href="#"
                        className={activeSection === 'overview' ? 'active' : ''}
                        onClick={() => setActiveSection('overview')}
                    >
                        <i className="fas fa-home"></i> Overview
                    </a>
                    <a
                        href="#"
                        className={activeSection === 'appointments' ? 'active' : ''}
                        onClick={() => setActiveSection('appointments')}
                    >
                        <i className="fas fa-calendar"></i> My Appointments
                    </a>
                    <a
                        href="#"
                        className={activeSection === 'bookNew' ? 'active' : ''}
                        onClick={() => setActiveSection('bookNew')}
                    >
                        <i className="fas fa-plus-circle"></i> Book Appointment
                    </a>
                    <a
                        href="#"
                        className={activeSection === 'profile' ? 'active' : ''}
                        onClick={() => setActiveSection('profile')}
                    >
                        <i className="fas fa-user"></i> My Profile
                    </a>
                    <a href="#" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </div>
            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h1>{activeSection === 'overview' ? 'Dashboard Overview' :
                        activeSection === 'appointments' ? 'My Appointments' :
                            activeSection === 'bookNew' ? 'Book New Appointment' :
                                activeSection === 'profile' ? 'My Profile' : 'Dashboard'}</h1>
                    <div className="user-info">
                        <i className="fas fa-user-circle"></i>
                        <span>{user.name}</span>
                    </div>
                </div>
                <div className="dashboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
