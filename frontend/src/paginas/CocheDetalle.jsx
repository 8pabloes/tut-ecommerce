import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-toastify";
import "./CocheDetalle.css";

function CocheDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const { añadirAlCarrito } = useCarrito();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nombre) {
      setUsuario(user);
    }
  }, []);

  useEffect(() => {
    api.get(`/coches/${id}`)
      .then(res => setCoche(res.data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  useEffect(() => {
    if (usuario && coche) {
      api.get(`/favoritos/existe/${usuario.id}/${coche.id}`)
        .then(res => setEsFavorito(res.data))
        .catch(() => setEsFavorito(false));
    }
  }, [usuario, coche]);

  const toggleFavorito = async () => {
    if (!usuario) return;

    try {
      if (esFavorito) {
        await api.delete(`/favoritos/${usuario.id}/${coche.id}`);
        toast.info("💔 Eliminado de favoritos");
        setEsFavorito(false);
      } else {
        await api.post(`/favoritos/${usuario.id}/${coche.id}`);
        toast.success("💖 Añadido a favoritos");
        setEsFavorito(true);
      }
    } catch (err) {
      toast.error("❌ Error al actualizar favoritos");
      console.error(err);
    }
  };

  if (!coche) return <div className="detalle-container">Cargando...</div>;

  return (
    <div className="detalle-wrapper">
      <div className="detalle-izquierda">
        <img className="detalle-imagen" src={coche.imagen} alt={coche.modelo} />
      </div>

      <div className="detalle-derecha">
        <h2>{coche.marca} {coche.modelo}</h2>
        <p className="detalle-precio">{coche.precio.toLocaleString()} €</p>

        <ul className="info-lista">
          <li><strong>📅 Año:</strong> {coche.anio}</li>
          <li><strong>📍 Kilómetros:</strong> {coche.km.toLocaleString()} km</li>
          <li><strong>📦 Stock:</strong> {coche.stock > 0 ? `✅ ${coche.stock} unidades` : "❌ Sin stock"}</li>
        </ul>

        <p className="detalle-descripcion">{coche.descripcion}</p>

        {usuario ? (
          <div className="botones-detalle">
            <button
              className="btn btn-success"
              onClick={() => {
                añadirAlCarrito(coche);
                toast.success("🛒 Añadido a la cesta");
              }}
            >
              🛒 Comprar ahora
            </button>

            <button className="btn btn-danger" onClick={toggleFavorito}>
              {esFavorito ? "❤️ En favoritos" : "🤍 Añadir a favoritos"}
            </button>
          </div>
        ) : (
          <p className="mensaje-login">🔒 Inicia sesión para comprar o guardar este coche.</p>
        )}
      </div>
    </div>
  );
}

export default CocheDetalle;
