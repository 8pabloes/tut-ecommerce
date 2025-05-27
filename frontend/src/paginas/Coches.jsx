import React, { useEffect, useState } from "react";
import axios from "axios";
import CocheCard from "../componentes/CocheCard";

function Coches() {
  const [coches, setCoches] = useState([]);
  const [nuevo, setNuevo] = useState({ marca: "", modelo: "", precio: "", stock: "" });

  const cargar = async () => {
    const res = await axios.get("http://localhost:8080/api/coches");
    setCoches(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/coches", nuevo);
    setNuevo({ marca: "", modelo: "", precio: "", stock: "" });
    cargar();
  };

  const eliminar = async (id) => {
    await axios.delete(`http://localhost:8080/api/coches/${id}`);
    cargar();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">🏎️ Coches disponibles</h2>

      <form onSubmit={crear} className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Marca" value={nuevo.marca} onChange={e => setNuevo({ ...nuevo, marca: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Modelo" value={nuevo.modelo} onChange={e => setNuevo({ ...nuevo, modelo: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Precio" value={nuevo.precio} onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Stock" value={nuevo.stock} onChange={e => setNuevo({ ...nuevo, stock: e.target.value })} required />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">Añadir</button>
        </div>
      </form>

      <div className="row">
        {coches.map(coche => (
          <CocheCard key={coche.id} coche={coche} onEliminar={eliminar} />
        ))}
      </div>
    </div>
  );
}

export default Coches;
