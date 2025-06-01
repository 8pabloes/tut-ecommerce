import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function NuevoCoche() {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    marca: "",
    modelo: "",
    precio: "",
    descripcion: "",
    stock: "",
    anio: "",
    km: "",
  });
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen || !imagen.name.endsWith(".jpg")) {
      setError("La imagen debe ser un archivo .jpg");
      return;
    }

    const formData = new FormData();
    Object.entries(formulario).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("imagen", imagen);

    try {
      await api.post("/coches", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al crear coche:", err);
      setError("Error al crear coche");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nuevo Coche</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {["marca", "modelo", "precio", "descripcion", "stock", "anio", "km"].map((campo) => (
            <div className="col-md-6 mb-3" key={campo}>
              <label className="form-label text-capitalize">{campo}</label>
              <input
                type={campo === "precio" || campo === "stock" || campo === "anio" || campo === "km" ? "number" : "text"}
                className="form-control"
                name={campo}
                value={formulario[campo]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="col-12 mb-3">
            <label className="form-label">Imagen (.jpg)</label>
            <input
              type="file"
              className="form-control"
              accept=".jpg"
              onChange={handleImagen}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Crear coche</button>
      </form>
    </div>
  );
}

export default NuevoCoche;
