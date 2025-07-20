// components/Navbar.jsx
import React, { useEffect, useState } from "react";

const Navbar = ({ onLogout }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install: ${outcome}`);
      setDeferredPrompt(null);
      setInstallable(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand fs-4" href="#">Envy Hospital Admin Panel</a>

        <div className="d-flex gap-2 align-items-center">
          {installable && (
            <button className="btn btn-success btn-sm" onClick={handleInstallClick}>
              Install App
            </button>
          )}
          <button onClick={onLogout} className="btn btn-light btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;