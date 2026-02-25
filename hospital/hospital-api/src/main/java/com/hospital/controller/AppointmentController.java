package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hospital.model.Appointment;
import com.hospital.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Book appointment
    @PostMapping("/book")
    public Appointment book(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // Get patient appointments
    @GetMapping("/patient/{id}")
    public List<Appointment> getPatientAppointments(@PathVariable int id) {
        return appointmentService.getPatientAppointments(id);
    }

    // Cancel appointment
    @PutMapping("/cancel/{appointmentId}")
    public Appointment cancel(@PathVariable String appointmentId) {
        return appointmentService.cancelAppointment(appointmentId);
    }
}
