import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Success() {
  return (
    <div className="text-center mt-5 success-page">
      <FaCheckCircle size={80} className="text-success mb-4" />
      <h2>¡Pago realizado con éxito!</h2>
      <p className="lead">Gracias por tu compra. Te enviaremos un correo con los detalles.</p>
      <Link to="/" className="btn btn-success mt-4 px-4 py-2">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Success;
