package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.model.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByPatientId(int patientId);

    List<Appointment> findByDoctorId(int doctorId);

    Appointment findByAppointmentId(String appointmentId);
}
