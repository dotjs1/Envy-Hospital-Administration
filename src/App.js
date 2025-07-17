// HospitalDashboard.jsx
import React, { useState, useEffect } from "react";
import DoctorForm from "../frontend/src/components/DoctorForm";
import AppointmentTable from "../frontend/src/components/AppointmentTable";
import DoctorTable from "../frontend/src/components/DoctorTable";
import LoginOverlay from "../frontend/src/components/LoginOverlay";
import Navbar from "../frontend/src/components/Navbar";
import "./App.css";

const HospitalDashboard = () => {
  const [view, setView] = useState("login");
  const [token, setToken] = useState("");

 const handleLoginSuccess = () => {
  const receivedToken = sessionStorage.getItem("tokenAuth");
  if (receivedToken) {
    setToken(receivedToken);
    setView("appointments");
  }
};

const handleLogout = () => {
  sessionStorage.removeItem("tokenAuth");
  setToken("");
  setView("login");
};


useEffect(() => {
  const storedToken = sessionStorage.getItem("tokenAuth");
  if (storedToken) {
    setToken(storedToken);
    setView("appointments");
  }
}, []);

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      {view === "login" && <LoginOverlay onLogin={handleLoginSuccess} />}

      <div className="btn-div container mt-4 d-flex gap-3">
        <button className="btn btn-primary" onClick={() => setView("addDoctor")}>Add New Doctors</button>
        <button className="btn btn-primary" onClick={() => setView("appointments")}>View Appointments</button>
        <button className="btn btn-primary" onClick={() => setView("availableDoctors")}>Manage Available Doctors</button>
      </div>

      <div className="container mt-4">
        {view === "addDoctor" && <DoctorForm token={token} />}
        {view === "appointments" && <AppointmentTable />}
        {view === "availableDoctors" && <DoctorTable />}
      </div>
    </div>
  );
};

export default HospitalDashboard;
