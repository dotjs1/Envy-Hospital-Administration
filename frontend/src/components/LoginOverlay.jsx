import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginOverlay = ({ onLogin }) => {
  const [adminNumber, setAdminNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLogging(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminnumber: adminNumber,
          adminpass: password,
        }),
      });
const contentType = response.headers.get("content-type");
if (!contentType || !contentType.includes("application/json")) {
  throw new Error("Unexpected server response. Please try again later.");
}

const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Server error: ${response.status}`);
      }

      sessionStorage.setItem("tokenAuth", data.token);
      onLogin();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
      setIsLogging(false);
    }
  };

  return (
    <div className="overlay d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ minWidth: "320px" }}>
        {isLogging ? (
          <>
          <div className=" text-center">
            <div className="spinner-border text-primary mb-2" role="status" />
            <div>Logging in, please wait...</div>
            </div>
          </>
        ) : (
          <>
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
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLogging}
              >
                Login
              </button>
            </form>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginOverlay;
