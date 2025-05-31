import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";


function Admin() {
  const [coches, setCoches] = useState([]);

  const cargarCoches = async () => {
    try {
      const res = await api.get("/coches");
      setCoches(res.data);
    } catch (error) {
      console.error("❌ Error al cargar coches:", error);
    }
  };

  const eliminarCoche = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este coche?")) return;
    try {
      await api.delete(`/coches/${id}`);
      cargarCoches();
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
    }
  };

  useEffect(() => {
    cargarCoches();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <Link to="/admin/nuevo" className="btn btn-success">➕ Añadir Coche</Link>
      </div>
      <div className="row">
        {coches.map((coche) => (
          <div key={coche.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:8080/img/${coche.imagen}`}
                className="card-img-top"
                alt={coche.modelo}
              />
              <div className="card-body">
                <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                <p className="card-text">{coche.precio} €</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/admin/editar/${coche.id}`} className="btn btn-primary">✏️ Editar</Link>
                  <button onClick={() => eliminarCoche(coche.id)} className="btn btn-danger">🗑️ Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {coches.length === 0 && <p>No hay coches cargados.</p>}
      </div>
    </div>
  );
}

export default Admin;
