import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./Carrito.css";

function Carrito() {
  const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const total = carrito.reduce((sum, coche) => sum + coche.precio, 0);

  const pagarTodo = async () => {
    if (!usuario) {
      return navigate("/login");
    }
    try {
      toast.info("⏳ Redirigiendo a Stripe...");
      const res = await api.post("/pago/carrito", {
        cochesIds: carrito.map((c) => c.id),
        usuarioId: usuario.id,
      });
      setTimeout(() => {
        window.location.href = res.data;
      }, 800);
    } catch (err) {
      toast.error("❌ Error al iniciar el pago del carrito");
    }
  };

  return (
    <div className="catalogo-container mt-5 pt-4">
      <h2 className="mb-4 text-center">🛒 Tu cesta de compra</h2>

      <div className="row justify-content-center min-altura">
        {carrito.length > 0 ? (
          carrito.map((coche) => (
            <div className="col-md-4 mb-4" key={coche.id}>
              <div className="car-card">
                <div className="car-img-container position-relative">
                  <img
                    src={coche.imagen}
                    alt={coche.modelo}
                    className="car-img"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/coches/${coche.id}`)}
                  />
                  <button
                    className="car-fav activo"
                    onClick={() => quitarDelCarrito(coche.id)}
                    title="Quitar del carrito"
                  >
                    ❌
                  </button>
                </div>
                <div className="car-details">
                  <h3 className="car-title">
                    {coche.marca} {coche.modelo}
                  </h3>
                  <p className="car-description">{coche.descripcion}</p>
                  <div className="car-bottom">
                    <span className="car-price">
                      {coche.precio.toLocaleString()} €
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="texto-vacio text-center">🪹 Tu cesta está vacía.</p>
        )}
      </div>

      {carrito.length > 0 && (
        <>
          <div className="carrito-total">
            <h4>Total: <span>{total.toLocaleString()} €</span></h4>
          </div>

          <div className="carrito-acciones">
            <button className="btn btn-success btn-lg" onClick={pagarTodo}>
              💳 Pagar todo
            </button>
            <button className="btn btn-outline-danger btn-lg" onClick={vaciarCarrito}>
              🗑️ Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
