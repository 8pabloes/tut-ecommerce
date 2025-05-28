import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";


import "./CocheDetalle.css";

function CocheDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.nombre) setUsuario(user);
  }, []);

  useEffect(() => {
    api.get(`/coches/${id}`)
      .then(res => setCoche(res.data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  if (!coche) return <div className="detalle-container">Cargando...</div>;

  return (
    <div className="detalle-wrapper">
      <div className="detalle-izquierda">
        <img className="detalle-imagen" src={`/coches/${coche.imagen}`} alt={coche.modelo} />
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
            <button className="btn btn-verde" onClick={() => alert("🛒 Añadido al carrito")}>
              🛒 Comprar ahora
            </button>
            <button className="btn btn-gris" onClick={() => alert("💖 Añadido a favoritos")}>
              ❤️ Añadir a favoritos
            </button>
            {coche.stock === 0 && (
              <button className="btn btn-rosa" onClick={() => alert("➕ Añadido a lista de deseos")}>
                ➕ Añadir a lista de deseos
              </button>
            )}
          </div>
        ) : (
          <p className="mensaje-login">🔒 Inicia sesión para comprar o guardar este coche.</p>
        )}
      </div>
    </div>
  );
}

export default CocheDetalle;
