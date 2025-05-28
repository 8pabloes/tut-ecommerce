import { Link, useNavigate, useLocation } from "react-router-dom";
import banner from "../assets/bannertut.png";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  // Detectar usuario logueado desde localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nombre) {
      setUsuario(user);
    } else {
      setUsuario(null);
    }
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
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
              {usuario ? (
                <>
                  <li className="nav-item text-light fw-bold">
                    👋 Hola, {usuario.nombre}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favoritos">💖 Lista de deseos</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={cerrarSesion} className="btn btn-outline-light btn-sm">
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-primary btn-sm" to="/login">Iniciar sesión</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light btn-sm" to="/registro">Registrarse</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mostrar banner solo fuera de login y registro */}
      {location.pathname !== "/login" && location.pathname !== "/registro" && (
        <div className="banner-container">
          <img src={banner} alt="Banner rally" className="img-fluid banner" />
        </div>
      )}
    </>
  );
}

export default Navbar;
