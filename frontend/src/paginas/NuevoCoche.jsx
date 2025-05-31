import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function NuevoCoche() {
  const [datos, setDatos] = useState({
    marca: "",
    modelo: "",
    precio: "",
    stock: "",
    descripcion: ""
  });
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    Object.keys(datos).forEach((key) => formData.append(key, datos[key]));
    formData.append("imagen", imagen);

    try {
      await api.post("/coches", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al crear coche", err);
      alert("Hubo un error al crear el coche");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3>➕ Nuevo coche</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="marca" placeholder="Marca" onChange={handleChange} required />
        <input className="form-control mb-2" name="modelo" placeholder="Modelo" onChange={handleChange} required />
        <input className="form-control mb-2" name="precio" type="number" placeholder="Precio (€)" onChange={handleChange} required />
        <input className="form-control mb-2" name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
        <textarea className="form-control mb-2" name="descripcion" placeholder="Descripción" onChange={handleChange} rows={4} />
        <input className="form-control mb-3" type="file" accept="image/*" onChange={handleFileChange} required />
        <button className="btn btn-success w-100" type="submit">Crear coche</button>
      </form>
    </div>
  );
}

export default NuevoCoche;
