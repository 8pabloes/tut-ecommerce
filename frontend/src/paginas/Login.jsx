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
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        correo,
        contrasena,
      });

      if (res.data && res.data.token) {
        // Guardar el token y el usuario en localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        navigate("/");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      if (err.response) {
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
          placeholder="Correo"
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
