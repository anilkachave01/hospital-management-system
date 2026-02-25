package com.hospital.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import com.hospital.util.EmailUtil;

@Service
public class AuthService {

    @Autowired
    private PatientRepository patientRepo;

    private final Map<String, String> otpStore = new HashMap<>();

    // Register
    public String register(Patient patient) {
        if (patientRepo.findByEmail(patient.getEmail()).isPresent()) {
            return "Email already registered";
        }

        // Set default values
        patient.setRegistrationDate(new java.util.Date());
        patient.setStatus("Active");
        patient.setFailedAttempts(0);

        patientRepo.save(patient);
        return "Registered successfully";
    }

    // Send OTP
    public String sendOtp(String email) {
        Patient patient = patientRepo.findByEmail(email).orElse(null);
        if (patient == null) {
            return "Email not registered";
        }

        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpStore.put(email, otp);

        EmailUtil.sendEmail(email, "Hospital OTP", "Your OTP is: " + otp);

        return "OTP sent";
    }

    // Verify OTP
    public String verifyOtp(String email, String otp) {
        if (!otpStore.containsKey(email)) {
            return "OTP expired";
        }

        if (!otpStore.get(email).equals(otp)) {
            return "Invalid OTP";
        }

        otpStore.remove(email);
        return "Login success";
    }

    // Login with Password
    public Object login(String email, String password) {
        Patient patient = patientRepo.findByEmail(email).orElse(null);
        if (patient == null) {
            throw new RuntimeException("User not found");
        }
        if (!patient.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return patient;
    }
}
