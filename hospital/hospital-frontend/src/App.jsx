import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Doctors from './components/Doctors';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import BookingModal from './components/BookingModal';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';

function App() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');

        if (token && user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const showToast = (message, type = 'info') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'info' });
        }, 3000);
    };

    const handleLogin = (user) => {
        setCurrentUser(user);
        setIsLoginModalOpen(false);
        showToast('Login successful!', 'success');
    };

    const handleRegister = () => {
        setIsRegisterModalOpen(false);
        showToast('Registration successful! Please login.', 'success');
        setIsLoginModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        showToast('Logged out successfully', 'info');
    };

    const openBookingModal = (doctor) => {
        if (!currentUser) {
            showToast('Please login to book an appointment', 'info');
            setIsLoginModalOpen(true);
            return;
        }
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);
    };

    const handleBookingSuccess = () => {
        setIsBookingModalOpen(false);
        showToast('Appointment booked successfully! Check your email for confirmation.', 'success');
    };

    return (
        <Router>
            <div className="app">
                {currentUser ? (
                    <Dashboard
                        user={currentUser}
                        onLogout={handleLogout}
                        showToast={showToast}
                        onBookDoctor={openBookingModal}
                    />
                ) : (
                    <>
                        <Navbar
                            onLoginClick={() => setIsLoginModalOpen(true)}
                            onRegisterClick={() => setIsRegisterModalOpen(true)}
                        />

                        <Routes>
                            <Route path="/" element={
                                <>
                                    <Hero onGetStarted={() => setIsRegisterModalOpen(true)} />
                                    <Services />
                                    <Doctors onBookDoctor={openBookingModal} />
                                    <About />
                                    <Contact showToast={showToast} />
                                </>
                            } />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>

                        <Footer />
                    </>
                )}

                <LoginModal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    onLogin={handleLogin}
                    onSwitchToRegister={() => {
                        setIsLoginModalOpen(false);
                        setIsRegisterModalOpen(true);
                    }}
                    showToast={showToast}
                />

                <RegisterModal
                    isOpen={isRegisterModalOpen}
                    onClose={() => setIsRegisterModalOpen(false)}
                    onRegister={handleRegister}
                    onSwitchToLogin={() => {
                        setIsRegisterModalOpen(false);
                        setIsLoginModalOpen(true);
                    }}
                    showToast={showToast}
                />

                <BookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    doctor={selectedDoctor}
                    patient={currentUser}
                    onSuccess={handleBookingSuccess}
                    showToast={showToast}
                />

                <Toast
                    show={toast.show}
                    message={toast.message}
                    type={toast.type}
                />
            </div>
        </Router>
    );
}

export default App;
