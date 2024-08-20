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
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle h-16 w-16" />
      <div className="flex-1">
        <NavLink className=" btn-ghost text-xl" to={"/"}>
          Calzado Díaz
        </NavLink>
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-primary">
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

          {
            contexto.user?.TipoUsuario == "0" && (
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


          <div className="contenedor-carrito flex items-center justify-start space-x-2 mt-4">
            <span>{contexto.cart}</span>
            <NavLink to="/cart" className="flex items-center space-x-2">
              <img src={carrito} alt="carrito" className="w-6 h-6 -ml-2" />
              <span>Carrito</span>
            </NavLink>
          </div>
          <div className="contenedor-carrito flex items-center justify-start space-x-2 mt-4">
            {contexto.user?.Correo !== "" ? (
              <NavLink to="/perfil" className="flex items-center space-x-2">
                <img src={configuracion} alt="perfil" className="w-6 h-6" />
                <span>Usuario</span>
              </NavLink>
            ) : (
              <NavLink to="/login" className="flex items-center space-x-2 mt-4">
                <img src={usuario} alt="usuario" className="w-6 h-6" />
                <span>Inicio de sesión</span>
              </NavLink>
            )}
          </div>



        </ul>
      </div>
    </div>
  );
}
{/*<div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="navbar bg-primary flex flex-col">
          <div className="flex-none">
            <NavLink className="btn-ghost text-xl mb-4" to={"/"}>
              Calzado Díaz
            </NavLink>
          </div>
          <div className="flex-1">
            <ul className="menu menu-vertical px-1">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "active-link text-sm bg-primary text-white"
                      : "text-white text-sm"
                  }
                  onClick={() => {
                    if (drawer) {
                      drawer.checked = false;
                    }
                  }}
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
                              onClick={() => {
                                if (drawer) {
                                  drawer.checked = false;
                                }
                              }}
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
                        onClick={() => {
                          if (drawer) {
                            drawer.checked = false;
                          }
                        }}
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
                        onClick={() => {
                          if (drawer) {
                            drawer.checked = false;
                          }
                        }}
                      >
                        Categorías
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </li>

              <li className="contenedor-carrito mt-4">
                <span className="mt-1">{contexto.cart}</span>
                <NavLink
                  to="/cart"
                  onClick={() => {

                    if (drawer) {
                      drawer.checked = false;
                    }

                  }}
                >
                  <img src={carrito} alt="carrito" className="w-6 h-6" />
                </NavLink>
              </li>
              <li className="contenedor-carrito mt-4">
                {contexto.user.Correo !== "" ? (
                  <NavLink
                    to="/perfil"
                    onClick={() => {
                      if (drawer) {
                        drawer.checked = false;
                      }
                    }}
                  >
                    <img src={configuracion} alt="perfil" className="w-6 h-6" />
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => {
                      if (drawer) {
                        drawer.checked = false;
                      }
                    }}
                  >
                    <img src={usuario} alt="usuario" className="w-6 h-6" />
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>*/}