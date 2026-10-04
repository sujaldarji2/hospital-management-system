/* ============================================================
 * MOCK DATA LAYER – replace with REST API later
 * All CRUD operations use localStorage so data persists
 * ============================================================ */

const STORAGE_KEYS = {
    PATIENTS: 'hms_patients',
    DOCTORS: 'hms_doctors',
    APPOINTMENTS: 'hms_appointments'
};

/* ---------- SEED DATA ---------- */
const SEED_PATIENTS = [
    { id: 'P001', name: 'John Doe', age: 45, gender: 'Male', phone: '555-0101', email: 'john@example.com', address: '123 Main St' },
    { id: 'P002', name: 'Jane Smith', age: 32, gender: 'Female', phone: '555-0102', email: 'jane@example.com', address: '456 Oak Ave' },
    { id: 'P003', name: 'Robert Johnson', age: 58, gender: 'Male', phone: '555-0103', email: 'robert@example.com', address: '789 Pine Rd' }
];

const SEED_DOCTORS = [
    { id: 'D001', name: 'Dr. Emily Carter', specialization: 'Cardiology', phone: '555-0201', email: 'emily@hospital.com', availability: 'Mon-Fri 9AM-5PM' },
    { id: 'D002', name: 'Dr. Michael Chen', specialization: 'Pediatrics', phone: '555-0202', email: 'michael@hospital.com', availability: 'Mon-Wed 10AM-6PM' },
    { id: 'D003', name: 'Dr. Sarah Williams', specialization: 'Dermatology', phone: '555-0203', email: 'sarah@hospital.com', availability: 'Tue-Sat 8AM-4PM' }
];

const SEED_APPOINTMENTS = [
    { id: 'A001', patientId: 'P001', doctorId: 'D001', date: '2025-03-20', time: '10:00', reason: 'Chest pain', status: 'Scheduled' },
    { id: 'A002', patientId: 'P002', doctorId: 'D002', date: '2025-03-20', time: '11:30', reason: 'Fever', status: 'Completed' },
    { id: 'A003', patientId: 'P003', doctorId: 'D003', date: '2025-03-21', time: '09:15', reason: 'Skin rash', status: 'Scheduled' }
];

/* ---------- INIT ---------- */
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(SEED_PATIENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(SEED_DOCTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    }
}
initStorage();

/* ---------- PATIENT CRUD ---------- */
function getPatients() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS)) || [];
}

function getPatientById(id) {
    return getPatients().find(p => p.id === id);
}

function addPatient(patient) {
    const patients = getPatients();
    patient.id = generateId('P', patients);
    patients.push(patient);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    return patient;
}

function updatePatient(id, updated) {
    const patients = getPatients();
    const idx = patients.findIndex(p => p.id === id);
    if (idx === -1) return false;
    patients[idx] = { ...patients[idx], ...updated, id };
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    return true;
}

function deletePatient(id) {
    const patients = getPatients().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    // Cascade delete appointments
    const appts = getAppointments().filter(a => a.patientId !== id);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
}

/* ---------- DOCTOR CRUD ---------- */
function getDoctors() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS)) || [];
}

function getDoctorById(id) {
    return getDoctors().find(d => d.id === id);
}

function addDoctor(doctor) {
    const doctors = getDoctors();
    doctor.id = generateId('D', doctors);
    doctors.push(doctor);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    return doctor;
}

function updateDoctor(id, updated) {
    const doctors = getDoctors();
    const idx = doctors.findIndex(d => d.id === id);
    if (idx === -1) return false;
    doctors[idx] = { ...doctors[idx], ...updated, id };
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    return true;
}

function deleteDoctor(id) {
    const doctors = getDoctors().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    // Cascade delete appointments
    const appts = getAppointments().filter(a => a.doctorId !== id);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
}

/* ---------- APPOINTMENT CRUD ---------- */
function getAppointments() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) || [];
}

function getAppointmentById(id) {
    return getAppointments().find(a => a.id === id);
}

function addAppointment(appt) {
    const appts = getAppointments();
    appt.id = generateId('A', appts);
    appts.push(appt);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
    return appt;
}

function updateAppointment(id, updated) {
    const appts = getAppointments();
    const idx = appts.findIndex(a => a.id === id);
    if (idx === -1) return false;
    appts[idx] = { ...appts[idx], ...updated, id };
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
    return true;
}

function cancelAppointment(id) {
    return updateAppointment(id, { status: 'Cancelled' });
}

function deleteAppointment(id) {
    const appts = getAppointments().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
}

/* ---------- DASHBOARD HELPERS ---------- */
function getStats() {
    const today = new Date().toISOString().split('T')[0];
    const appointments = getAppointments();
    return {
        totalPatients: getPatients().length,
        totalDoctors: getDoctors().length,
        todayAppointments: appointments.filter(a => a.date === today).length,
        completedAppointments: appointments.filter(a => a.status === 'Completed').length
    };
}