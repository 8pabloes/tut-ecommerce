import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./CocheCard.css";

function CocheCard({ coche }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("usuario");
    if (userString) {
      const user = JSON.parse(userString);
      setUsuario(user);
      comprobarFavorito(user.id, coche.id);
    }
  }, [coche.id]);

  const comprobarFavorito = async (usuarioId, cocheId) => {
    try {
      const res = await api.get(`/favoritos/existe/${usuarioId}/${cocheId}`);
      setEsFavorito(res.data);
    } catch (err) {
      console.error("❌ Error al comprobar favorito:", err);
    }
  };

  const toggleFavorito = async () => {
    if (!usuario) {
      toast.info("🔒 Debes iniciar sesión");
      navigate("/login");
      return;
    }

    try {
      if (esFavorito) {
        await api.delete(`/favoritos/${usuario.id}/${coche.id}`);
        toast.info("💔 Eliminado de favoritos");
      } else {
        await api.post(`/favoritos/${usuario.id}/${coche.id}`);
        toast.success("💖 Añadido a favoritos");
      }
      setEsFavorito(!esFavorito);
    } catch (err) {
      console.error("❌ Error al actualizar favorito:", err);
      toast.error("❌ Error al actualizar favoritos");
    }
  };

  const irADetalle = () => {
    navigate(`/coches/${coche.id}`);
  };

  return (
    <div className="car-card">
      <div className="car-img-container">
        <img
  src={`/${coche.imagen}`}
  alt={coche.modelo}
  className="car-img"
/>


        <button
  className="car-fav"
  onClick={toggleFavorito}
  title="Añadir a favoritos"
>
  {esFavorito ? "❤️" : "🤍"}
</button>

      </div>
      <div className="car-details">
        <h3 className="car-title">
          {coche.marca} {coche.modelo}
        </h3>
        <p className="car-description">{coche.descripcion}</p>
        <div className="car-bottom">
          <span className="car-price">{coche.precio.toLocaleString()} €</span>
          <button className="car-btn" onClick={irADetalle}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}

export default CocheCard;
