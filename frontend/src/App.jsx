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
import Carrito from "./paginas/Carrito";
import Success from "./paginas/Success";
import Cancel from "./paginas/Cancel";


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
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/success" element={<Success />} />
<Route path="/cancel" element={<Cancel />} />


      </Routes>

      <ToastContainer position="top-center" autoClose={2500} />
    </Router>
  );
}
export default App;
