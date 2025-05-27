import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coches from "./paginas/Coches";
import Navbar from "./componentes/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Coches />} />
        {/* Puedes añadir más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
