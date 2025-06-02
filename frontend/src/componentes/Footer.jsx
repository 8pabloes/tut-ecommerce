import React from "react";

function Footer() {
  return (
    <footer className="footer bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} TUT-RallyShop 🚗</p>
        <small>Desarrollado como proyecto final DAW · Liceo La Paz</small>
      </div>
    </footer>
  );
}

export default Footer;
