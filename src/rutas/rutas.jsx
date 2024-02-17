import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "../Home/Home";
import { Item } from "../Item/Item";
import { Cart } from "../Cart/Cart";
import { Profile } from "../Profile/Profile";
import menu from "../assets/menu.svg";
import carrito from "../assets/cart-outline.svg";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
export const Rutas = () => {
  const contexto = useContext(AppContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(cart.length);
  }, [contexto.cart]);

  return (
    <div>
      <BrowserRouter>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex flex-col">
            <div className="w-full navbar bg-primary">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <img
                    src={menu}
                    alt="menu"
                    className="h-10 w-10 "
                    htmlFor="my-drawer"
                  />
                </label>
              </div>
              <div className=" flex-1 px-2 mx-2 text-gray-50 font-bold justify-center md:justify-start">
                <NavLink to={"/"}>DIANA ZAPATOS Y ACCESORIOS</NavLink>
              </div>
              <div className="contenedor-carrito">
                <span className="mt-1">{contexto.cart}</span>
                <NavLink to={"/cart"}>
                  <img src={carrito} alt="carrito" />
                </NavLink>
              </div>
              <div className="flex-none hidden lg:block ">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "active-link text-lg" : "text-white text-lg"
                      }
                      to="/"
                    >
                      Inicio
                    </NavLink>
                  </li>
                 
                </ul>
              </div>
            </div>

            {/* Page content here */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item" element={<Item />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay "
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-primary">
              {/* Sidebar content here */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link text-lg" : "text-white text-lg"
                  }
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-link text-lg" : "text-white text-lg"
                  }
                  to={"/cart"}
                  onClick={() => {
                    document.getElementById("my-drawer-3").checked = false;
                  }}
                >
                  Carrito
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};
