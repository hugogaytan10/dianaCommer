import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Categoria } from "../models/Categoria";
import { AppContext } from "../Context/AppContext";
import carrito from "../assets/cart-outline.svg";
import usuario from "../assets/userIcon.svg";
import configuracion from "../assets/settings.svg";
interface NavBarDesktopProps {
  categorias: Categoria[];
}
export const NavBarDesktop = (categorias: NavBarDesktopProps) => {
  const contexto = useContext(AppContext);
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <NavLink className=" btn-ghost text-xl" to={"/"}>
          Calzado Díaz
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
                <summary className="text-white">{categoria.Nombre}</summary>
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

          {
            contexto.user?.TipoUsuario == "0" && (
              <li>
                <details>
                  <summary className="text-white">Administrador</summary>
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
                    <li>
                      <NavLink
                        to="/admin/ordenes"
                        className={({ isActive }) =>
                          isActive
                            ? "active-link text-sm bg-primary text-white"
                            : "text-white text-sm"
                        }
                      >
                        Ordenes
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </li>
            )
          }


          <div className="contenedor-carrito">
            <span className="mt-1">{contexto.cart}</span>
            <NavLink to="/cart">
              <img src={carrito} alt="carrito" className="w-6 h-6" />
            </NavLink>
          </div>
          <div className="contenedor-carrito">
            {contexto.user?.Correo != "" ? (
              <NavLink to="/perfil">
                <img src={configuracion} alt="perfil" className="w-6 h-6" />
              </NavLink>
            ) : (
              <NavLink to="/login">
                <img src={usuario} alt="usuario" className="w-6 h-6" />
              </NavLink>
            )}
          </div>

        </ul>
      </div>
    </div>
  );
};
