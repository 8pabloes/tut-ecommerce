import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./CocheCard.css";

function CocheCard({ coche }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
      setUsuario(user);
      comprobarFavorito(user.id, coche.id);
    }
  }, [coche.id]);

  const comprobarFavorito = async (usuarioId, cocheId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/favoritos/existe/${usuarioId}/${cocheId}`);
      setEsFavorito(res.data);
    } catch (err) {
      console.error("❌ Error al comprobar favorito:", err);
    }
  };

  const toggleFavorito = async () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      if (esFavorito) {
        await axios.delete(`http://localhost:8080/api/favoritos/${usuario.id}/${coche.id}`);
        toast.info("💔 Eliminado de favoritos");
      } else {
        await axios.post(`http://localhost:8080/api/favoritos/${usuario.id}/${coche.id}`);
        toast.success("💖 Añadido a favoritos");
      }
      setEsFavorito(!esFavorito);
    } catch (err) {
      toast.error("❌ Error al actualizar favoritos");
      console.error("❌ Error al actualizar favorito:", err);
    }
  };

  const irADetalle = () => {
    navigate(`/coches/${coche.id}`);
  };

  return (
    <div className="car-card">
      <div className="car-img-container">
        <img
          src={`/coches/${coche.imagen}`}
          alt={coche.modelo}
          className="car-img"
        />
        <button
          className={`car-fav ${esFavorito ? "activo" : ""}`}
          onClick={toggleFavorito}
          title="Añadir a favoritos"
        >
          ❤
        </button>
      </div>
      <div className="car-details">
        <h3 className="car-title">{coche.marca} {coche.modelo}</h3>
        <p className="car-description">{coche.descripcion}</p>
        <div className="car-bottom">
          <span className="car-price">{coche.precio.toLocaleString()} €</span>
          <button className="car-btn" onClick={irADetalle}>Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default CocheCard;
