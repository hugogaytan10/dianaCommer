import React, { useContext } from "react";
import { Categoria } from '../models/Categoria';
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import carrito from "../assets/cart-outline.svg";
import usuario from "../assets/userIcon.svg";
import configuracion from "../assets/settings.svg";
interface NavBarMobileProps {
  categorias: Categoria[];
}
export const NavBarMobile = (categorias: NavBarMobileProps) => {
  const contexto = useContext(AppContext);
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <NavLink className=" btn-ghost text-xl" to={"/"}>
          Calzado Díaz
        </NavLink>
      </div>
    </div>
  );
}
