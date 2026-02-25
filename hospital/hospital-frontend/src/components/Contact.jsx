import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ showToast }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Get In Touch</span>
                    <h2 className="section-title">Contact Us</h2>
                    <p className="section-description">Have questions? We're here to help!</p>
                </div>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <h4>Visit Us</h4>
                            <p>Healthcare Avenue, Baner, Pune Maharashtra 411052</p>
                        </div>
                        <div className="contact-card">
                            <i className="fas fa-phone"></i>
                            <h4>Call Us</h4>
                            <p>+91 8767004746</p>
                            <p>+91 9322142405</p>
                        </div>
                        <div className="contact-card">
                            <i className="fas fa-envelope"></i>
                            <h4>Email Us</h4>
                            <p>info@healthcareplus.com</p>
                            <p>support@healthcareplus.com</p>
                        </div>
                    </div>
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary btn-block">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
