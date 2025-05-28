import React from "react";
import { useNavigate } from "react-router-dom";
import "./CocheCard.css";

function CocheCard({ coche }) {
  const navigate = useNavigate();

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
        <button className="car-fav" title="Añadir a lista de deseos">❤</button>
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
