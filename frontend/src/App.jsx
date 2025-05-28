import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Coches from "./paginas/Coches";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import CocheDetalle from "./paginas/CocheDetalle";
import Favoritos from "./paginas/Favoritos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/coches/:id" element={<CocheDetalle />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={2500} />
    </Router>
  );
}
export default App;
