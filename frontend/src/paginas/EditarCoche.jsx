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
    km: "",
    imagen: ""
  });
  const [nuevaImagen, setNuevaImagen] = useState(null);

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

  const handleImagen = (e) => {
    setNuevaImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagenUrl = coche.imagen;

      if (nuevaImagen) {
        if (!nuevaImagen.name.endsWith(".jpg")) {
          alert("⚠️ La nueva imagen debe ser .jpg");
          return;
        }

        const formData = new FormData();
        formData.append("file", nuevaImagen);
        formData.append("upload_preset", "ml_default"); // o el preset real si lo configuras en Cloudinary

        const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dlvjdzl4q/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await cloudRes.json();
        imagenUrl = data.secure_url;
      }

      await api.put(`/coches/${id}`, {
        ...coche,
        imagen: imagenUrl,
      });

      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al guardar cambios:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Coche</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {["marca", "modelo", "precio", "stock", "anio", "km", "descripcion"].map((campo) => (
            <div className="mb-3 col-md-6" key={campo}>
              <label className="form-label text-capitalize">{campo}</label>
              {campo === "descripcion" ? (
                <textarea
                  className="form-control"
                  rows="3"
                  name={campo}
                  value={coche[campo]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={["precio", "stock", "anio", "km"].includes(campo) ? "number" : "text"}
                  className="form-control"
                  name={campo}
                  value={coche[campo]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Imagen actual:</label><br />
            <img
              src={coche.imagen}
              alt="Imagen actual"
              style={{ width: "200px", height: "auto", borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subir nueva imagen (.jpg)</label>
            <input
              type="file"
              className="form-control"
              accept=".jpg"
              onChange={handleImagen}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">💾 Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarCoche;
