import React from "react";
import "./PagoCompletado.css";
import { NavLink } from "react-router-dom";
export const PagoCompletado = () => {
  return (
    <div className="w-1/2 m-auto rounded-lg mt-40 mb-40">
      <div className="contenedor-pago">
        <h2 className="block w-full">¡Pago completado!</h2>
        <p className="block w-full">Gracias por tu compra</p>
        <NavLink
          to={"/"}
          className={`w-3/4 text-center m-auto bg-primary text-gray-100 uppercase rounded-sm`}
        >
          Inicio
        </NavLink>
      </div>
    </div>
  );
};
