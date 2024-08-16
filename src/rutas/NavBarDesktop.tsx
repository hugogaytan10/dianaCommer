import React from 'react'
import { NavLink } from 'react-router-dom'
import { Categoria } from '../models/Categoria'
interface NavBarDesktopProps {
  categorias: Categoria[]
}
export const NavBarDesktop = (categorias: NavBarDesktopProps) => {
  return (
    <div className="navbar bg-primary">
    <div className="flex-1">
      <NavLink className=" btn-ghost text-xl" to={'/'}>Calzado Díaz</NavLink>
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
              <summary>{categoria.Nombre}</summary>
              <ul className="bg-primary rounded-t-none p-2 z-20">
                {categoria.Subcategorias && categoria.Subcategorias.map((subcategoria) => (
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
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active-link text-sm bg-primary text-white"
                : "text-white text-sm"
            }
            to="/admin/categorias"
          >
            Categorias
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
  )
}
