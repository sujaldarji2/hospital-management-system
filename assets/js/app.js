/* ============================================================
 * DASHBOARD PAGE LOGIC (index.html)
 * ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Set today's date
    const dateEl = document.getElementById('todayDate');
    if (dateEl) {
        dateEl.innerText = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    renderStats();
    renderDoctorChart();
    renderRecentAppointments();
});

function renderStats() {
    const stats = getStats();
    const map = {
        totalPatients: stats.totalPatients,
        totalDoctors: stats.totalDoctors,
        todayAppointments: stats.todayAppointments,
        completedAppointments: stats.completedAppointments
    };
    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    });
}

function renderDoctorChart() {
    const container = document.getElementById('doctorChart');
    if (!container) return;
    container.innerHTML = '';

    const doctors = getDoctors();
    const appointments = getAppointments();

    if (doctors.length === 0) {
        container.innerHTML = '<p class="text-muted w-100 text-center my-auto">No doctors added yet.</p>';
        return;
    }

    const counts = doctors.map(d => ({
        name: d.name.replace('Dr. ', '').split(' ')[0],
        count: appointments.filter(a => a.doctorId === d.id).length
    }));
    const max = Math.max(1, ...counts.map(c => c.count));

    counts.forEach(c => {
        const heightPct = (c.count / max) * 100;
        const item = document.createElement('div');
        item.className = 'bar-item';
        item.innerHTML = `
            <div class="bar" style="height:${Math.max(8, heightPct)}%;"></div>
            <div class="bar-label">${escapeHtml(c.name)}</div>
        `;
        container.appendChild(item);
    });
}

function renderRecentAppointments() {
    const list = document.getElementById('recentAppointmentsList');
    if (!list) return;
    list.innerHTML = '';

    const appointments = getAppointments()
        .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
        .slice(0, 5);

    if (appointments.length === 0) {
        list.innerHTML = '<li class="list-group-item text-center text-muted py-4">No appointments yet.</li>';
        return;
    }

    appointments.forEach(a => {
        const patient = getPatientById(a.patientId);
        const doctor = getDoctorById(a.doctorId);
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center border-0 py-3';
        li.innerHTML = `
            <div>
                <strong>${escapeHtml(patient ? patient.name : 'Unknown')}</strong><br>
                <small class="text-muted">
                    ${formatDate(a.date)} · ${formatTime(a.time)}<br>
                    <i class="fas fa-user-md me-1"></i>${escapeHtml(doctor ? doctor.name : 'N/A')}
                </small>
            </div>
            <span class="badge-status badge-${a.status.toLowerCase()}">${a.status}</span>
        `;
        list.appendChild(li);
    });
}