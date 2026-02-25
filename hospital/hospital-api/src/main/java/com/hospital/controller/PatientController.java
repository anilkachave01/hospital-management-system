package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hospital.model.Patient;
import com.hospital.service.PatientService;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Register patient
    @PostMapping("/register")
    public Patient register(@RequestBody Patient patient) {
        return patientService.registerPatient(patient);
    }
}
