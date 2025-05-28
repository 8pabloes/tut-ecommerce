import React from "react";

function CocheCard({ coche, onEliminar, onFavorito, onCarrito }) {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card shadow-sm h-100 border-0">
        <img
          src={`/coches/${coche.imagen}`}
          className="card-img-top"
          alt={`${coche.marca} ${coche.modelo}`}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1">{coche.marca} {coche.modelo}</h5>
          <p className="card-text small text-muted mb-2">{coche.descripcion}</p>
          <p className="card-text mb-1">💰 <strong>{coche.precio} €</strong></p>
          <p className="card-text">📦 Stock: {coche.stock}</p>

          <div className="mt-auto d-flex justify-content-between gap-2">
            <button className="btn btn-outline-danger btn-sm w-100" onClick={() => onFavorito(coche.id)}>❤️</button>
            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => onCarrito(coche.id)}>🛒</button>
            <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => onEliminar(coche.id)}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CocheCard;
