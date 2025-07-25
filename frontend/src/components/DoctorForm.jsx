import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const DoctorForm = ({ token }) => {
  const [form, setForm] = useState({
    docname: "",
    docspec: "",
    email: "",
    aboutdoc: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/adddoctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({
          type: "success",
          text: (
            <>
              <i className="bi bi-check-circle-fill me-2"></i>
              {data.message}
            </>
          ),
        });
        setForm({ docname: "", docspec: "", email: "", aboutdoc: "" });
      } else {
        setMessage({ type: "danger", text: data.error });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Error submitting doctor info" });
    }
  };

  return (
    <div className="card p-4 shadow-lg rounded-4">
      <h2 className="text-center mb-4 text-primary fw-bold">
        <i className="bi bi-person-plus-fill me-2"></i>Add a Doctor
      </h2>

      {message && (
        <div className={`alert alert-${message.type} d-flex align-items-center`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="docname" className="form-label fw-semibold">
            Doctor Name
          </label>
          <input
            type="text"
            id="docname"
            name="docname"
            className="form-control"
            placeholder="e.g., Dr. John Smith"
            value={form.docname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="docspec" className="form-label fw-semibold">
            Specialization
          </label>
          <input
            type="text"
            id="docspec"
            name="docspec"
            className="form-control"
            placeholder="e.g., Cardiologist"
            value={form.docspec}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="e.g., doctor@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="aboutdoc" className="form-label fw-semibold">
            About the Doctor
          </label>
          <textarea
            id="aboutdoc"
            name="aboutdoc"
            className="form-control"
            rows="4"
            placeholder="Brief description, background, or experience..."
            value={form.aboutdoc}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
          <i className="bi bi-plus-circle me-2"></i>Add Doctor
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default DoctorForm;
