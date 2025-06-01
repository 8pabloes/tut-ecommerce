import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function Cancel() {
  return (
    <div className="text-center mt-5 cancel-page">
      <FaTimesCircle size={80} className="text-danger mb-4" />
      <h2>Pago cancelado</h2>
      <p className="lead">El pago ha sido cancelado o ha fallado. Puedes volver a intentarlo más tarde.</p>
      <Link to="/carrito" className="btn btn-danger mt-4 px-4 py-2">
        Volver a la cesta
      </Link>
    </div>
  );
}

export default Cancel;
