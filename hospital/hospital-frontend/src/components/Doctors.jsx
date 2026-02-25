import React, { useState, useEffect } from 'react';
import { doctorsAPI, getMockDoctors } from '../services/api';
import './Doctors.css';

const Doctors = ({ onBookDoctor }) => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const response = await doctorsAPI.getAll();
            setDoctors(response.data);
            setFilteredDoctors(response.data);
        } catch (error) {
            const mockDoctors = getMockDoctors();
            setDoctors(mockDoctors);
            setFilteredDoctors(mockDoctors);
        }
    };

    const filterDoctors = (specialization) => {
        setActiveFilter(specialization);
        if (specialization === 'all') {
            setFilteredDoctors(doctors);
        } else {
            setFilteredDoctors(doctors.filter(d => d.specialization === specialization));
        }
    };

    const filters = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Our Doctors</span>
                    <h2 className="section-title">Meet Our Expert Medical Team</h2>
                    <p className="section-description">Highly qualified doctors dedicated to your health and well-being</p>
                </div>

                <div className="filter-bar">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => filterDoctors(filter)}
                        >
                            {filter === 'all' ? 'All Specializations' : filter}
                        </button>
                    ))}
                </div>

                <div className="doctors-grid">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="doctor-card">
                            <div className="doctor-image">
                                <i className="fas fa-user-md"></i>
                            </div>
                            <div className="doctor-info">
                                <h3>{doctor.name}</h3>
                                <p className="doctor-specialization">{doctor.specialization}</p>
                                <div className="doctor-details">
                                    <span><i className="fas fa-briefcase"></i> {doctor.experience} years experience</span>
                                    <span><i className="fas fa-envelope"></i> {doctor.email}</span>
                                    <span>
                                        <i className={`fas fa-circle ${doctor.status === 'Available' ? 'text-success' : 'text-warning'}`}></i>
                                        {doctor.status}
                                    </span>
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
        </section>
    );
};

export default Doctors;
