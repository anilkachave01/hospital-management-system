import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <i className="fas fa-heartbeat"></i>
                        <span>HealthCare<span className="plus">Plus</span></span>
                    </div>

                    <ul className="nav-links">
                        <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                        <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
                        <li><a href="#doctors" onClick={() => scrollToSection('doctors')}>Doctors</a></li>
                        <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
                        <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
                    </ul>

                    <div className="nav-buttons">
                        <button className="btn-outline" onClick={onLoginClick}>Login</button>
                        <button className="btn-primary" onClick={onRegisterClick}>Register</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
