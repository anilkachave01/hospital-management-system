# 📧 Email Notification Configuration Guide

To ensure the "proper email auth" features (appointment confirmations, registration emails) work correctly, you must configure the backend email settings.

## 1. Backend Configuration
Open `src/main/resources/application.properties` in your Spring Boot backend and ensure these settings are correct:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_GMAIL_ADDRESS
spring.mail.password=YOUR_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> **Note:** For Gmail, you must use an **App Password**, not your regular password. Go to Google Account > Security > 2-Step Verification > App Passwords.

## 2. Emails Sent
The system is configured to send:

### 🏥 Appointment Confirmation
- **To:** Patient
- **Subject:** Appointment Confirmation - HealthCare Plus
- **Details Included:**
  - Doctor Name
  - Specialization
  - Date & Time Slot
  - Consultation Fee
  - Location

### 👤 Registration Welcome
- **To:** New Patient
- **Subject:** Welcome to HealthCare Plus
- **Details:** Account creation confirmation.

### 📅 Admin Notification
- **To:** Admin (configured in AppointmentService.java)
- **Subject:** New Appointment Booked
- **Details:** Patient info + Appointment info.

## 3. Testing
1. Ensure Backend is running (`mvn spring-boot:run`).
2. Ensure Frontend is running (`npm run dev`).
3. Register a user with a **real email address**.
4. Book an appointment.
5. Check your inbox!
