package com.hospital.util;

import java.util.Random;

public class OtpUtil {

    // Generate 6 digit OTP
    public static String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);   // 100000 - 999999
        return String.valueOf(otp);
    }
}
