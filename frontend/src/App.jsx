import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Coches from "./paginas/Coches";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import CocheDetalle from "./paginas/CocheDetalle";
import Favoritos from "./paginas/Favoritos";
import Carrito from "./paginas/Carrito";
import Success from "./paginas/Success";
import Cancel from "./paginas/Cancel";
import Admin from "./paginas/Admin";
import NuevoCoche from "./paginas/NuevoCoche";
import EditarCoche from "./paginas/EditarCoche";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const esAdmin = localStorage.getItem("rol") === "admin";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/coches/:id" element={<CocheDetalle />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* 🔒 Rutas solo accesibles si eres admin */}
        <Route path="/admin" element={esAdmin ? <Admin /> : <Navigate to="/" />} />
<Route path="/admin/nuevo" element={esAdmin ? <NuevoCoche /> : <Navigate to="/" />} />

        <Route path="/admin/editar/:id" element={esAdmin ? <EditarCoche /> : <Navigate to="/" />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={2500} />
    </Router>
  );
}

export default App;
