// src/paginas/EditarCoche.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function EditarCoche() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coche, setCoche] = useState({
    marca: "",
    modelo: "",
    precio: "",
    descripcion: "",
    stock: "",
    anio: "",
    km: ""
  });

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get(`/coches/${id}`);
        setCoche(res.data);
      } catch (err) {
        console.error("❌ Error al cargar coche:", err);
      }
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    setCoche({ ...coche, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/coches/${id}`, coche);
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al guardar cambios:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Coche</h2>
      <form onSubmit={handleSubmit}>
        {["marca", "modelo", "precio", "stock", "anio", "km", "descripcion"].map((campo) => (
          <div className="mb-3" key={campo}>
            <label className="form-label">{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            {campo === "descripcion" ? (
              <textarea
                name={campo}
                value={coche[campo]}
                onChange={handleChange}
                className="form-control"
                rows="3"
              />
            ) : (
              <input
                type={["precio", "stock", "anio", "km"].includes(campo) ? "number" : "text"}
                name={campo}
                value={coche[campo]}
                onChange={handleChange}
                className="form-control"
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">💾 Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarCoche;
