// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 👉 Interceptor para añadir el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🛡️ Interceptor para capturar errores de autenticación (token caducado, inválido, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⏰ Token caducado o inválido. Cerrando sesión.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
