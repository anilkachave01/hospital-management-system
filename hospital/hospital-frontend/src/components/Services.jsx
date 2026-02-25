import React from 'react';
import './Services.css';

const Services = () => {
    const services = [
        { icon: 'fa-stethoscope', title: 'General Consultation', description: 'Get expert medical advice from our experienced general practitioners' },
        { icon: 'fa-heartbeat', title: 'Cardiology', description: 'Specialized heart care with state-of-the-art diagnostic equipment' },
        { icon: 'fa-brain', title: 'Neurology', description: 'Expert neurological care for brain and nervous system disorders' },
        { icon: 'fa-tooth', title: 'Dental Care', description: 'Complete dental solutions for a healthy, beautiful smile' },
        { icon: 'fa-baby', title: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents' },
        { icon: 'fa-x-ray', title: 'Radiology', description: 'Advanced imaging and diagnostic services' },
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Our Services</span>
                    <h2 className="section-title">Comprehensive Healthcare Solutions</h2>
                    <p className="section-description">We provide a wide range of medical services to meet all your healthcare needs</p>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
