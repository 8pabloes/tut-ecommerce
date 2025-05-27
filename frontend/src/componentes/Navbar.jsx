import { Link } from "react-router-dom";
import { useState } from "react";
import banner from "../assets/bannertut.png";
import "./Navbar.css";

function Navbar() {
  // Simulamos sesión: false = no logueado, true = logueado
  const [logueado, setLogueado] = useState(true);
  const usuario = "Pablo"; // Este valor simulará el usuario logueado

  const cerrarSesion = () => {
    setLogueado(false);
  };

  const iniciarSesion = () => {
    setLogueado(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm px-4">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/favicon.ico"
              alt="logo"
              width="30"
              height="30"
              className="me-2"
            />
            <span className="fw-bold fs-5">TUT - The Uxes Track</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              {logueado ? (
                <>
                  <li className="nav-item text-light fw-bold">👋 Hola, {usuario}</li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favoritos">💖 Lista de deseos</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-warning btn-sm">Admin</button>
                  </li>
                  <li className="nav-item">
                    <button onClick={cerrarSesion} className="btn btn-outline-light btn-sm">Cerrar sesión</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button onClick={iniciarSesion} className="btn btn-primary btn-sm">Iniciar sesión</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="banner-container">
        <img src={banner} alt="Banner rally" className="img-fluid banner" />
      </div>
    </>
  );
}

export default Navbar;
