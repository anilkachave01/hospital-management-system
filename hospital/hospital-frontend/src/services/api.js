import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/auth';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (data) => api.post('/register', data),
    login: (data) => api.post('/login', data),
};

export const doctorsAPI = {
    getAll: () => api.get('/doctors'),
    getById: (id) => api.get(`/doctors/${id}`),
};

export const appointmentsAPI = {
    book: (data) => api.post('/appointments/book', data),
    getPatientAppointments: (patientId) => api.get(`/appointments/patient/${patientId}`),
    cancel: (appointmentId) => api.put(`/appointments/cancel/${appointmentId}`),
};

export const getMockDoctors = () => [
    {
        id: 1,
        name: "Dr. Avinash Bodkhe",
        email: "bodkheavi@hospital.com",
        specialization: "Cardiology",
        consultationFee: 150,
        experience: 15,
        status: "Available"
    },
    {
        id: 2,
        name: "Dr. Anil Kachave",
        email: "anilkachave@hospital.com",
        specialization: "Neurology",
        consultationFee: 200,
        experience: 12,
        status: "Available"
    },
    {
        id: 3,
        name: "Dr. Rohan Bodkhe",
        email: "rohangajanan@hospital.com",
        specialization: "Pediatrics",
        consultationFee: 120,
        experience: 10,
        status: "Available"
    },
    {
        id: 4,
        name: "Dr. Shiddheshwar Manawatkar",
        email: "shiddhumanawatkar@hospital.com",
        specialization: "Orthopedics",
        consultationFee: 180,
        experience: 18,
        status: "Available"
    },
    {
        id: 5,
        name: "Dr. Nitin Jadhav",
        email: "jadhavnitin@hospital.com",
        specialization: "Dermatology",
        consultationFee: 130,
        experience: 8,
        status: "Available"
    },
    {
        id: 6,
        name: "Dr. Gopal Bodkhe",
        email: "bodkhegopal@hospital.com",
        specialization: "Cardiology",
        consultationFee: 170,
        experience: 20,
        status: "Available"
    }
];

export default api;
