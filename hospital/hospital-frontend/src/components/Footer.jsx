import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-column">
                    <div className="logo">
                        <i className="fas fa-heartbeat"></i>
                        <span>HealthCare<span className="plus">Plus</span></span>
                    </div>
                    <p>Your trusted partner for comprehensive healthcare solutions. Excellence in medical care since 1998.</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#doctors">Doctors</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#">Emergency Care</a></li>
                        <li><a href="#">Consultation</a></li>
                        <li><a href="#">Diagnostics</a></li>
                        <li><a href="#">Surgery</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Contact</h4>
                    <ul>
                        <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i className="fas fa-envelope"></i> info@healthcareplus.com</li>
                        <li><i className="fas fa-map-marker-alt"></i> Medical District, City</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Shri Gajanan Tech Solutions. All rights reserved.</p>
                <div className="social-links">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
