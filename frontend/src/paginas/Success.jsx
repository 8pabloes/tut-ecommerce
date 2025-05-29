import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="text-center mt-5">
      <h2>✅ ¡Pago realizado con éxito!</h2>
      <p>Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
      <Link to="/" className="btn btn-success mt-4">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Success;
