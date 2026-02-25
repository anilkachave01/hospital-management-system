import React from 'react';
import './About.css';

export const About = () => (
    <section id="about" className="about">
        <div className="container">
            <div className="about-content">
                <div className="about-image">
                    <div className="about-img-wrapper">
                        <i className="fas fa-hospital-alt"></i>
                    </div>
                    <div className="about-badge">
                        <i className="fas fa-award"></i>
                        <span>25+ Years of Excellence</span>
                    </div>
                </div>
                <div className="about-text">
                    <span className="section-badge">About Us</span>
                    <h2 className="section-title">Committed to Excellence in Healthcare</h2>
                    <p>HealthCare Plus has been serving the community for over 25 years, providing exceptional medical care with compassion and expertise. Our state-of-the-art facilities and dedicated team of healthcare professionals ensure you receive the best possible treatment.</p>
                    <div className="about-features">
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>24/7 Emergency Care</h4>
                                <p>Round-the-clock emergency services</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>Modern Equipment</h4>
                                <p>Latest medical technology</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>Expert Team</h4>
                                <p>Highly qualified professionals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default About;
