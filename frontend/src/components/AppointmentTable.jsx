import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // loading state added

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/getappointment`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.data || []);
        setLoading(false); // loading complete
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); //  stop spinner on error
      });
  }, []);

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/cancel?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Error cancelling appointment");
    }
  };

  const filtered = appointments.filter((a) =>
    `${a.ptname} ${a.doctorname} ${a.ptemail}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card p-4 shadow-lg rounded-4">
      <h2 className="text-center mb-4 fw-bold text-primary">Appointment Details</h2>

      <div className="input-group mb-4">
        <span className="input-group-text bg-light"><i className="bi bi-search"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, doctor, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? ( // 🔄 Spinner while loading
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="mt-2">Fetching appointments, please wait...</div>
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((a) => (
                <tr key={a._id} className="text-center">
                  <td className="fw-semibold">{a.ptname}</td>
                  <td>{a.doctorname}</td>
                  <td>{a.ptemail}</td>
                  <td>{new Date(a.dateofappointment).toLocaleDateString()}</td>
                  <td>
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1"></i>Confirmed
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => cancelAppointment(a._id)}
                    >
                      <i className="bi bi-x-circle me-1"></i>Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  <i className="bi bi-calendar-x fs-4"></i><br />
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AppointmentTable;
