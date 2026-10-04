# 🏥 MediCare – Hospital Management & Appointment System

A responsive hospital management dashboard built with **HTML, CSS, JavaScript, and Bootstrap 5**.
Uses mock/local data (localStorage) – ready to swap with a REST API + MySQL backend.

## 📂 Project Structure

```
hospital-management-system/
├── index.html                    # Dashboard
├── assets/
│   ├── css/style.css
│   ├── js/data.js                # Mock data + localStorage CRUD
│   ├── js/utils.js               # Helpers
│   └── js/app.js                 # Dashboard logic
├── patient-module/
│   ├── index.html                # Patient list
│   ├── register.html             # Add patient
│   └── details.html              # View/Edit/Delete
├── doctor-module/
│   ├── index.html
│   ├── add.html
│   └── details.html
├── appointment-module/
│   ├── index.html
│   ├── book.html
│   └── details.html
├── Dockerfile
└── docker-compose.yml
```

## 🚀 Running Locally

### Option 1: Using Python (easiest)
```bash
cd hospital-management-system
python -m http.server 8080
```
Open http://localhost:8080

### Option 2: Using Node.js (`http-server`)
```bash
npx http-server -p 8080
```

### Option 3: Using VS Code Live Server
Right-click `index.html` → **Open with Live Server**.

### Option 4: Using Docker
```bash
docker build -t medicare-hms .
docker run -p 8080:80 medicare-hms
```

## 🐳 Dockerize

```bash
docker-compose up -d
```

## 🧩 Future Backend Integration

All data functions live in `assets/js/data.js`. Replace the local
`localStorage` calls with `fetch()` calls to your REST API. Example:

```js
// Before (mock)
function getPatients() { return JSON.parse(localStorage.getItem('patients')) || []; }

// After (REST API)
async function getPatients() {
    const res = await fetch('/api/patients');
    return await res.json();
}
```

## 🎯 Modules
- **Patient Module:** Register, list, view, edit, delete
- **Doctor Module:** Add, list, view, edit, delete
- **Appointment Module:** Book, list, view, cancel

## 📦 Tech Stack
- HTML5, CSS3, Vanilla JavaScript (ES6)
- Bootstrap 5.3
- Font Awesome 6
- localStorage (mock DB)

## 📄 License
MIT – free for academic/college DevOps projects.