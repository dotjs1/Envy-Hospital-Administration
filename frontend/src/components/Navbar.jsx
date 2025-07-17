// components/Navbar.jsx
import React from "react";

const Navbar = ({ onLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container d-flex justify-content-between align-items-center">
      <a className="navbar-brand fs-4" href="#">Envy Hospital Admin Panel</a>
      <button onClick={onLogout} className="btn btn-light btn-sm">Logout</button>
    </div>
  </nav>
);

export default Navbar;
