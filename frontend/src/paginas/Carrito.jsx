import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Carrito.css";

function Carrito() {
  const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const pagarTodo = async () => {
    if (!usuario) {
      return navigate("/login");
    }
    try {
      const res = await api.post("/pago/carrito", {
        cochesIds: carrito.map((c) => c.id),
        usuarioId: usuario.id,
      });
      window.location.href = res.data;
    } catch (err) {
      alert("❌ Error al iniciar el pago del carrito");
    }
  };

  return (
    <div className="catalogo-container">
      <h2 className="mb-4">🛒 Tu cesta de compra</h2>
      <div className="row justify-content-center min-altura">
        {carrito.length > 0 ? (
          carrito.map((coche) => (
            <div className="col-md-4 mb-4" key={coche.id}>
              <div className="car-card">
                <div className="car-img-container">
                  <img
                    src={`/coches/${coche.imagen}`}
                    alt={coche.modelo}
                    className="car-img"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/coches/${coche.id}`)}
                  />
                  <button
                    className="car-fav activo"
                    onClick={() => quitarDelCarrito(coche.id)}
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
          <p className="texto-vacio">🪹 Tu cesta está vacía.</p>
        )}
      </div>

      {carrito.length > 0 && (
        <div className="text-center mt-4 d-flex flex-column gap-2 align-items-center">
          <button className="btn btn-success" onClick={pagarTodo}>
            💳 Pagar todo
          </button>
          <button className="btn btn-danger" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrito;
