import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Coches from "./paginas/Coches";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import CocheDetalle from "./paginas/CocheDetalle";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coches/:id" element={<CocheDetalle />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
