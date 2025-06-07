import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";
import api from "../api/axiosConfig";

function Success() {
  const { carrito, vaciarCarrito } = useCarrito();

  useEffect(() => {
    const registrarPedido = async () => {
      try {
        if (Array.isArray(carrito) && carrito.length > 0) {
          const res = await api.post("/pedidos/crear", carrito);
          console.log("✅ Pedido registrado:", res.data);
          vaciarCarrito();
        } else {
          console.warn("ℹ️ Carrito vacío o no disponible");
        }
      } catch (error) {
        console.error("❌ Error al registrar pedido:", error);
      }
    };

    registrarPedido();
  }, [carrito, vaciarCarrito]);

  return (
    <div className="text-center mt-5 success-page">
      <FaCheckCircle size={80} className="text-success mb-4" />
      <h2>¡Pago realizado con éxito!</h2>
      <p className="lead">Gracias por tu compra. Tu pedido ha sido registrado correctamente.</p>
      <Link to="/" className="btn btn-success mt-4 px-4 py-2">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Success;
