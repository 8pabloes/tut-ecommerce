import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./Coches.css";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuario(user);
      cargarFavoritos(user.id);
    }
  }, []);

  const cargarFavoritos = async (usuarioId) => {
    try {
      const res = await api.get(`/favoritos/${usuarioId}`);
      const coches = res.data.map((f) => f.coche);
      setFavoritos(coches);
    } catch (err) {
      console.error("❌ Error al cargar favoritos:", err);
    }
  };

  const toggleFavorito = async (cocheId) => {
    try {
      await api.delete(`/favoritos/${usuario.id}/${cocheId}`);
      toast.info("💔 Eliminado de favoritos");
      setFavoritos((prev) => prev.filter((c) => c.id !== cocheId));
    } catch (err) {
      toast.error("❌ Error al eliminar de favoritos");
    }
  };

  const irADetalle = (id) => {
    navigate(`/coches/${id}`);
  };

  if (!usuario) {
    return (
      <div className="catalogo-container">
        🔒 Inicia sesión para ver tus favoritos.
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <h2 className="mb-4">💖 Mis coches favoritos</h2>
      <div className="row justify-content-center min-altura">
        {favoritos.length > 0 ? (
          favoritos.map((coche) => (
            <div className="col-md-4 mb-4" key={coche.id}>
              <div className="car-card">
                <div className="car-img-container">
                  <img
                    src={`/coches/${coche.imagen}`}
                    alt={coche.modelo}
                    className="car-img"
                    onClick={() => irADetalle(coche.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <button
                    className="car-fav activo"
                    onClick={() => toggleFavorito(coche.id)}
                    title="Quitar de favoritos"
                  >
                    ❤
                  </button>
                </div>
                <div className="car-details">
                  <h3 className="car-title">
                    {coche.marca} {coche.modelo}
                  </h3>
                  <p className="car-description">{coche.descripcion}</p>
                  <div className="car-bottom">
                    <span className="car-price">
                      {coche.precio.toLocaleString()} €
                    </span>
                    <button
                      className="car-btn"
                      onClick={() => irADetalle(coche.id)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="texto-vacio">
            🚫 Aún no tienes coches guardados como favoritos.
          </p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
