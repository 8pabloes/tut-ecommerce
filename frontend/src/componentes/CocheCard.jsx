import React from "react";

function CocheCard({ coche, onEliminar }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
          <p className="card-text">💰 {coche.precio} €</p>
          <p className="card-text">📦 Stock: {coche.stock}</p>
          <button onClick={() => onEliminar(coche.id)} className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default CocheCard;
