// components/DoctorForm.jsx
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    docname: '',
    docspec: '',
    email: '',
    aboutdoc: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { docname, docspec, email, aboutdoc } = formData;
    if (!docname || !docspec || !email || !aboutdoc) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    const token = localStorage.getItem('tokenAuth');
    if (!token) {
      setMessage({ type: 'error', text: 'Unauthorized. Please log in again.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:3001/api/user/adddoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: result.message });
        setFormData({ docname: '', docspec: '', email: '', aboutdoc: '' });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <h3 className="text-center mb-4">👨‍⚕️ Add a Doctor</h3>

          {message && (
            <div
              className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} d-flex align-items-center`}
              role="alert"
            >
              <i className={`bi me-2 ${message.type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'}`}></i>
              <div>{message.text}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="docname"
                name="docname"
                className="form-control"
                placeholder="Doctor Name"
                value={formData.docname}
                onChange={handleChange}
              />
              <label htmlFor="docname">Doctor Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                id="docspec"
                name="docspec"
                className="form-control"
                placeholder="Specialty"
                value={formData.docspec}
                onChange={handleChange}
              />
              <label htmlFor="docspec">Specialization</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Doctor Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-4">
              <textarea
                id="aboutdoc"
                name="aboutdoc"
                className="form-control"
                style={{ height: '120px' }}
                placeholder="Doctor Bio"
                value={formData.aboutdoc}
                onChange={handleChange}
              />
              <label htmlFor="aboutdoc">About Doctor</label>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              )}
              {loading ? 'Submitting...' : 'Add Doctor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;
