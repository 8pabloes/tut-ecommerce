import React from "react";
import "./CocheCard.css";

function CocheCard({ coche }) {
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
          <button className="car-btn">Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default CocheCard;
