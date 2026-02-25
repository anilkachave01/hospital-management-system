package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hospital.model.Patient;
import com.hospital.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    // Step 1 → Register with Email
    @PostMapping("/register")
    public String register(@RequestBody Patient patient) {
        return authService.register(patient);
    }

    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(@RequestBody java.util.Map<String, String> loginData) {
        try {
            Object user = authService.login(loginData.get("email"), loginData.get("password"));
            return org.springframework.http.ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return org.springframework.http.ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message", e.getMessage()));
        }
    }

    // Step 2 → Send OTP
    @PostMapping("/send-otp/{email}")
    public String sendOtp(@PathVariable String email) {
        return authService.sendOtp(email);
    }

    // Step 3 → Verify OTP (Login)
    @PostMapping("/verify")
    public String verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {
        return authService.verifyOtp(email, otp);
    }
}
