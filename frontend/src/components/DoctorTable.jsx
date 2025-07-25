import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import debounce from "lodash/debounce";

const DoctorTable = ({ token }) => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/getdoctor`);
      const data = await res.json();
      setDoctors(data.data || []);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  useEffect(() => {
    const handler = debounce((value) => setDebouncedSearch(value), 300);
    handler(searchTerm);
    return () => handler.cancel();
  }, [searchTerm]);

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/deletedoctor?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setDoctors((prev) => prev.filter((d) => d._id !== id));
      } else {
        toast.error(data.error || "Failed to delete doctor.");
      }
    } catch (err) {
      toast.error("Error deleting doctor.");
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor({ ...doctor });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const updateDoctor = async () => {
    if (!editingDoctor) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/updatedoctor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: editingDoctor._id,
          docname: editingDoctor.docname,
          docspec: editingDoctor.docspec,
          email: editingDoctor.email,
          aboutdoc: editingDoctor.aboutdoc,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Doctor updated successfully!");
        setShowModal(false);
        fetchDoctors();
      } else {
        toast.error(result.error || "Failed to update doctor.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating doctor.");
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    [doc.docname, doc.docspec, doc.email]
      .some((field) =>
        field?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
  );

  return (
    <div className="card p-4 shadow rounded-4">
      <h2 className="text-center mb-4 text-primary fw-bold">
        <i className="bi bi-person-vcard-fill me-2"></i>Available Doctors
      </h2>

      <div className="input-group mb-4">
        <span className="input-group-text bg-light">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, specialty, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>About</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  <div className="spinner-border text-primary mb-2" role="status" />
                  <div>Loading doctors, please wait...</div>
                </td>
              </tr>
            ) : filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  <i className="bi bi-person-x fs-4"></i><br />
                  No matching doctors found.
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doc) => (
                <tr key={doc._id} className="text-center">
                  <td>{doc.docname || "N/A"}</td>
                  <td>{doc.docspec || "N/A"}</td>
                  <td>{doc.email || "N/A"}</td>
                  <td className="text-truncate" style={{ maxWidth: "250px" }}>
                    {doc.aboutdoc || "N/A"}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(doc)}
                      >
                        <i className="bi bi-pencil-square me-1" />Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteDoctor(doc._id)}
                      >
                        <i className="bi bi-trash me-1" />Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingDoctor && (
            <>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="docname"
                  value={editingDoctor.docname}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialty</label>
                <input
                  type="text"
                  className="form-control"
                  name="docspec"
                  value={editingDoctor.docspec}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editingDoctor.email}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">About</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="aboutdoc"
                  value={editingDoctor.aboutdoc}
                  onChange={handleEditChange}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="bi bi-x-circle me-1" />Cancel
          </Button>
          <Button variant="success" onClick={updateDoctor}>
            <i className="bi bi-check-circle me-1" />Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DoctorTable;

