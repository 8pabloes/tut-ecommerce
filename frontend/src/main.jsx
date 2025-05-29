import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CarritoProvider } from "./context/CarritoContext"; // ✅ IMPORTA EL PROVIDER

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarritoProvider> {/* ✅ ENVUELVE APP */}
      <App />
    </CarritoProvider>
  </React.StrictMode>
);
