import { Link, useNavigate, useLocation } from "react-router-dom";
import banner from "../assets/bannertut.png";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const userRol = localStorage.getItem("rol");
    if (user && user.nombre) {
      setUsuario(user);
      setRol(userRol);
    } else {
      setUsuario(null);
      setRol(null);
    }
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    localStorage.removeItem("token");
    setUsuario(null);
    setRol(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top shadow-sm px-4">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/logo.png"
              alt="Logo TUT"
              width="36"
              height="36"
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
                  <li className="nav-item text-light fw-bold d-flex align-items-center">
                    👋 Hola, {usuario.nombre}
                    {rol === "admin" && (
                      <Link to="/admin" className="ms-2 text-decoration-none">
                        <span className="badge bg-danger" style={{ cursor: "pointer" }}>
                          Admin
                        </span>
                      </Link>
                    )}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favoritos">💖 Favoritos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/carrito">🛒 Cesta</Link>
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

      {/* Banner solo en home */}
      {location.pathname === "/" && (
        <div className="banner-container mt-5 pt-4">
          <img src={banner} alt="Banner rally" className="banner-img" />
        </div>
      )}
    </>
  );
}

export default Navbar;
