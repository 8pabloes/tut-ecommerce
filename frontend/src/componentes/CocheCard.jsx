import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./CocheCard.css";

function CocheCard({ coche }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("usuario");
      if (!raw || raw === "undefined") return;
      const user = JSON.parse(raw);
      if (user) {
        setUsuario(user);
        comprobarFavorito(user.id, coche.id);
      }
    } catch (e) {
      setUsuario(null);
    }
  }, [coche.id]);

  const comprobarFavorito = async (usuarioId, cocheId) => {
    try {
      const res = await api.get(`/favoritos/existe/${usuarioId}/${cocheId}`);
      setEsFavorito(res.data);
    } catch (err) {
      console.error("❌ Error al comprobar favorito:", err);
    }
  };

  const toggleFavorito = async () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      if (esFavorito) {
        await api.delete(`/favoritos/${usuario.id}/${coche.id}`);
        toast.info("❌ Eliminado de favoritos");
      } else {
        await api.post("/favoritos", {
          usuarioId: usuario.id,
          cocheId: coche.id,
        });
        toast.success("❤️ Añadido a favoritos");
      }
      setEsFavorito(!esFavorito);
    } catch (err) {
      console.error("❌ Error al actualizar favorito:", err);
    }
  };

  return (
    <div className="card coche-card shadow">
      <img src={`/coches/${coche.imagen}`} className="card-img-top" alt={coche.modelo} />
      <div className="card-body">
        <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
        <p className="card-text">{coche.descripcion}</p>
        <p className="card-text fw-bold">{coche.precio} €</p>
        <button className="btn btn-outline-danger" onClick={toggleFavorito}>
          {esFavorito ? "💔 Quitar favorito" : "❤️ Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}

export default CocheCard;
