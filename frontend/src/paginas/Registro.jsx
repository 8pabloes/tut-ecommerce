import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("http://localhost:8080/api/auth/registro", usuario);
      if (res.data === "Usuario registrado") {
        navigate("/login");
      } else {
        setError(res.data); // ← muestra mensaje del backend
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Error al registrar");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Crear cuenta</h3>
      <form onSubmit={enviar}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Correo"
          value={usuario.correo}
          onChange={(e) => setUsuario({ ...usuario, correo: e.target.value })}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Contraseña"
          type="password"
          value={usuario.contrasena}
          onChange={(e) => setUsuario({ ...usuario, contrasena: e.target.value })}
          required
        />
        <button className="btn btn-success w-100">Registrarse</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default Registro;
