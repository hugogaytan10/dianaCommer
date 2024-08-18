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
    <div className="drawer-side z-30">
      <div className="menu bg-primary min-h-screen p-4">
        <NavLink className="btn-ghost text-xl mb-4" to={"/"}>
          Calzado Díaz
        </NavLink>
        <ul className="menu-vertical">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "active-link text-sm bg-primary text-white"
                  : "text-white text-sm"
              }
            >
              Inicio
            </NavLink>
          </li>
          {categorias.categorias.map((categoria) => (
            <li key={`menu-submenu-${categoria.Id}`}>
              <details>
                <summary>{categoria.Nombre}</summary>
                <ul className="bg-primary rounded-t-none p-2 z-20">
                  {categoria.Subcategorias &&
                    categoria.Subcategorias.map((subcategoria) => (
                      <li key={`submenu-${subcategoria.Id}`}>
                        <NavLink
                          to={`/subCategoria/${subcategoria.Id}`}
                          className={({ isActive }) =>
                            isActive
                              ? "active-link text-sm bg-primary text-white"
                              : "text-white text-sm"
                          }
                        >
                          {subcategoria.Nombre}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </details>
            </li>
          ))}
          <li>
            <details>
              <summary>Administrador</summary>
              <ul className="bg-primary rounded-t-none p-2 z-20">
                <li>
                  <NavLink
                    to={`/admin`}
                    className={({ isActive }) =>
                      isActive
                        ? "active-link text-sm bg-primary text-white"
                        : "text-white text-sm"
                    }
                  >
                    Productos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/categorias"
                    className={({ isActive }) =>
                      isActive
                        ? "active-link text-sm bg-primary text-white"
                        : "text-white text-sm"
                    }
                  >
                    Categorías
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li className="contenedor-carrito">
            <span className="mt-1">{contexto.cart}</span>
            <NavLink to="/cart">
              <img src={carrito} alt="carrito" className="w-6 h-6" />
            </NavLink>
          </li>
          <li className="contenedor-carrito">
            {contexto.user.Correo !== "" ? (
              <NavLink to="/perfil">
                <img src={configuracion} alt="perfil" className="w-6 h-6" />
              </NavLink>
            ) : (
              <NavLink to="/login">
                <img src={usuario} alt="usuario" className="w-6 h-6" />
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
