# Envy Hospital Administration panel

A full-stack Envy Hospital Administration panel Web Application built with **React**, **Node.js**, **Express**, and **MongoDB**. It allows authenticated users to **login**, **manage doctors**, and **handle appointments** securely with modern UI and encrypted credentials.

## Features

###  Authentication
- JWT-based login/logout system
- Passwords encrypted using `bcryptjs`
- Persistent login with token validation

###  Doctor Management
- Add new doctors via form
- Edit doctor details in modal
- Delete doctor with confirmation
- Search doctors by name, specialty, or email (case-insensitive)
- Responsive table with Bootstrap 5 styling

###  Appointment Booking
- View booked appointment data
- Status indicators (Confirmed, Pending, Cancelled)

###  UX/UI
- Clean and responsive design using Bootstrap 5
- Search bar with live filtering
- Modal-based edit form
- Toast notifications via `react-toastify`
- Icons using Bootstrap Icons

---

## Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React    | Node.js (Express) | MongoDB (Mongoose) |
| Bootstrap 5 | JWT Auth + bcryptjs | MongoDB Atlas / Local |
| React Toastify | CORS Middleware | |

---

## Project Structure

```
Envy-Hospital-Administration/
├── client/                         # React frontend
│   ├── public/                     # Static assets
│   │   └── index.html
│   ├── src/
│   │   ├── images/                 # Images, icons, etc.
│   │   ├── components/             # Reusable components
│   │   │   ├── AppointmentTable.jsx
│   │   │   ├── DoctorForm.jsx
│   │   │   ├── DoctorTable.jsx
│   │   │   ├── LoginOverlay.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json

├── server/                         # Express backend
│   ├── models/                     # Mongoose models
│   │   └── user.js
│   ├── routes/                     # API routes
│   │   └── user.js
│   ├── middleware/                 # Auth and other middlewares
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   ├── db.js
│   ├── appointment.js              # API routes for appointment 
│   └── package.json

├── README.md
└── .gitignore


---

##  Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/doctor-management-system.git
cd doctor-management-system
```

---

### 2. Backend Setup (Express + MongoDB)

```bash
cd server
npm install
```

**Create `.env` file:**

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/doctorDB
JWT_SECRET=your_jwt_secret
```

**Run backend:**

```bash
npm run dev
```

---

### 3. Frontend Setup (React)

```bash
cd client
npm install
npm start
```

The React app will run on [http://localhost:3001](http://localhost:3001).

---

##  API Endpoints

| Method | Endpoint                         | Description              |
|--------|----------------------------------|--------------------------|
| POST   | `/api/user/login`               | Authenticate user        |
| GET    | `/api/user/getdoctor`           | Get list of doctors      |
| POST   | `/api/user/adddoctor`           | Add new doctor           |
| PUT    | `/api/user/updatedoctor`        | Update doctor details    |
| DELETE | `/api/user/deletedoctor?id=...` | Delete doctor by ID      |
| GET    | `/api/user/appointments`        | Get booked appointments  |

All protected routes require a valid JWT token in the `Authorization` header.

---

##  Dependencies

### Backend:
- express
- mongoose
- cors
- dotenv
- jsonwebtoken
- bcryptjs

### Frontend:
- react
- react-router-dom
- bootstrap
- react-bootstrap
- react-toastify
- bootstrap-icons

---

## Environment Variables

Create a `.env` file in `/server` directory:

```
# Server Configuration
PORT=3001

# Database
MONGO_URI=your_mongodb_uri  # Replace with your MongoDB connection string

# Authentication
JWT_SECRET=your_secret_key  # Use a strong, random key—consider generating one with a secure tool

# Predefined Credentials
PREDEFINED_PASSWORD=your_secure_password  #  Make sure it's long and complex
PREDEFINED_ADMIN_NUMBER=your_admin_identifier  # Could be an ID, email, or phone number
```

---

##  Screenshots

- Login Page  
<img src="../Envy Hospital (Admin)react.js/frontend/src/images/localhost_3000_ (7).png"alt="Screenshot" height="600">

- Doctor Table with Search  
<img src="../Envy Hospital (Admin)react.js/frontend/src/images/localhost_3000_ (10).png" alt="Screenshot" height="600"> 
- Appointment List View  
<img src="../Envy Hospital (Admin)react.js/frontend/src/images/localhost_3000_ (9).png" alt="Screenshot" height="600">

- New Doctor Addition Form
![Screenshot](./src/images/localhost_3000_(8).png)

---

## Future Improvements

- Image upload for doctors
- Email reminders for appointments
- Export doctor/appointment data to PDF/Excel
- Improvement in UI/UX
- Addition of progressive web application(PWA)

---

## Contributing

Contributions are welcome! Please fork this repo and open a Pull Request with your changes.

---

## License

MIT License © 2025 Your Name

---
