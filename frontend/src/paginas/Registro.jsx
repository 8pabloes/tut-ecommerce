import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginRegistro.css";

function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/registro", usuario);

      if (res.data === "Usuario registrado") {
        toast.success("✅ Cuenta creada. Revisa tu correo");
        navigate("/login");
      } else {
        setError(res.data);
      }
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("❌ Error al registrar");
      }
    }
  };

  return (
    <div className="form-page">
      <form className="form-box" onSubmit={enviar}>
        <h2 className="mb-3">Crear cuenta</h2>

        <input
          className="form-control mb-3"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          required
        />
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Correo electrónico"
          value={usuario.correo}
          onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Contraseña"
          value={usuario.contrasena}
          onChange={(e) =>
            setUsuario({ ...usuario, contrasena: e.target.value })
          }
          required
        />
        <button className="btn btn-success w-100">Registrarse</button>
        {error && <div className="text-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}

export default Registro;
