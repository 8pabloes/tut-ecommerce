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
    const marcaOk = coche.marca.toLowerCase().includes(marca.toLowerCase());
    const modeloOk = coche.modelo.toLowerCase().includes(modelo.toLowerCase());
    const minOk = precioMin === "" || coche.precio >= parseFloat(precioMin);
    const maxOk = precioMax === "" || coche.precio <= parseFloat(precioMax);
    return marcaOk && modeloOk && minOk && maxOk;
  };

  const manejarSubmit = (e) => e.preventDefault();

  const cochesFiltrados = coches.filter(filtrar);

  return (
    <div className="catalogo-container">
      <form className="filtros" onSubmit={manejarSubmit}>
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
        <button type="submit" className="btn-filtrar">🔍 Buscar</button>
      </form>

      <div className="row justify-content-center min-altura">
        {cochesFiltrados.length > 0 ? (
          cochesFiltrados.map((coche) => (
            <div className="col-md-4 mb-4" key={coche.id}>
              <CocheCard coche={coche} />
            </div>
          ))
        ) : (
          <p className="texto-vacio">🚫 No hay coches que coincidan con los filtros.</p>
        )}
      </div>
    </div>
  );
}

export default Coches;
