package com.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.model.Appointment;
import com.hospital.repository.AppointmentRepository;

import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment bookAppointment(Appointment appointment) {
        appointment.setAppointmentId("APT-" + UUID.randomUUID().toString().substring(0,8));
        appointment.setStatus("BOOKED");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(int patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Appointment cancelAppointment(String appointmentId) {
        Appointment ap = appointmentRepository.findByAppointmentId(appointmentId);
        ap.setStatus("CANCELLED");
        return appointmentRepository.save(ap);
    }
}
