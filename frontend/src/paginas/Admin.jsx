// src/paginas/Admin.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [coches, setCoches] = useState([]);
  const navigate = useNavigate();

  const cargarCoches = async () => {
    try {
      const res = await api.get("/coches");
      setCoches(res.data);
    } catch (err) {
      console.error("❌ Error al cargar coches", err);
    }
  };

  useEffect(() => {
    cargarCoches();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este coche?")) return;

    try {
      await api.delete(`/coches/${id}`);
      cargarCoches();
    } catch (err) {
      console.error("❌ Error al eliminar coche", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>⚙️ Panel de administración</h2>
        <button className="btn btn-success" onClick={() => navigate("/admin/nuevo")}>
          ➕ Nuevo coche
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coches.map((coche) => (
              <tr key={coche.id}>
                <td>{coche.id}</td>
                <td>{coche.marca}</td>
                <td>{coche.modelo}</td>
                <td>{coche.precio} €</td>
                <td>{coche.stock}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/admin/editar/${coche.id}`)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(coche.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {coches.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay coches registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
