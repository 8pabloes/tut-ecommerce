import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        correo,
        contrasena,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify({
          id: res.data.id,
          nombre: res.data.nombre
        }));
        localStorage.setItem("rol", res.data.rol);
        navigate("/");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Iniciar sesión</h3>
      <form onSubmit={enviar}>
        <input
          className="form-control mb-2"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Contraseña"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Entrar</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
