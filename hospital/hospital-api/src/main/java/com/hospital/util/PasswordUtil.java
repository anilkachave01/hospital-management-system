package com.hospital.util;

import java.security.MessageDigest;

public class PasswordUtil {

    // Encrypt password using SHA-256
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(password.getBytes("UTF-8"));

            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();

        } catch (Exception e) {
            throw new RuntimeException("Error while hashing password");
        }
    }

    // Verify password
    public static boolean matchPassword(String rawPassword, String hashedPassword) {
        String newHash = hashPassword(rawPassword);
        return newHash.equals(hashedPassword);
    }
}
