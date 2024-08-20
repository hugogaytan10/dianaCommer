import React, {useContext,useEffect} from "react";
import "./PagoCompletado.css";
import { NavLink } from "react-router-dom";
import { crearOrden } from "./Peticiones";
import { AppContext } from "../Context/AppContext";
export const PagoCompletado = () => {
  const context = useContext(AppContext);
  const limpiarLocalStorage = () => {
    localStorage.removeItem("items");
  }
  useEffect(() => {
    //rescatar el carrito
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    const amount = cart.reduce((acc, item) => acc + item.price, 0);
    //insertar Orden
    crearOrden(cart, context.user.Token, context.user.Id, amount);
  }, []);
  return (
    <div className="w-1/2 m-auto rounded-lg mt-40 mb-40">
      <div className="contenedor-pago shadow-sm">
        <h2 className="block w-full text-gray-700">¡Pago completado!</h2>
        <p className="block w-full text-gray-700">Gracias por tu compra</p>
        <NavLink
          to={"/"}
          className={`w-3/4 text-center m-auto bg-primary text-gray-100 uppercase rounded-sm`}
          onClick={limpiarLocalStorage}
        >
          Inicio
        </NavLink>
      </div>
    </div>
  );
};
