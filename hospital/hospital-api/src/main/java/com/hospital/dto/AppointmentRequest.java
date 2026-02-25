package com.hospital.dto;

public class AppointmentRequest {

    private int doctorId;
    private String patientEmail;
    private String appointmentDate;   // yyyy-MM-dd
    private String timeSlot;

    public int getDoctorId() {
        return doctorId;
    }
 
    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }
 
    public String getPatientEmail() {
        return patientEmail;
    }
 
    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
 
    public String getAppointmentDate() {
        return appointmentDate;
    }
 
    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
 
    public String getTimeSlot() {
        return timeSlot;
    }
 
    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
}
