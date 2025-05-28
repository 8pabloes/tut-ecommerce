import React, { useEffect, useState } from "react";
import axios from "axios";
import CocheCard from "../componentes/CocheCard";
import "./Coches.css";

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
      try {
        const res = await axios.get("http://localhost:8080/api/coches");
        setCoches(res.data);
      } catch (err) {
        console.error("❌ Error al cargar coches:", err);
      }
    };
    cargar();
  }, []);

  const filtrar = (coche) => {
    const { marca, modelo, precioMin, precioMax } = filtros;
    return (
      coche.marca.toLowerCase().includes(marca.toLowerCase()) &&
      coche.modelo.toLowerCase().includes(modelo.toLowerCase()) &&
      (precioMin === "" || coche.precio >= parseFloat(precioMin)) &&
      (precioMax === "" || coche.precio <= parseFloat(precioMax))
    );
  };

  return (
    <div className="catalogo-container">

      <div className="filtros">
        <input
          type="text"
          placeholder="Marca"
          value={filtros.marca}
          onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={filtros.modelo}
          onChange={(e) => setFiltros({ ...filtros, modelo: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio mín"
          value={filtros.precioMin}
          onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio máx"
          value={filtros.precioMax}
          onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
        />
        <button className="btn-filtrar">🔍 Buscar</button>
      </div>

      <div className="row">
        {coches.filter(filtrar).map((coche) => (
          <div className="col-md-4 mb-4" key={coche.id}>
            <CocheCard coche={coche} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coches;
