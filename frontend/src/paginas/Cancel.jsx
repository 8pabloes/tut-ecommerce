import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="text-center mt-5">
      <h2>❌ Pago cancelado</h2>
      <p>El pago ha sido cancelado o ha fallado. Puedes volver a intentarlo más tarde.</p>
      <Link to="/carrito" className="btn btn-danger mt-4">
        Volver a la cesta
      </Link>
    </div>
  );
}

export default Cancel;
