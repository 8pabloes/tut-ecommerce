// Coches.jsx actualizado - imagenes se leen de coche.imagen
import React, { useEffect, useState } from "react";
import axios from "axios";
import CocheCard from "../componentes/CocheCard";

function Coches() {
  const [coches, setCoches] = useState([]);
  const [filtros, setFiltros] = useState({
    marca: "",
    modelo: "",
    precioMin: "",
    precioMax: "",
  });

 useEffect(() => {
  const cargar = async () => {
    console.log("🔄 Cargando coches...");
    try {
      const res = await axios.get("http://localhost:8080/api/coches");
      console.log("📦 Coches recibidos:", res.data);
      setCoches(res.data);
    } catch (err) {
      console.error("❌ Error al cargar coches:", err);
    }
  };

  cargar();
}, []);


  const filtrar = coche => {
    const { marca, modelo, precioMin, precioMax } = filtros;
    const coincideMarca = coche.marca.toLowerCase().includes(marca.toLowerCase());
    const coincideModelo = coche.modelo.toLowerCase().includes(modelo.toLowerCase());
    const coincidePrecioMin = precioMin === "" || coche.precio >= parseFloat(precioMin);
    const coincidePrecioMax = precioMax === "" || coche.precio <= parseFloat(precioMax);
    return coincideMarca && coincideModelo && coincidePrecioMin && coincidePrecioMax;
  };

  return (
    <div className="container py-4">
      <div className="row g-3 mb-4 align-items-end">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Marca"
            value={filtros.marca}
            onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Modelo"
            value={filtros.modelo}
            onChange={(e) => setFiltros({ ...filtros, modelo: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Precio mín"
            value={filtros.precioMin}
            onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Precio máx"
            value={filtros.precioMax}
            onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">🔍 Buscar</button>
        </div>
      </div>

      <div className="row">
        {coches.filter(filtrar).map(coche => (
          <CocheCard
            key={coche.id}
            coche={coche}
            onEliminar={() => {}}
            onFavorito={() => {}}
            onCarrito={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default Coches;
