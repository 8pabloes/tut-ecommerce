import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) {
      setCarrito(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const añadirAlCarrito = (coche) => {
    if (!carrito.find((c) => c.id === coche.id)) {
      setCarrito([...carrito, coche]);
    }
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((c) => c.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, añadirAlCarrito, quitarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
