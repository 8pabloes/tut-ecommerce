import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginRegistro.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { correo, contrasena });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify({
          id: res.data.id,
          nombre: res.data.nombre
        }));
        localStorage.setItem("rol", res.data.rol);
        toast.success("✅ Sesión iniciada");
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
    <div className="form-page">
      <form className="form-box" onSubmit={enviar}>
        <h2 className="mb-3">Iniciar sesión</h2>

        <input
          className="form-control mb-3"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
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
