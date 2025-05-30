import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import CocheCard from "../componentes/CocheCard";
import "./Coches.css";

function Coches() {
  const [coches, setCoches] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filtros, setFiltros] = useState({
    marca: "",
    modelo: "",
    precioMin: "",
    precioMax: "",
  });

  useEffect(() => {
    cargarCoches();
  }, [page]);

  const cargarCoches = async () => {
    try {
      const res = await api.get(`/coches/pagina?page=${page}&size=6`);
      setCoches(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("❌ Error al cargar coches:", err);
    }
  };

  const manejarSubmit = (e) => e.preventDefault();

  const filtrar = (coche) => {
    const { marca, modelo, precioMin, precioMax } = filtros;
    const marcaOk = coche.marca.toLowerCase().includes(marca.toLowerCase());
    const modeloOk = coche.modelo.toLowerCase().includes(modelo.toLowerCase());
    const minOk = precioMin === "" || coche.precio >= parseFloat(precioMin);
    const maxOk = precioMax === "" || coche.precio <= parseFloat(precioMax);
    return marcaOk && modeloOk && minOk && maxOk;
  };

  const cochesFiltrados = coches.filter(filtrar);

  const irPagina = (nuevaPagina) => {
    if (nuevaPagina >= 0 && nuevaPagina < totalPages) {
      setPage(nuevaPagina);
    }
  };

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

      <div className="d-flex justify-content-center mt-4 paginacion">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => irPagina(page - 1)}
          disabled={page === 0}
        >
          ← Anterior
        </button>
        <span className="align-self-center">Página {page + 1} de {totalPages}</span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => irPagina(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default Coches;
