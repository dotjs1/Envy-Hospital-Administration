import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginOverlay = ({ onLogin }) => {
  const [adminNumber, setAdminNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminnumber: adminNumber,
        adminpass: password
      })
    });

    // Safely handle JSON response
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const text = await res.text(); // Prevent failure if response is empty
    const data = text ? JSON.parse(text) : null;
      if (res.ok) {
        alert(data.message);
        sessionStorage.setItem('tokenAuth',data.token)
        onLogin();
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="overlay d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Administrator Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Number</label>
            <input
              type="text"
              className="form-control"
              value={adminNumber}
              onChange={(e) => setAdminNumber(e.target.value)}
              placeholder="Enter your admin number"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
        <ToastContainer/>
    </div>
  );
};

export default LoginOverlay;
