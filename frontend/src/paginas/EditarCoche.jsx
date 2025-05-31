import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";

function EditarCoche() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coche, setCoche] = useState({
    marca: "",
    modelo: "",
    precio: "",
    stock: "",
    descripcion: "",
    anio: "",
    km: "",
    imagen: "",
  });

  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await api.get(`/coches/${id}`);
        setCoche(res.data);
      } catch (err) {
        console.error("❌ Error al cargar el coche", err);
        setError("No se pudo cargar el coche.");
      }
    };

    cargar();
  }, [id]);

  const handleChange = (e) => {
    setCoche({ ...coche, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imagen && !imagen.name.toLowerCase().endsWith(".jpg")) {
      setError("Solo se permiten imágenes .jpg");
      return;
    }

    const formData = new FormData();
    Object.keys(coche).forEach((key) => {
      if (key !== "imagen") {
        formData.append(key, coche[key]);
      }
    });
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const token = localStorage.getItem("token");

      await api.put(`/coches/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al actualizar el coche", err);
      setError("Hubo un problema al actualizar.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>✏️ Editar coche</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          className="form-control mb-2"
          name="marca"
          value={coche.marca}
          onChange={handleChange}
          placeholder="Marca"
          required
        />
        <input
          className="form-control mb-2"
          name="modelo"
          value={coche.modelo}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
        <input
          className="form-control mb-2"
          name="precio"
          value={coche.precio}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          required
        />
        <input
          className="form-control mb-2"
          name="stock"
          value={coche.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          required
        />
        <input
          className="form-control mb-2"
          name="anio"
          value={coche.anio}
          onChange={handleChange}
          placeholder="Año"
          type="number"
          required
        />
        <input
          className="form-control mb-2"
          name="km"
          value={coche.km}
          onChange={handleChange}
          placeholder="Kilómetros"
          type="number"
          required
        />
        <textarea
          className="form-control mb-2"
          name="descripcion"
          value={coche.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          rows="3"
          required
        />

        {coche.imagen && (
          <div className="mb-3">
            <label className="form-label">Imagen actual:</label>
            <div>
              <img
                src={`http://localhost:8080/img/${coche.imagen}`}
                alt="Coche"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          </div>
        )}

        <label className="form-label">Cambiar imagen (.jpg solo):</label>
        <input
          className="form-control mb-3"
          type="file"
          accept=".jpg"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button className="btn btn-primary">💾 Guardar cambios</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default EditarCoche;
