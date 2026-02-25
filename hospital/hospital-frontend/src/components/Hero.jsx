import React from 'react';
import './Hero.css';

const Hero = ({ onGetStarted }) => {
    const scrollToDoctors = () => {
        const element = document.getElementById('doctors');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="hero-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="badge">Welcome to HealthCare Plus</span>
                        <h1 className="hero-title">
                            Your Health is Our
                            <span className="gradient-text"> Top Priority</span>
                        </h1>
                        <p className="hero-description">
                            Experience world-class healthcare with our network of experienced doctors.
                            Book appointments instantly, manage your health records, and get the care you deserve.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn-hero-primary" onClick={scrollToDoctors}>
                                Find a Doctor
                                <i className="fas fa-arrow-right"></i>
                            </button>
                            <button className="btn-hero-secondary" onClick={onGetStarted}>
                                Get Started
                                <i className="fas fa-play"></i>
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>500+</h3>
                                <p>Expert Doctors</p>
                            </div>
                            <div className="stat-item">
                                <h3>50k+</h3>
                                <p>Happy Patients</p>
                            </div>
                            <div className="stat-item">
                                <h3>98%</h3>
                                <p>Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="hero-card">
                            <i className="fas fa-user-md"></i>
                            <div className="card-content">
                                <h4>Professional Doctors</h4>
                                <p>Certified & Experienced</p>
                            </div>
                        </div>
                        <div className="hero-card hero-card-2">
                            <i className="fas fa-calendar-check"></i>
                            <div className="card-content">
                                <h4>Easy Booking</h4>
                                <p>Book in 60 seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
