/* ============================================================
 * UTILITY HELPERS
 * ============================================================ */

/** Generate next ID like P001, D002, A003 */
function generateId(prefix, list) {
    const nums = list
        .map(item => parseInt(item.id.replace(prefix, ''), 10))
        .filter(n => !isNaN(n));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    return prefix + String(next).padStart(3, '0');
}

/** Escape HTML to prevent XSS in table rendering */
function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/** Show a bootstrap alert inside a container */
function showAlert(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    if (!container) { alert(message); return; }
    container.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${escapeHtml(message)}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
    setTimeout(() => {
        const alertEl = container.querySelector('.alert');
        if (alertEl) alertEl.remove();
    }, 3500);
}

/** Get today's date in YYYY-MM-DD */
function todayISO() {
    return new Date().toISOString().split('T')[0];
}

/** Format a date nicely */
function formatDate(isoDate) {
    if (!isoDate) return '—';
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/** Format time 24h to 12h */
function formatTime(t) {
    if (!t) return '—';
    const [h, m] = t.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
}

/** Sidebar mobile toggle */
function initSidebarToggle() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => sidebar.classList.toggle('show'));
    }
}

/** Highlight active sidebar link based on current URL */
function highlightActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href) return;
        if (path.includes('patient') && href.includes('patient')) link.classList.add('active');
        else if (path.includes('doctor') && href.includes('doctor')) link.classList.add('active');
        else if (path.includes('appointment') && href.includes('appointment')) link.classList.add('active');
        else if ((path.endsWith('/') || path.endsWith('index.html')) && href === 'index.html') {
            if (!path.includes('patient') && !path.includes('doctor') && !path.includes('appointment'))
                link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    highlightActiveNav();
});