// src/paginas/NuevoCoche.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function NuevoCoche() {
  const navigate = useNavigate();
  const [nuevoCoche, setNuevoCoche] = useState({
    marca: "",
    modelo: "",
    precio: "",
    descripcion: "",
    stock: "",
    anio: "",
    km: ""
  });

  const handleChange = (e) => {
    setNuevoCoche({ ...nuevoCoche, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/coches", nuevoCoche);
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al crear coche:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Coche</h2>
      <form onSubmit={handleSubmit}>
        {["marca", "modelo", "precio", "stock", "anio", "km", "descripcion"].map((campo) => (
          <div className="mb-3" key={campo}>
            <label className="form-label">{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            {campo === "descripcion" ? (
              <textarea
                name={campo}
                value={nuevoCoche[campo]}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            ) : (
              <input
                type={["precio", "stock", "anio", "km"].includes(campo) ? "number" : "text"}
                name={campo}
                value={nuevoCoche[campo]}
                onChange={handleChange}
                className="form-control"
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-success">📤 Crear Coche</button>
      </form>
    </div>
  );
}

export default NuevoCoche;
